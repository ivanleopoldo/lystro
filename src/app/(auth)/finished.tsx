import Logo from "@/components/general/logo";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, P } from "@/components/ui/typography";
import { router } from "expo-router";
import { SafeAreaView, View } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useSignUpStore } from "@/lib/stores/signup-store";
import { useState, useEffect } from "react";

export default function Finished() {
  const { user } = useUser();
  const profilePicture = useSignUpStore((state) => state.profileImage);
  const setFirstTime = useSignUpStore((state) => state.setFirstTime);

  useEffect(() => {
    const updateUserData = async () => {
      if (!user) return;

      try {
        if (profilePicture) {
          await user.setProfileImage({ file: profilePicture });
        }
      } catch (err) {
        console.error("Error updating user:", err);
      }
    };

    updateUserData();
  }, [user]);

  return (
    <SafeAreaView className="flex-1 items-center justify-center w-full h-full">
      <View className="flex p-12 pt-24 w-full h-full justify-center gap-6 items-center">
        <View className="flex items-center justify-center gap-6">
          <View className="flex items-center justify-center gap-2">
            <H1>Congratulations!</H1>
            <P>You have successfully created an account on </P>
          </View>
          <View className="flex items-center justify-center gap-2">
            <Logo className="h-24 w-24 rounded-xl" />
            <Text className="font-semibold text-2xl">Lystro</Text>
          </View>
          <P className="text-muted-foreground text-center">
            Thank you for using Lystro! I hope you enjoy!
          </P>
        </View>
        <View className="gap-6 flex-1 justify-end w-full">
          <P className="text-muted-foreground text-center">
            For any changes to the account, please edit in the Account page in
            the Settings of Lystro!
          </P>
          <Button
            className="w-full p-6"
            onPress={() => {
              setFirstTime(false);
            }}
          >
            <Text>Thank you!</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
