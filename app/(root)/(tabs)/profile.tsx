import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "@/components/Navbar";
import { icons } from "@/constants";
import { router } from "expo-router";
import { useUser, useAuth } from "@clerk/clerk-expo";

import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  //logout
  const handleLogout = async () => {
    try {
      await signOut();
      console.log("Logout effettuato con successo");
      router.replace("/sign-in");
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  const inputs = [
    {
      icon: icons.person,
      text: `${user?.firstName} ${user?.lastName}`,
    },
    {
      icon: icons.email,
      text: user?.emailAddresses[0].emailAddress,
    },
    {
      icon: icons.lock,
      text: "Password",
    },
  ];

  //CAMERA
  const [image, setImage] = useState<string | null>(null);

  // Funzione per richiedere i permessi e scegliere un'immagine
  const requestPermissionAndPickImage = async () => {
    try {
      // Richiesta dei permessi quando si clicca sul bottone
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permesso per accedere alla libreria negato");
        return;
      }

      // Se i permessi sono concessi, apri la galleria
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri); // salva l'URI dell'immagine
      }
    } catch (error) {
      console.error("Errore durante la scelta dell'immagine:", error);
    }
  };

  return (
    <SafeAreaView className="bg-black relative h-screen">
      <Text className="text-3xl text-white mt-4 text-center capitalize">
        {user?.firstName} {user?.lastName}
      </Text>

      <TouchableOpacity onPress={requestPermissionAndPickImage}>
        <Image
          source={{ uri: user?.imageUrl }}
          resizeMode="cover"
          className="rounded-full mt-10 mx-auto h-[100px] w-[100px]"
        ></Image>
      </TouchableOpacity>

      <View className="mt-4">
        <FlatList
          data={inputs}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.text}
          renderItem={({ item }) => (
            <View className="flex-row items-center pl-10 border-b border-gray-400 py-6 gap-10">
              <Image
                source={item.icon}
                resizeMode="cover"
                tintColor="white"
                className="w-[24px] h-[24px]"
              />
              <Text className="text-gray-500 text-lg">{item.text}</Text>
            </View>
          )}
        />
        <TouchableOpacity className="bg-primary rounded-2xl mt-10 mx-auto py-3 px-10">
          <Text className="text-black text-xl font-JakartaMedium">
            Edit Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-primary rounded-2xl mt-5 mx-auto py-3 px-10"
          onPress={handleLogout}
        >
          <Text className="text-black text-xl font-JakartaMedium">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
