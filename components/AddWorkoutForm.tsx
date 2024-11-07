import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { Picker } from "@react-native-picker/picker";

interface Props {
  closeModal: () => void;
}

const AddWorkoutForm = ({ closeModal }: Props) => {
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [duration, setDuration] = useState("");
  const [day, setDay] = useState("");

  const handlePress = () => {
    closeModal();
  };

  return (
    <View>
      <View className="mt-6">
        <Text className="text-white font-JakartaMedium mb-2">Category</Text>
        <View className="bg-secondary border border-gray-700 text-white !rounded-lg">
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            // style={{ backgroundColor: "white"}}
            style={{ color: "#d4cfcf" }}
          >
            <Picker.Item label="Basketball" value="basketball" />
            <Picker.Item label="Gym" value="gym" />
            <Picker.Item label="Mobility" value="mobility" />
          </Picker>
        </View>
      </View>
      <View className="mt-4">
        <Text className="text-white font-JakartaMedium mb-2">Duration</Text>
        <TextInput
          autoCapitalize="none"
          value={duration}
          placeholder="45 min"
          placeholderTextColor="#d4cfcf"
          onChangeText={(duration) => setDuration(duration)}
          className="text-white  border rounded-lg border-gray-700 pl-2 py-2 bg-transparent"
        />
      </View>
      <View className="mt-4">
        <Text className="text-white font-JakartaMedium mb-2">Day</Text>
        <TextInput
          autoCapitalize="none"
          value={day}
          placeholder="3"
          placeholderTextColor="#d4cfcf"
          keyboardType="numeric"
          onChangeText={(day) => setDay(day)}
          className="text-white  border rounded-lg border-gray-700 pl-2 py-2 bg-transparent"
        />
      </View>
      <View className="mt-4">
        <Text className="text-white font-JakartaMedium mb-2">Description</Text>
        <TextInput
          autoCapitalize="none"
          value={desc}
          placeholder="Shooting session"
          placeholderTextColor="#d4cfcf"
          onChangeText={(desc) => setDesc(desc)}
          className="text-white  border rounded-lg border-gray-700 pl-2 py-2 bg-transparent"
        />
      </View>
      <TouchableOpacity
        onPress={handlePress}
        className="bg-primary w-[50%] py-3 mx-auto mt-6 items-center justify-center rounded-3xl"
      >
        <Text className="text-lg font-JakartaMedium text-black">
          Add Workout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddWorkoutForm;
