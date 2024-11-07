import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

import imgSrc from "@/assets/images/basketball.jpeg";
import { icons } from "@/constants";

interface Props {
  className?: string;
}

const SessionCard = ({ className }: Props) => {
  return (
    <View className={`relative w-full h-[200px] rounded-2xl ${className}`}>
      <Image
        source={imgSrc}
        resizeMode="cover"
        className="w-full h-full rounded-2xl"
      />
      <View className="absolute top-0 left-0 w-full h-full rounded-2xl bg-black/40 z-10"></View>
      <View className="absolute w-[90%] left-3 top-3 z-50">
        <Text className="bg-blue-950 rounded-2xl px-5 py-2 text-white self-start">
          Day 12
        </Text>
        <Text className="mt-4 mb-1 text-2xl text-white">Basketball</Text>
        <Text className="text-md text-gray-200">Shooting focus</Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-x-2">
            <Image
              source={icons.clock}
              tintColor="#CDFB47"
              resizeMode="cover"
              className="w-[18px] h-[18px]"
            />
            <Text className="text-white">45 min</Text>
          </View>
          <TouchableOpacity className="bg-primary mt-3 rounded-full w-[50px] h-[50px] items-center justify-center">
            <Image
              source={icons.play}
              resizeMode="cover"
              className="w-[22px] h-[22px]"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SessionCard;
