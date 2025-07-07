import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useSignUpStore } from "@/lib/stores/signup-store";

export default function AuthLayout() {
  const { isSignedIn } = useAuth();
  const firstTime = useSignUpStore((state) => state.firstTime);

  if (isSignedIn && !firstTime) {
    return <Redirect href={"/lists"} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
