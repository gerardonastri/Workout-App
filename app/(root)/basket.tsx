import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "@/components/Navbar";
import { icons } from "@/constants";
import SessionCard from "@/components/SessionCard";

import imgSrc from "@/assets/images/basketball-3.jpeg";
import { router } from "expo-router";
import ReactNativeModal from "react-native-modal";
import AddWorkoutForm from "@/components/AddWorkoutForm";
import { fetchAPI, useFetch } from "@/lib/fetch";

const Card = ({ item }: { item: any }) => (
  <TouchableOpacity
    onPress={() => router.push(`/(root)/basket-workout/${item.workout_id}`)}
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
        Day {item.day}
      </Text>
      <Text className="mt-4 mb-1 text-2xl text-white">{item.name}</Text>
      <Text className="text-md text-gray-200">{item.description}</Text>
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

const basket = () => {
  // const items = [
  //   {
  //     title: "",
  //     subTitle: "",
  //     img: "",
  //     id: 1,
  //     link: "",
  //   },
  //   {
  //     title: "",
  //     subTitle: "",
  //     img: "",
  //     id: 2,
  //     link: "",
  //   },
  //   {
  //     title: "",
  //     subTitle: "",
  //     img: "",
  //     id: 3,
  //     link: "",
  //   },
  //   {
  //     title: "",
  //     subTitle: "",
  //     img: "",
  //     id: 4,
  //     link: "",
  //   },
  //   {
  //     title: "",
  //     subTitle: "",
  //     img: "",
  //     id: 5,
  //     link: "",
  //   },
  // ];

  const [showForm, setShowForm] = useState(false);
  const { data: items } = useFetch<any>(
    "http://192.168.1.117:8081/(api)/basketball"
  );

  // const [items, setItems] = useState(null);

  // useEffect(() => {
  //   const getWorkout = async () => {
  //     try {
  //       const res = await fetch("http://192.168.1.117:8081/(api)/basketball");
  //       const data = await res.json();
  //       setItems(data?.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getWorkout();
  // }, []);

  return (
    <SafeAreaView className="bg-black relative min-h-screen">
      <ScrollView>
        <Navbar />

        <TouchableOpacity className="mt-4 ml-5" onPress={() => router.back()}>
          <Image
            source={icons.backArrow}
            tintColor="white"
            className=""
            resizeMode="cover"
          />
        </TouchableOpacity>

        <View className="flex-row items-center justify-between mt-10  px-5">
          <Text className="text-white text-center text-2xl font-JakartaSemiBold">
            Basketball Workouts
          </Text>
          <TouchableOpacity
            onPress={() => setShowForm(true)}
            className="bg-primary w-[40px] h-[40px] rounded-full items-center justify-center"
          >
            <Image
              source={icons.add}
              className="w-[22px] h-[22px]"
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
        <View className="px-5 mt-8">
          <FlatList
            data={items}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => <Card item={item} />}
          />
        </View>

        {/* MODAL  */}
        <ReactNativeModal isVisible={showForm}>
          <View className="bg-secondary z-[999] px-7 py-9 rounded-2xl h-[95%] w-full">
            <View className="flex-row items-center justify-between">
              <Text className="text-2xl font-JakartaMedium text-white">
                Add Workout
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowForm(false);
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
            <AddWorkoutForm closeModal={() => setShowForm(false)} />
          </View>
        </ReactNativeModal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default basket;
