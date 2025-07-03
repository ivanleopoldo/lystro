import { Button } from "@/components/general/button";
import { Text } from "@/components/ui/text";
import { SafeAreaView, View } from "react-native";
import { OTPInput } from "input-otp-native";
import { cn } from "@/lib/utils";
import { H1, Muted } from "@/components/ui/typography";
import { FontAwesome5 } from "@/lib/icons/FontAwesome5";
import { router } from "expo-router";

export default function ConfirmEmail() {
  const email = "john@doe.com";

  const hidePartsOfEmail = (str: string) => {
    const strArr = str.split("@");

    return (
      strArr[0][0].toString() +
      "***" +
      strArr[0][strArr.length + 1].toString() +
      "@" +
      strArr[1].toString()
    );
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
            {hidePartsOfEmail(email)}
          </Muted>
        </View>
        <View className="justify-center items-center w-full gap-2">
          <OTPInput
            maxLength={6}
            keyboardType="number-pad"
            autoFocus
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
      <View className="px-6 pb-6 gap-2">
        <Button>
          <Text>Confirm</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
