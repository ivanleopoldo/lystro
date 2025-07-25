import ScrollView from "@/components/general/scrollview";
import { Button } from "@/components/general/button";
import { Text } from "@/components/ui/text";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { SafeAreaView, View } from "react-native";
import { FontAwesome5 } from "@/lib/icons/FontAwesome5";
import { Entypo } from "@/lib/icons/Entypo";

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
    <ScrollView
      title="Settings"
      showsVerticalScrollIndicator={false}
      containerClassName="gap-4"
      largeHeader={false}
      contentContainerClassName="gap-8"
    >
      {/* FIX: on pressed button text goes white instead of keeping red */}
      <Button
        icon={
          <Entypo name="log-out" className="text-red-500 active:text-red-600" />
        }
        variant={"secondary"}
        onPress={handleSignOut}
      >
        <Text className="text-red-500 active:text-red-600 font-bold">
          Sign Out
        </Text>
      </Button>
    </ScrollView>
  );
}
