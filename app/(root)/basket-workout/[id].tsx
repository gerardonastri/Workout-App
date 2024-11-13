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
import { Link, router, useLocalSearchParams } from "expo-router";

import imgSrc from "@/assets/images/shooting.jpeg";
import { useFetch } from "@/lib/fetch";

// interface CardProps{
//     item: {
//         img: string;
//         title: string;
//         sets: number;
//         reps: number;
//     }
// }

const Card = ({ item }: { item: any }) => (
  <Link href={item.link} style={{ borderTopWidth: 1, borderColor: "gray" }}>
    {/* <TouchableOpacity> */}
    <View className="flex-row m-0 gap-x-2 py-3 px-6">
      <Image
        source={imgSrc}
        resizeMode="cover"
        style={{ width: 70, height: 70 }}
      />
      <View className="ml-2">
        <Text className="text-xl text-white font-JakartaSemiBold">
          {item.name}
        </Text>
        <Text className="text-md text-gray-500 font-JakartaMedium">
          {item.sets} sets: {item.reps}
        </Text>
      </View>
    </View>
    {/* </TouchableOpacity> */}
  </Link>
);

const basketballWorkout = () => {
  const { id } = useLocalSearchParams();

  // const items = [
  //   {
  //     img: imgSrc,
  //     title: "Shooting lvl 1",
  //     sets: 3,
  //     reps: 10,
  //   },
  //   {
  //     img: imgSrc,
  //     title: "Shooting lvl 1",
  //     sets: 3,
  //     reps: 10,
  //   },
  //   {
  //     img: imgSrc,
  //     title: "Shooting lvl 1",
  //     sets: 3,
  //     reps: 10,
  //   },
  //   {
  //     img: imgSrc,
  //     title: "Shooting lvl 1",
  //     sets: 3,
  //     reps: 10,
  //   },
  //   {
  //     img: imgSrc,
  //     title: "Shooting lvl 1",
  //     sets: 3,
  //     reps: 10,
  //   },
  //   {
  //     img: imgSrc,
  //     title: "Shooting lvl 1",
  //     sets: 3,
  //     reps: 10,
  //   },
  //   {
  //     img: imgSrc,
  //     title: "Shooting lvl 1",
  //     sets: 3,
  //     reps: 10,
  //   },
  // ];

  const { data: items } = useFetch<any>(
    `http://192.168.1.117:8081/(api)/exercises/${id}`
  );

  console.log(items);

  return (
    <SafeAreaView className="bg-black relative min-h-screen">
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
          renderItem={({ item }) => <Card item={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default basketballWorkout;
