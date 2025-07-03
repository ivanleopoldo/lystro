import { Button } from "@/components/general/button";
import Logo from "@/components/general/logo";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Muted } from "@/components/ui/typography";
import { FontAwesome5 } from "@/lib/icons/FontAwesome5";
import { useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView, View } from "react-native";

export default function AuthScreen() {
  const [isSignIn, setIsSignIn] = useState(true);
  const {
    isLoaded: isSignInLoaded,
    signIn,
    setActive: setSignInActive,
  } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // TODO: use clerk for apple and google signin
  const handleAppleSignIn = () => {};
  const handleGoogleSignIn = () => {};

  const handleSignIn = async () => {
    if (!isSignInLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setSignInActive({ session: signInAttempt.createdSessionId });
        router.replace("/lists");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // TODO: implement email password auth signup
  const handleSignUp = async () => {};

  return (
    <SafeAreaView className="relative flex-1">
      <View className="p-6 justify-between flex-1">
        <View className="flex-1 mt-36 gap-4">
          <View className="items-center gap-4">
            <View className="flex-row items-center justify-center gap-2">
              <Logo className="h-12 w-12 rounded-xl" />
              <Text className="font-semibold text-xl">Lystro</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold">
                {isSignIn ? "Welcome back" : "Welcome to Lystro"}
              </Text>
              <Muted className="text-md">
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
              onPress={() => handleAppleSignIn()}
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
              onPress={() => handleGoogleSignIn()}
              variant="secondary"
            >
              <Text>{isSignIn ? "Login" : "Register"} with Google</Text>
            </Button>
          </View>
          <View className="flex-row items-center gap-3">
            <View className="flex-1 h-px bg-muted" />
            <Muted>OR CONTINUE WITH</Muted>
            <View className="flex-1 h-px bg-muted" />
          </View>
          <View className="gap-4">
            <Input
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="john@doe.com"
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              secureTextEntry
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
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
              }}
            >
              <Text>{isSignIn ? "Sign In" : "Create an account"}</Text>
            </Button>
          </View>
        </View>
        <View className="flex-row items-center justify-center">
          <Text>
            {isSignIn ? "Don't have account? " : "Already have an account? "}
          </Text>
          <Text
            className="text-primary underline"
            onPress={() => setIsSignIn((prev) => !prev)}
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
