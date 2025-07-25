import ScrollView from "@/components/general/scrollview";
import { Text } from "@/components/ui/text";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { SafeAreaView, View } from "react-native";

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
    <ScrollView containerClassName="gap-4" contentContainerClassName="gap-8">
      {[1, 2, 3, 4, 5].map((i) => {
        return (
          <View
            key={i}
            className="bg-background h-45 aspect-square border border-border"
          >
            <Text></Text>
          </View>
        );
      })}
    </ScrollView>
  );
}
