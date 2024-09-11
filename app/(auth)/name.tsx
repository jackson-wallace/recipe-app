import CustomButton from "@/components/ui/button";
import CustomTextInput from "@/components/ui/text-input";
import { useOnboarding } from "@/providers/onboarding-provider";
import { router } from "expo-router";
import { Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Name() {
  const { name, setName } = useOnboarding();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
      <SafeAreaView className="flex-1 px-4 justify-center items-center bg-base-100">
        <Text className="text-base-content text-2xl font-Bold">
          Enter your name
        </Text>
        <Text className="text-base-content mt-2 mb-4">
          This doesn't have to be unique
        </Text>
        <CustomTextInput
          placeholder="Ex. Johnny Doe"
          value={name}
          onChangeText={(value) => setName(value)}
          containerStyle="w-11/12"
        />
        <CustomButton
          title="Next"
          onPress={() => router.push("/(auth)/username")}
          variant="neutral"
          className="mt-4 w-11/12"
        ></CustomButton>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
