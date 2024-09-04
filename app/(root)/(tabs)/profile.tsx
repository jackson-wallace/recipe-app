import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileTab() {
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-base-100">
      <Text>Profile</Text>
    </SafeAreaView>
  );
}
