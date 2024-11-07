import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants";
import { googleOAuth } from "@/lib/auth";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = async () => {
    const result = await googleOAuth(startOAuthFlow);

    if (result.code === "session_exists") {
      Alert.alert("Success", "Session exists. Redirecting to home screen.");
      router.replace("/(root)/(tabs)/home");
    }

    Alert.alert(result.success ? "Success" : "Error", result.message);
  };

  return (
    <TouchableOpacity
      className="w-full border border-gray-700  rounded-md px-4 py-4 text-white flex-row items-center justify-between"
      onPress={handleGoogleSignIn}
    >
      <Image
        source={icons.google}
        resizeMode="cover"
        className="w-[20px] h-[20px] "
      />
      <Text className="text-white text-center font-JakartaMedium">
        Continue With Google
      </Text>
      <Text></Text>
    </TouchableOpacity>
  );
};

export default OAuth;
