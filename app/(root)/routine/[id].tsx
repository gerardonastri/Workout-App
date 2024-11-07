import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "@/components/Navbar";
import { router } from "expo-router";
import { icons } from "@/constants";

import imgSrc from "@/assets/images/basketball-3.jpeg";

const Card = () => (
  <TouchableOpacity
    onPress={() => router.push(`/(root)/basket-workout/12`)}
    className={`relative w-full h-[200px] rounded-2xl mb-5`}
  >
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
      </View>
    </View>
  </TouchableOpacity>
);

const RoutineDetail = () => {
  return (
    <SafeAreaView className="bg-black relative h-screen">
      <ScrollView className="pt-10 h-full pb-[50px]">
        <Navbar />
        {/* back button  */}
        <TouchableOpacity className="mt-4 ml-5" onPress={() => router.back()}>
          <Image
            source={icons.backArrow}
            tintColor="white"
            className=""
            resizeMode="cover"
          />
        </TouchableOpacity>

        <Text className="mt-3 text-white text-2xl text-center mb-4">
          Saturday Routine
        </Text>
        <FlatList
          data={[1, 2, 3]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => <Card />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoutineDetail;
