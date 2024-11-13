import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "@/components/Navbar";
import { router } from "expo-router";
import { icons } from "@/constants";

import imgSrc from "@/assets/images/basketball-3.jpeg";
import ReactNativeModal from "react-native-modal";
import imgSrc2 from "@/assets/images/shooting.jpeg";
import gymImg from "@/assets/images/gym.jpeg";

interface Props {
  title: string;
  desc: string;
  img: any;
  time: string;
}

const Card = ({ title, desc, img, time }: Props) => (
  <TouchableOpacity
    onPress={() => router.push(`/(root)/basket-workout/12`)}
    className={`relative w-full h-[200px] rounded-2xl mb-5`}
  >
    <Image
      source={img}
      resizeMode="cover"
      className="w-full h-full rounded-2xl"
    />
    <View className="absolute top-0 left-0 w-full h-full rounded-2xl bg-black/40 z-10"></View>
    <View className="absolute w-[90%] left-3 top-3 z-50">
      <Text className="bg-blue-950 rounded-2xl px-5 py-2 text-white self-start">
        Day 3
      </Text>
      <Text className="mt-4 mb-1 text-2xl text-white">{title}</Text>
      <Text className="text-md text-gray-200">{desc}</Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-x-2">
          <Image
            source={icons.clock}
            tintColor="#CDFB47"
            resizeMode="cover"
            className="w-[18px] h-[18px]"
          />
          <Text className="text-white">{time}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const RoutineDetail = () => {
  const [showEditModal, setShowEditModal] = useState(false);

  const items = [
    {
      img: imgSrc,
      title: "Basketball",
      desc: "finishing acrobacy and athletism",
      time: "45 min",
    },
    {
      img: gymImg,
      title: "Lower Body",
      desc: "Decel, Lateral plyo, athletism, strength",
      time: "1 hour",
    },
  ];

  return (
    <SafeAreaView className="bg-black relative h-full">
      <ScrollView className="pt-10 h-full pb-[50px]">
        <Navbar />
        <Text className="mt-6 text-white text-2xl text-center mb-4">
          Saturday Routine
        </Text>
        {/* back button  */}
        <View className="flex-row items-center justify-between mt-8 mb-4 px-5">
          <TouchableOpacity className="" onPress={() => router.back()}>
            <Image
              source={icons.backArrow}
              tintColor="white"
              className=""
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-primary px-6 py-2 rounded-2xl"
            onPress={() => setShowEditModal(true)}
          >
            <Text className="text-black font-JakartaSemiBold">
              Edit Routine
            </Text>
          </TouchableOpacity>
        </View>

        {/* items  */}
        <View className="px-4 mt-3">
          <FlatList
            data={items}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <Card
                title={item.title}
                time={item.time}
                img={item.img}
                desc={item.desc}
              />
            )}
          />
        </View>

        {/* modal  */}
        <ReactNativeModal isVisible={showEditModal}>
          <View className="bg-secondary z-[999] px-7 py-9 rounded-2xl h-[95%] w-full">
            <View className="flex-row items-center justify-between">
              <Text className="text-2xl font-JakartaMedium text-white">
                Edit Routine
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowEditModal(false);
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

            {/* items  */}
            <View className="mt-8">
              <View className="flex-row justify-between items-center border-t border-gray-400">
                <View className="flex-row gap-2 py-3">
                  <Image
                    source={imgSrc2}
                    resizeMode="cover"
                    className="w-[70px] h-[70px]"
                  />
                  <View>
                    <Text className="text-xl text-white font-JakartaSemiBold">
                      Basketball
                    </Text>
                    <Text className="text-md text-gray-500 font-JakartaMedium">
                      Day 6
                    </Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Image
                    source={icons.deleteIcon}
                    className="w-[24px] h-[24px]"
                    resizeMode="cover"
                    tintColor="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* end of items  */}

            <TouchableOpacity className="bg-primary px-6 py-2 rounded-2xl block w-[50%] mx-auto mt-5">
              <Text className="text-black font-JakartaSemiBold">
                Add Workout
              </Text>
            </TouchableOpacity>
          </View>
        </ReactNativeModal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoutineDetail;
