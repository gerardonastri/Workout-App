import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import ReactNativeModal from "react-native-modal";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const { user } = useUser();

  return (
    <View className="mt-6 px-5 flex flex-row justify-between items-center">
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        className="bg-slate-800 p-3 flex items-center justify-center rounded-2xl"
      >
        <Image
          source={icons.navbar}
          tintColor="white"
          width={25}
          height={25}
          resizeMode="cover"
          className="w-[25px] h-[25px]"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(root)/(tabs)/profile")}>
        <Image
          source={{ uri: user?.imageUrl }}
          resizeMode="cover"
          className="w-[50px] h-[50px] rounded-full"
        />
      </TouchableOpacity>
      <ReactNativeModal isVisible={showModal}>
        <View className="bg-secondary z-[999] px-7 py-9 rounded-2xl h-screen w-[80%]">
          <TouchableOpacity
            onPress={() => {
              setShowModal(false);
            }}
            className="mt-5"
          >
            <Image
              source={icons.close}
              resizeMode="cover"
              tintColor="white"
              className="w-[22px] h-[22px]"
            />
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default Navbar;
