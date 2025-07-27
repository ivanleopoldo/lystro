import { useAuth } from "@clerk/clerk-expo";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function TabsLayout() {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      router.replace("/(auth)");
    }
  }, [isSignedIn]);

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="lists/index" />
        <Stack.Screen name="lists/[id]" />
        <Stack.Screen name="lists/[id]/item/[itemId]" />
        <Stack.Screen name="settings" />
      </Stack>
    </>
  );
}
