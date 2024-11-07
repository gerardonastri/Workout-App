import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, Text, View } from "react-native";

import { icons } from "@/constants";

const TabIcon = ({
  source,
  focused,
  title,
}: {
  source: ImageSourcePropType;
  focused: boolean;
  title: string;
}) => (
  <View
    className={`flex flex-row justify-center items-center rounded-full ${
      focused ? "bg-general-300" : ""
    }`}
  >
    <View className={`rounded-full w-14 h-12 items-center justify-center`}>
      <Image
        source={source}
        tintColor={focused ? "#CDFB47" : "white"}
        resizeMode="contain"
        className={`w-7 h-7 `}
      />
      <Text
        className={`${
          focused ? "text-primary" : "text-white"
        } whitespace-nowrap`}
      >
        {title}
      </Text>
    </View>
  </View>
);

export default function Layout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#191919",
          // borderRadius: 50,
          paddingBottom: 0, // ios only
          overflow: "hidden",
          // marginHorizontal: 20,
          // marginBottom: 20,
          height: 78,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} title="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="routine"
        options={{
          title: "Routine",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.routine} title="Routine" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.profile} title="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
