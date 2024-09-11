import CustomButton from "@/components/ui/button";
import CustomTextInput from "@/components/ui/text-input";
import { useAuth } from "@/providers/auth-provider";
import { useOnboarding } from "@/providers/onboarding-provider";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import {
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Username() {
  const { name, setName, username, setUsername } = useOnboarding();
  const { session } = useAuth();

  const createNewUser = async () => {
    // Create a new user
    const { error } = await supabase.from("users").insert([
      {
        id: session?.user?.id,
        username,
        name,
      },
    ]);

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    router.replace("/(root)/(tabs)/feed");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
      <SafeAreaView className="flex-1 px-4 justify-center items-center bg-base-100 relative">
        <TouchableOpacity
          onPress={() => {
            router.push("/(auth)/name");
          }}
          className="w-full flex justify-start items-start p-5 absolute top-12 left-2"
        >
          <Text className="text-base-content text-md">Back</Text>
        </TouchableOpacity>
        <Text className="text-base-content text-2xl font-Bold">
          Enter your username
        </Text>
        <Text className="text-base-content mt-2 mb-4">
          This has to be unique
        </Text>
        <CustomTextInput
          placeholder="Ex. JohnnyDoe123"
          value={username}
          onChangeText={(value) => setUsername(value)}
          containerStyle="w-11/12"
        />
        <CustomButton
          title="Create Account"
          onPress={createNewUser}
          variant="neutral"
          className="mt-4 w-11/12"
        ></CustomButton>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
