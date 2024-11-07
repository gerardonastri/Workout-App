import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useCallback, useState } from "react";

const SignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password: password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <SafeAreaView className="pt-12 px-3 bg-black h-full">
      <Text className="text-3xl text-white mb-8 font-JakartaBold">
        Log In to Workin
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
          onPress={onSignInPress}
          className="bg-white w-full py-3 rounded-lg mt-6"
        >
          <Text className="text-center font-JakartaBold text-md">Sign Up</Text>
        </TouchableOpacity>
        <Text className="text-third mt-6 tet-center mx-auto">
          Don't have an account?{" "}
          <Link className="text-primary ml-1" href="/(auth)/sign-up">
            Register
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
