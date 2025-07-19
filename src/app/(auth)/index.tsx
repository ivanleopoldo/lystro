import * as Linking from "expo-linking";
import { SafeAreaView, ActivityIndicator, View } from "react-native";

import { Button } from "@/components/general/button";
import Logo from "@/components/general/logo";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { FontAwesome5 } from "@/lib/icons/FontAwesome5";
import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react";

export default function AuthScreen() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { startSSOFlow } = useSSO();

  // TODO: add error handling and loading state
  const handleGoogle = async () => {
    try {
      const { createdSessionId, signUp, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: Linking.createURL("/lists", {
          scheme: "com.ivanleopoldo.lystro",
        }),
      });

      setIsSigningIn(true);
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      } else if (signUp) {
        await signUp.create({
          emailAddress: signUp.emailAddress!,
          username: "oten",
        });
      }
    } catch (err) {
      console.error("Google SSO error", err);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex h-2/3 justify-center px-12 gap-12">
        <View className="items-center gap-4">
          <View className="flex-row items-center gap-2">
            <Logo className="h-12 w-12 rounded-xl" />
            <Text className="font-semibold text-xl">Lystro</Text>
          </View>
          {!isSigningIn && (
            <View className="items-center gap-1">
              <Text className="text-2xl font-bold">Welcome to Lystro</Text>
              <Muted className="text-md text-center">
                Login with your Apple or Google account
              </Muted>
            </View>
          )}
        </View>

        {!isSigningIn ? (
          <View className="justify-center gap-4">
            <View className="gap-2">
              <Button
                icon={
                  <FontAwesome5
                    name="apple"
                    className="text-foreground"
                    size={20}
                  />
                }
                onPress={() => {}}
                variant="secondary"
              >
                <Text>Continue with Apple</Text>
              </Button>
              <Button
                icon={
                  <FontAwesome5
                    name="google"
                    className="text-foreground"
                    size={16}
                  />
                }
                onPress={handleGoogle}
                variant="secondary"
              >
                <Text>Continue with Google</Text>
              </Button>
            </View>
            <Muted className="text-center text-sm">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </Muted>
          </View>
        ) : (
          <View className="gap-2 items-center justify-center">
            <H1 className="text-5xl text-center">Signing you in...</H1>
            <Text className="text-center">
              Please be patient as we are logging you into Lystro
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
