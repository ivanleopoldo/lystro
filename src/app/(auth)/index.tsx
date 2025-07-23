import * as Linking from "expo-linking";
import { SafeAreaView, View } from "react-native";

import { Button } from "@/components/general/button";
import Logo from "@/components/general/logo";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { FontAwesome5 } from "@/lib/icons/FontAwesome5";
import { OAuthStrategy } from "@/lib/types";
import { useClerk, useSSO } from "@clerk/clerk-expo";
import app from "app.json";
import { useCallback, useState } from "react";
import { toast } from "sonner-native";

export default function AuthScreen() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { startSSOFlow } = useSSO();
  const { setActive } = useClerk();

  const handleSSO = useCallback(async (strategy: OAuthStrategy) => {
    try {
      const { createdSessionId, signUp } = await startSSOFlow({
        strategy,
        redirectUrl: Linking.createURL("/lists", {
          scheme: app.expo.scheme,
        }),
      });

      if (createdSessionId) {
        setIsSigningIn(true);
        await setActive({ session: createdSessionId });
      } else if (signUp) {
        await signUp.create({
          emailAddress: signUp.emailAddress!,
        });
      }
    } catch (err) {
      toast.error("Oh no!", {
        description: "Something went wrong while signing in. Please try again!",
      });
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex h-5/6 justify-center px-12 gap-12">
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
                onPress={() => handleSSO("oauth_apple")}
                icon={
                  <FontAwesome5
                    name="apple"
                    className="text-foreground"
                    size={20}
                  />
                }
                variant="secondary"
              >
                <Text>Continue with Apple</Text>
              </Button>
              <Button
                onPress={() => handleSSO("oauth_google")}
                icon={
                  <FontAwesome5
                    name="google"
                    className="text-foreground"
                    size={16}
                  />
                }
                variant="secondary"
              >
                <Text>Continue with Google</Text>
              </Button>
            </View>
            {/* TODO: add Terms of Service and Privacy Policy links */}
            {/* <Muted className="text-center text-sm"> */}
            {/*   By continuing, you agree to our Terms of Service and Privacy */}
            {/*   Policy */}
            {/* </Muted> */}
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
