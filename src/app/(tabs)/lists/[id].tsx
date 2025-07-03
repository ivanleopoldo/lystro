import { FlatList, Pressable, SafeAreaView, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Text } from "@/components/ui/text";
import { Item } from "@/lib/schema";

// TODO: Use InstantDB
export default function ListItem() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const data: Item[] = [];
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        contentContainerClassName="p-4"
        ItemSeparatorComponent={() => <View className="h-2" />}
        renderItem={({ item }) => {
          return (
            // TODO: make swipeable
            <Pressable
              key={item.id}
              className="flex-1 bg-neutral-100 rounded-lg px-4 py-4"
            >
              <Text>{item.title}</Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}
