import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/stores/auth-store";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

import { Button } from "@/components/general/button";
import Logo from "@/components/general/logo";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Muted } from "@/components/ui/typography";
import { FontAwesome5 } from "@/lib/icons/FontAwesome5";

export default function AuthScreen() {
  const [isSignIn, setIsSignIn] = useState(true);
  const { isLoaded, signIn, setActive } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false),
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // TODO: make it better
  const email = useAuthStore((state) => state.email);
  const setEmail = useAuthStore((state) => state.setEmail);
  const username = useAuthStore((state) => state.username);
  const setUsername = useAuthStore((state) => state.setUsername);
  const password = useAuthStore((state) => state.password);
  const setPassword = useAuthStore((state) => state.setPassword);

  const handleSignIn = async () => {
    if (!isLoaded) return;
    try {
      const attempt = await signIn.create({ identifier: email, password });
      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        router.replace("/lists");
      } else {
        console.error("Incomplete sign-in", attempt);
      }
    } catch (err) {
      console.error("Sign-in error", err);
    }
  };

  const handleSignUp = async () => {
    if (!isSignUpLoaded) return;
    try {
      await signUp.create({
        emailAddress: email,
        username,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      router.push("/confirm");
    } catch (err) {
      console.error("Sign-up error", err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <ScrollView
          scrollEnabled={keyboardVisible}
          contentContainerClassName="grow p-12 justify-center"
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center gap-4 mb-10">
            <View className="flex-row items-center gap-2">
              <Logo className="h-12 w-12 rounded-xl" />
              <Text className="font-semibold text-xl">Lystro</Text>
            </View>
            <View className="items-center gap-1">
              <Text className="text-2xl font-bold">
                {isSignIn ? "Welcome back" : "Welcome to Lystro"}
              </Text>
              <Muted className="text-md text-center">
                {isSignIn
                  ? "Login with your Apple or Google account"
                  : "Create an account to continue"}
              </Muted>
            </View>
          </View>

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
              <Text>{isSignIn ? "Login" : "Register"} with Apple</Text>
            </Button>
            <Button
              icon={
                <FontAwesome5
                  name="google"
                  className="text-foreground"
                  size={16}
                />
              }
              onPress={() => {}}
              variant="secondary"
            >
              <Text>{isSignIn ? "Login" : "Register"} with Google</Text>
            </Button>
          </View>

          <View className="flex-row items-center gap-3 my-6">
            <View className="flex-1 h-px bg-muted" />
            <Muted>OR CONTINUE WITH</Muted>
            <View className="flex-1 h-px bg-muted" />
          </View>

          <View className="gap-3">
            <Input
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder={
                isSignIn ? "john@doe.com or john.doe" : "john@doe.com"
              }
              onChangeText={setEmail}
              value={email}
            />
            {!isSignIn && (
              <Input
                autoCapitalize="none"
                placeholder="Username"
                onChangeText={setUsername}
                value={username}
              />
            )}
            <Input
              secureTextEntry
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
            />
            <Button
              onPress={() => {
                if (isSignIn) {
                  handleSignIn();
                } else {
                  handleSignUp();
                }

                setEmail("");
                setPassword("");
                setUsername("");
              }}
            >
              <Text>{isSignIn ? "Sign In" : "Continue"}</Text>
            </Button>
          </View>

          <View className="flex-row items-center justify-center mt-6">
            <Text>
              {isSignIn
                ? "Don't have an account? "
                : "Already have an account? "}
            </Text>
            <Text
              className="text-primary underline"
              onPress={() => setIsSignIn((prev) => !prev)}
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
