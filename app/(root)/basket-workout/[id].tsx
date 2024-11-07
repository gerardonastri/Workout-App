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
import { icons } from "@/constants";
import { router } from "expo-router";

import imgSrc from "@/assets/images/shooting.jpeg";

// interface CardProps{
//     item: {
//         img: string;
//         title: string;
//         sets: number;
//         reps: number;
//     }
// }

const Card = () => (
  <View className="flex-row gap-2 py-3 px-6 border-t border-gray-400">
    <Image source={imgSrc} resizeMode="cover" className="w-[70px] h-[70px]" />
    <View>
      <Text className="text-xl text-white font-JakartaSemiBold">
        Shooting lvl 1
      </Text>
      <Text className="text-md text-gray-500 font-JakartaMedium">
        5 sets: 15, 15, 15, 15, 15
      </Text>
    </View>
  </View>
);

const basketballWorkout = () => {
  const items = [
    {
      img: imgSrc,
      title: "Shooting lvl 1",
      sets: 3,
      reps: 10,
    },
    {
      img: imgSrc,
      title: "Shooting lvl 1",
      sets: 3,
      reps: 10,
    },
    {
      img: imgSrc,
      title: "Shooting lvl 1",
      sets: 3,
      reps: 10,
    },
    {
      img: imgSrc,
      title: "Shooting lvl 1",
      sets: 3,
      reps: 10,
    },
    {
      img: imgSrc,
      title: "Shooting lvl 1",
      sets: 3,
      reps: 10,
    },
    {
      img: imgSrc,
      title: "Shooting lvl 1",
      sets: 3,
      reps: 10,
    },
    {
      img: imgSrc,
      title: "Shooting lvl 1",
      sets: 3,
      reps: 10,
    },
  ];

  return (
    <SafeAreaView className="bg-black relative">
      <ScrollView>
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

        {/* list of items  */}
        <FlatList
          data={items}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: any) => item.title}
          renderItem={({ item }) => <Card />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default basketballWorkout;
