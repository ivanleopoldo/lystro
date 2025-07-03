import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { View, SafeAreaView, Linking } from "react-native";

export default function Settings() {
  const { signOut } = useClerk();
  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      router.replace("/");
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <SafeAreaView>
      <View>
        <Text>Settings</Text>
        <Button onPress={handleSignOut}>
          <Text>Sign Out</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
