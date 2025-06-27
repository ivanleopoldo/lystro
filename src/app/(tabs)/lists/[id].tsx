import { FlatList, Pressable, SafeAreaView, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Text } from "@/components/ui/text";
import { dummyListItemData } from "@/lib/constants";

export default function ListItem() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dummyListItem = dummyListItemData.filter((item) => item.list_id === id);
  return (
    <SafeAreaView>
      <FlatList
        data={dummyListItem}
        contentContainerClassName="p-4"
        ItemSeparatorComponent={() => <View className="h-2" />}
        renderItem={({ item }) => {
          return (
            <Pressable className="flex-1 bg-neutral-100 rounded-lg px-4 py-4">
              <Text key={item.id}>{item.name}</Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}
