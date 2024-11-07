import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image,
  LogBox,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Navbar from "@/components/Navbar";

import { img1, img2, img3, img4, img5, img6 } from "@/assets/images/routines";
import { router } from "expo-router";

const items = [
  {
    id: 1,
    img: img1,
    text: "Monday",
  },
  {
    id: 2,
    img: img2,
    text: "Tuesday",
  },
  {
    id: 3,
    img: img3,
    text: "Wednesday",
  },
  {
    id: 4,
    img: img4,
    text: "Thursday",
  },
  {
    id: 5,
    img: img5,
    text: "Friday",
  },
  {
    id: 6,
    img: img6,
    text: "Saturday",
  },
];

const routine = () => {
  LogBox.ignoreAllLogs();

  return (
    <SafeAreaView className="bg-black relative h-screen pb-[20px]">
      <ScrollView className="pt-10">
        <Navbar />

        <View className="px-8 mt-12 pb-[100px]">
          <FlatList
            data={items}
            keyboardShouldPersistTaps="handled"
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.text}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push(`/(root)/routine/${item.id}`)}
                className={`relative w-full h-[170px] rounded-2xl bg-white mb-4`}
              >
                <View className="absolute top-0 left-0 w-full h-full rounded-2xl bg-black/40 z-10"></View>
                <Image
                  source={item.img}
                  resizeMode="cover"
                  className="w-full h-full rounded-2xl"
                />
                <View className="absolute top-0 left-0 w-full h-full z-20 justify-center items-center">
                  <Text className="text-white text-3xl z-20">{item.text}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default routine;
