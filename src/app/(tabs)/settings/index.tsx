import { Button } from "@/components/general/button";
import { ScrollView } from "@/components/general/with-headers";
import { Text } from "@/components/ui/text";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { Entypo } from "@/lib/icons/Entypo";
import { Grouped } from "@/components/general/grouped";

// TODO: add big user information card
// TODO: add settings for toggle for notifications
// TODO: add appearance settings
// TODO: add app settings for language, region, etc.
// TODO: add developer settings if developer mode is enabled
// TODO: add app information card with version, build, etc.
// TODO: add links for app social media
// TODO: add support links
// TODO: add signout button

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
      <Grouped.Section title="Account">
        <Grouped.Text>Account</Grouped.Text>
        <Grouped.Text>Account</Grouped.Text>
        <Grouped.Text hint="v1.2.3">Account</Grouped.Text>
        <Grouped.Link href="_">Account</Grouped.Link>
      </Grouped.Section>
    </ScrollView>
  );
}
