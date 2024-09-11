import CustomButton from "@/components/ui/button";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileTab() {
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error logging out:", error.message);
      return;
    }

    router.replace("/(auth)/sign-in");
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-base-100">
      <Text>Profile</Text>
      <CustomButton title={"Logout"} onPress={signOut}>
        <Text>Logout</Text>
      </CustomButton>
    </SafeAreaView>
  );
}
