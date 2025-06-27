import { FlatList, Pressable, SafeAreaView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { dummyListData } from "@/lib/constants";
import { Button } from "@/components/general/button";
import { router } from "expo-router";
import { Muted } from "@/components/ui/typography";

export default function Home() {
  const handlePressList = (id: string) => {
    router.push(`/lists/${id}`);
  };
  return (
    <SafeAreaView>
      <FlatList
        data={dummyListData}
        contentContainerClassName="p-4"
        ItemSeparatorComponent={() => <View className="h-2" />}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => handlePressList(item.id)}
              className="bg-neutral-100 items-center justify-between rounded-lg pl-2 pr-4 py-2 flex-row gap-4"
              key={item.id}
            >
              <View className="flex-row items-center gap-2">
                <View className="flex bg-red-200 p-3 rounded-lg">
                  <Text>🚀</Text>
                </View>
                <View>
                  <Text>{item.name}</Text>
                  <Muted className="">{item.name}</Muted>
                </View>
              </View>
              <View className="flex items-center justify-center h-8 w-8 bg-neutral-200 rounded-full">
                <Text>h</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}
