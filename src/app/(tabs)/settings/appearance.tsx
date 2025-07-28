import { ScrollView } from "@/components/general/with-headers";
import { Grouped } from "@/components/general/grouped";
import { useColorScheme } from "@/lib/useColorScheme";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";
import { Button } from "@/components/ui/button";
import { Lucide } from "@/lib/icons/Lucide";

// TODO: add accent color input
// TODO: add darkmode light mode toggle or dropdown
// TODO: add font size input

export default function Appearance() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  function toggleColorScheme() {
    const newTheme = isDarkColorScheme ? "light" : "dark";
    setColorScheme(newTheme);
  }

  return (
    <ScrollView
      headerProps={{
        headerLeft: (
          <Button
            size="sm"
            variant={"ghost"}
            className="flex-row gap-1"
            onPress={() => router.back()}
          >
            <Lucide name="ChevronLeft" />
            <Text className={"text-primary"}>Settings</Text>
          </Button>
        ),
      }}
      title="Appearance"
      largeHeader={false}
    >
      <Grouped.Section title="theme">
        <Grouped.Toggle value={isDarkColorScheme} onPress={toggleColorScheme}>
          Dark Mode
        </Grouped.Toggle>
      </Grouped.Section>
    </ScrollView>
  );
}
