import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { fetchAPI } from "@/lib/fetch";
import ReactNativeModal from "react-native-modal";
import { images } from "@/constants";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  //sign up
  const onSignupPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: emailAddress,
        password: password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  //verify
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        //TODO: create a database user
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: name,
            email: emailAddress,
            password: password,
          }),
        });

        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed",
        });
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };

  return (
    <SafeAreaView className="pt-12 px-3 bg-black h-full">
      <Text className="text-3xl text-white mb-8 font-JakartaBold">
        Get your free account
      </Text>
      <OAuth />
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-gray-700" />
        <Text className="text-lg text-third">Or</Text>
        <View className="flex-1 h-[1px] bg-gray-700" />
      </View>

      {/* INPUTS  */}
      <View className="mt-8">
        <View>
          <Text className="text-white font-JakartaMedium mb-2">Name</Text>
          <TextInput
            autoCapitalize="none"
            value={name}
            placeholder="Gerardo Nastri"
            onChangeText={(name) => setName(name)}
            className="text-white placeholder:text-third border rounded-lg border-gray-700 pl-2 py-2 bg-transparent"
          />
        </View>
        <View className="mt-4">
          <Text className="text-white font-JakartaMedium mb-2">Email</Text>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="email@gmail.com"
            onChangeText={(email) => setEmailAddress(email)}
            className="text-white placeholder:text-third border rounded-lg border-gray-700 pl-2 py-2 bg-transparent"
          />
        </View>
        <View className="mt-4">
          <Text className="text-white font-JakartaMedium mb-2">Password</Text>
          <TextInput
            secureTextEntry={true}
            value={password}
            placeholder="email@gmail.com"
            onChangeText={(password) => setPassword(password)}
            className="text-white placeholder:text-third border rounded-lg border-gray-700 pl-2 py-2 bg-transparent"
          />
        </View>
        <TouchableOpacity
          className="bg-white w-full py-3 rounded-lg mt-6"
          onPress={onSignupPress}
        >
          <Text className="text-center font-JakartaBold text-md">Sign Up</Text>
        </TouchableOpacity>
        <Text className="text-third mt-6 tet-center mx-auto">
          Already have an account?{" "}
          <Link className="text-primary ml-1" href="/(auth)/sign-in">
            Login
          </Link>
        </Text>
      </View>

      {/* VERIFICATION MODAL */}
      <ReactNativeModal isVisible={showSuccessModal}>
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Image
            source={images.check}
            className="w-[110px] h-[110px] mx-auto my-5"
          />

          <Text className="text-3xl font-JakartaBold text-center text-black">
            Verified
          </Text>
          <Text className="text-base text-gray-900 font-Jakarta text-center mt-2">
            You have successfully verified your account
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShowSuccessModal(false);
              router.push("/(root)/(tabs)/home");
            }}
            className="mt-5 bg-black w-full rounded-lg py-3"
          >
            <Text className="text-white text-center font-JakartaMedium">
              Browse home
            </Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>

      {/* PENDING MODAL  */}
      <ReactNativeModal
        isVisible={verification.state === "pending"}
        // isVisible={true}
        onModalHide={() => {
          if (verification.state === "success") {
            setShowSuccessModal(true);
          }
        }}
      >
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Text className="text-2xl font-JakartaExtraBold text-center text-black">
            Verification
          </Text>
          <Text className="mb-5 font-Jakarta text-gray-900">
            We've sent a verification code to {emailAddress}
          </Text>
          <TextInput
            placeholder="12345"
            value={verification.code}
            keyboardType="numeric"
            onChangeText={(code) => setVerification({ ...verification, code })}
            className="border-2 border-black pl-4 py-2 text-black rounded-lg"
          />

          {verification.error && (
            <Text className="text-red-500 text-sm mt-1">
              {verification.error}
            </Text>
          )}
          <TouchableOpacity
            onPress={onPressVerify}
            className="mt-5  bg-black w-full rounded-lg py-3"
          >
            <Text className="text-white text-center font-JakartaMedium">
              Verify Email
            </Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

export default SignUp;
