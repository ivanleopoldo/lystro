import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { View, SafeAreaView, Linking } from "react-native";

export default function Settings() {
  const { signOut } = useClerk();
  const { user } = useUser();

  if (!user) return;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Settings</Text>
        <Text>username: {user.fullName}</Text>
        <Text>email: {user.primaryEmailAddress?.emailAddress}</Text>
        <Button onPress={handleSignOut}>
          <Text>Sign Out</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
