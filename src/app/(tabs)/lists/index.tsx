import { FlatList, Pressable, SafeAreaView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { dummyListData } from "@/lib/constants";
import { Button } from "@/components/general/button";
import { router } from "expo-router";

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
              className="bg-neutral-100 rounded-lg px-4 py-4"
              key={item.id}
            >
              <Text>{item.name}</Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}
