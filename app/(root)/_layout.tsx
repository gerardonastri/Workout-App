import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="basket" options={{ headerShown: false }} />
      <Stack.Screen
        name="basket-workout/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="routine/[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
