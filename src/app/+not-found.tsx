import { Link, router, Stack } from "expo-router";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/general/button";
import { FontAwesome5 } from "@/lib/icons/FontAwesome5";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-between p-6">
        <View className="flex-1 items-center justify-center gap-4">
          <Text className="text-5xl font-bold">Oops!</Text>
          <Text className="text-xl">PAGE NOT FOUND!</Text>
        </View>
        <View>
          <Button
            onPress={() => {
              router.back();
            }}
            icon={<FontAwesome5 name="chevron-left" />}
            variant={"secondary"}
          >
            <Text>Back</Text>
          </Button>
        </View>
      </View>
    </>
  );
}
