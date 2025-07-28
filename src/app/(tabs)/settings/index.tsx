import { Button } from "@/components/general/button";
import { Grouped } from "@/components/general/grouped";
import { ScrollView } from "@/components/general/with-headers";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { Small } from "@/components/ui/typography";
import { Entypo } from "@/lib/icons/Entypo";
import { FontAwesome6 } from "@/lib/icons/FontAwesome6";
import { Lucide } from "@/lib/icons/Lucide";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

// TODO: add big user information card
// TODO: add settings for toggle for notifications
// TODO: add appearance settings
// TODO: add app settings for language, region, etc.
// TODO: add developer settings if developer mode is enabled
// TODO: add app information card with version, build, etc.
// TODO: add links for app social media
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

  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <ScrollView
      title="Settings"
      showsVerticalScrollIndicator={false}
      containerClassName="gap-4"
      headerProps={{
        // FIX: background is transparent
        headerLeft: (
          <Button
            size="sm"
            variant={"ghost"}
            className="flex-row gap-1"
            onPress={() => router.back()}
          >
            <Lucide name="ChevronLeft" />
            <Text className={"text-primary"}>Lists</Text>
          </Button>
        ),
      }}
      contentContainerClassName="gap-8"
    >
      <Grouped.Section>
        <Grouped.Card
          onPress={() => router.push("/settings/account")}
          className="flex-row items-center justify-between"
        >
          <View className="flex-row gap-2 items-center">
            <Avatar alt="img">
              <AvatarImage source={{ uri: user.imageUrl }} />
            </Avatar>
            <View className="flex justify-center">
              <Text className="text-lg font-semibold">{user.fullName}</Text>
              <Small className="text-muted-foreground">
                {user.primaryEmailAddress?.emailAddress}
              </Small>
            </View>
          </View>
          <Lucide
            className="text-muted-foreground"
            size={16}
            name="ChevronRight"
          />
        </Grouped.Card>
      </Grouped.Section>

      <Grouped.Section title="App">
        <Grouped.Link href={"/settings/app"}>App Settings</Grouped.Link>
        <Grouped.Link href={"/settings/appearance"}>
          Change Appearance
        </Grouped.Link>
        <Grouped.Toggle
          value={isEnabled}
          onPress={() => setIsEnabled((prev) => !prev)}
        >
          Toggle Notifications
        </Grouped.Toggle>
      </Grouped.Section>

      <Grouped.Section title="developer">
        <Grouped.Link href={"/settings/developer"}>
          Developer Settings
        </Grouped.Link>
        <Grouped.Link href={"/settings/developer"}>Logs</Grouped.Link>
      </Grouped.Section>

      <Grouped.Section title="info">
        <Grouped.Text
          leftIcon={<FontAwesome6 name="patreon" size={16} />}
          hint="1.2.23"
        >
          App Version
        </Grouped.Text>
        <Grouped.Text hint="14234fawe32">Build Number</Grouped.Text>
      </Grouped.Section>

      <Grouped.Section title="links">
        {/* FIX: add left icon prop to Grouped.Link */}
        <Grouped.Link
          leftIcon={<FontAwesome6 name="discord" size={16} />}
          target="_blank"
          href="https://discord.com"
        >
          Join me at Discord!
        </Grouped.Link>
        <Grouped.Link
          leftIcon={<FontAwesome6 name="github" size={18} />}
          target="_blank"
          href="https://github.com/ivanleopoldo/lystro"
        >
          Follow me on Github
        </Grouped.Link>
      </Grouped.Section>

      <Grouped.Section title="support">
        {/* FIX: add left icon prop to Grouped.Link */}
        <Grouped.Link
          leftIcon={<FontAwesome6 name="patreon" size={16} />}
          href="https://discord.com"
        >
          Support me on Patreon
        </Grouped.Link>
        <Grouped.Link
          leftIcon={<FontAwesome6 name="paypal" size={18} />}
          href="https://github.com/ivanleopoldo/lystro"
        >
          Support me on PayPal
        </Grouped.Link>
      </Grouped.Section>

      <Button
        icon={<Entypo name="log-out" size={16} className="text-red-500" />}
        variant={"secondary"}
        onPress={handleSignOut}
      >
        <Text className="!text-red-500 font-bold active:text-red-500">
          Sign Out
        </Text>
      </Button>
    </ScrollView>
  );
}
