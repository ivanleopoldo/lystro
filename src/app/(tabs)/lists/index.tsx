import { Alert, FlatList, Pressable, SafeAreaView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { Muted } from "@/components/ui/typography";
import db from "@/lib/db";

export default function Home() {
  const handlePressList = (id: string) => {
    router.push(`/lists/${id}`);
  };

  const { isLoading, error, data } = db.useQuery({ lists: {} });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    Alert.alert("Error", error.message);
  }

  const lists = data?.lists;

  const hasCollaborators: boolean = true;

  return (
    <SafeAreaView>
      <FlatList
        data={lists}
        contentContainerClassName="p-4"
        ItemSeparatorComponent={() => <View className="h-2" />}
        renderItem={({ item }) => {
          const hasCollaborators = item.collaborators.length > 0;
          return (
            <Pressable
              onPress={() => handlePressList(item.id)}
              className="bg-neutral-100 items-center justify-between rounded-lg pl-2 pr-4 py-2 flex-row gap-4"
              key={item.id}
            >
              <View className="flex-row items-center gap-4">
                <View className="flex bg-red-200 p-3 rounded-lg">
                  <Text>🚀</Text>
                </View>
                <View>
                  <Text>{item.title}</Text>
                  <Muted className="">{item.title}</Muted>
                </View>
              </View>
              {hasCollaborators ? (
                <View className="flex items-center justify-center h-8 w-8 bg-neutral-200 rounded-full">
                  <Text>h</Text>
                </View>
              ) : (
                <View>
                  <Text>{">"}</Text>
                </View>
              )}
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}
