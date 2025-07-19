import { Button } from "@/components/general/button";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { FontAwesome5 } from "@/lib/icons/FontAwesome5";
import { useAuthStore } from "@/lib/stores/auth-store";
import { cn } from "@/lib/utils";
import { useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { OTPInput } from "input-otp-native";
import { useState } from "react";
import { Keyboard, Pressable, SafeAreaView, View } from "react-native";

export default function ConfirmEmail() {
  const [code, setCode] = useState("");
  const { isLoaded, setActive, signUp } = useSignUp();

  const email = useAuthStore((state) => state.email);

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView className="relative flex-1 justify-center">
      <Pressable onPress={() => Keyboard.dismiss()} className="flex-1">
        <View className="pl-3 pt-3">
          <Button onPress={() => router.back()} variant={"ghost"} size={"icon"}>
            <FontAwesome5
              name="chevron-left"
              size={16}
              className="text-primary"
            />
          </Button>
        </View>
        <View className="flex-1 px-6 pt-20 pb-6 gap-12">
          <View className="gap-2 items-center">
            <H1 className="font-bold">OTP Verification</H1>
            <Muted className="text-md text-center">
              We have sent the One-time Password (OTP) code to {email}
            </Muted>
          </View>
          <View className="justify-center items-center w-full gap-2">
            <OTPInput
              maxLength={6}
              keyboardType="number-pad"
              autoFocus
              onChange={(code) => {
                setCode(code);
              }}
              render={({ slots }) => {
                return (
                  <View className="flex-row gap-2">
                    {slots.map((slot, idx) => {
                      return (
                        <View
                          className={cn(
                            slot.isActive
                              ? "border-foreground/30"
                              : "border-foreground/10",
                            "w-[50px] h-[50px] bg-background rounded-xl items-center justify-center border",
                          )}
                          key={idx}
                        >
                          <Text>{slot.char}</Text>
                        </View>
                      );
                    })}
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View className="p-12">
          <Button onPress={onVerifyPress} className="w-full">
            <Text>Confirm</Text>
          </Button>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}
