import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FeedTab() {
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-base-100">
      <Text className="text-base-content text-2xl">Feed</Text>
    </SafeAreaView>
  );
}
