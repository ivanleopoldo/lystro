import { Button } from "@/components/general/button";
import { Text } from "@/components/ui/text";
import { SafeAreaView, View } from "react-native";
import { OTPInput } from "input-otp-native";
import { cn } from "@/lib/utils";
import { H1, Muted } from "@/components/ui/typography";
import { FontAwesome5 } from "@/lib/icons/FontAwesome5";
import { useSignUp, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";
import { useSignUpStore } from "@/lib/stores/signup-store";

export default function ConfirmEmail() {
  const [code, setCode] = useState("");
  const { isLoaded, setActive, signUp } = useSignUp();
  const email = useSignUpStore((state) => state.email);
  const profileImage = useSignUpStore((state) => state.profileImage);
  const { user } = useUser();

  const hidePartsOfEmail = (str: string) => {
    const strArr = str.split("@");

    return (
      strArr[0][0].toString() +
      "***" +
      strArr[0].slice(-1) +
      "@" +
      strArr[1].toString()
    );
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        // FIX: profile image not updating in clerk
        if (user) {
          await user.setProfileImage({ file: profileImage });
        }
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView className="relative flex-1 justify-center">
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
            We have sent the One-time Password (OTP) code to{" "}
            {email !== "" ? hidePartsOfEmail(email) : "you"}
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
                          slot.isActive && "border border-primary/30",
                          "w-[50px] h-[50px] bg-neutral-100 rounded-xl items-center justify-center",
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
    </SafeAreaView>
  );
}
