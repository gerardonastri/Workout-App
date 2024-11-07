import {
  View,
  Text,
  FlatList,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Navbar from "@/components/Navbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import SessionCard from "@/components/SessionCard";
import { Link, router } from "expo-router";

import img1 from "@/assets/images/basketball-2.jpeg";
import img2 from "@/assets/images/gym.jpeg";
import img3 from "@/assets/images/yoga.jpeg";

type Props = {
  category: {
    title: string;
    img: ImageSourcePropType;
    link: string;
  };
};

const CategoryCard = ({ category }: Props) => (
  <TouchableOpacity
    onPress={() => router.push(category.link)}
    className="relative rounded-2xl w-[130px] h-[150px] mr-5"
  >
    <Image
      source={category.img}
      resizeMode="cover"
      className="rounded-2xl w-full h-full"
    />
    <View className="absolute top-0 left-0 w-full h-full bg-black/40"></View>
    <Text className="absolute top-2 left-2 text-white text-xl font-JakartaMedium z-50">
      {category.title}
    </Text>
  </TouchableOpacity>
);

const home = () => {
  const { user } = useUser();

  const today = new Date();
  const weekday = today.getDay();
  // Mappa il risultato per far partire la settimana da lunedì (0 = lunedì, 6 = domenica)
  const adjustedWeekday = (weekday + 6) % 7;
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  const categories = [
    {
      img: img1,
      title: "Basket",
      link: "/(root)/basket",
    },
    {
      img: img2,
      title: "Gym",
      link: "/(root)/basket",
    },
    {
      img: img3,
      title: "Mobility",
      link: "/(root)/basket",
    },
  ];
  return (
    <SafeAreaView className="bg-black h-screen">
      <Navbar />
      {/* <Text className="text-white">
        {" "}
        Welcome,{" "}
        {user?.firstName ||
          user?.emailAddresses[0].emailAddress.split("@")[0]}{" "}
        👋
      </Text> */}
      {/* GIORNI DELLA SETTIMANA  */}
      <View className="flex-row items-center pt-10 justify-between gap-1 px-5">
        {days.map((item, i) => (
          <Text
            key={i}
            className={`${
              adjustedWeekday === i ? "text-white underline" : "text-gray-400"
            } text-2xl`}
          >
            {item}
          </Text>
        ))}
      </View>
      {/* SESSIONE DI OGGI  */}
      <View className="mt-8 px-5">
        <Text className="text-white text-2xl mb-3">Today's workouts</Text>
        <SessionCard />
      </View>
      {/* CATEGORIES  */}
      <View className="px-5 mt-12">
        <Text className="text-2xl mb-3 text-white">Categories</Text>
        <FlatList
          data={categories}
          keyboardShouldPersistTaps="handled"
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.title}
          horizontal={true}
          renderItem={({ item }) => <CategoryCard category={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default home;
