import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { H1, Muted, P } from "@/components/ui/typography";
import { FontAwesome5 } from "@/lib/icons/FontAwesome5";
import { useSignUpStore } from "@/lib/stores/signup-store";
import { useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";

export default function CustomizeProfile() {
  const { isLoaded, signUp } = useSignUp();
  const email = useSignUpStore((state) => state.email);
  const setProfileImage = useSignUpStore((state) => state.setProfileImage);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const avatarUrl = `https://api.dicebear.com/9.x/lorelei/png?seed=${email}&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`;

  const toBase64FromUrl = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();

    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  };

  const handleSignUp = async () => {
    if (!isLoaded) return;

    try {
      const base64 = await toBase64FromUrl(avatarUrl);
      setProfileImage(base64);

      await signUp.create({ emailAddress: email, password, username });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      router.replace("/confirm");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView className="flex-1 w-full h-full">
      <View className="pl-3 pt-3">
        <Button onPress={() => router.back()} variant={"ghost"} size={"icon"}>
          <FontAwesome5
            name="chevron-left"
            size={16}
            className="text-primary"
          />
        </Button>
      </View>
      <View className="flex-1 px-12 pt-6 pb-12">
        <View className="flex items-center gap-8">
          <View className="flex items-center gap-2 p-4">
            <H1>Setup your Profile</H1>
            <Muted className="text-center text-md">
              Set a unique username and customize your profile photo
            </Muted>
          </View>
          <Avatar alt="hello" className="w-36 h-36">
            <AvatarImage
              source={{
                uri: avatarUrl,
              }}
            />
            <AvatarFallback>
              <Text>{email.charAt(0).toUpperCase()}</Text>
            </AvatarFallback>
          </Avatar>
          <View className="flex w-full items-center gap-2">
            <View className="w-full gap-1">
              <P>Username</P>
              <Input
                autoFocus
                autoCapitalize="none"
                onChangeText={(text) => setUsername(text)}
                className="w-full"
              />
            </View>
            <View className="w-full gap-1">
              <P>Password</P>
              {/* TODO: add hide/unhide button */}
              <Input
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(text) => setPassword(text)}
                className="w-full"
              />
            </View>
            <Muted className="text-center text-sm">
              These will be used as your login credentials so write them down or
              remember them well!
            </Muted>
          </View>
        </View>
        <View className="flex-1 justify-end">
          <Button onPress={handleSignUp} className="w-full">
            <Text>Continue</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
