import CustomButton from "@/components/ui/button";
import CustomTextInput from "@/components/ui/text-input";
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import { router } from "expo-router";

export default function SignUp() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
      <SafeAreaView className="flex-1 px-4 justify-center items-center bg-base-100">
        <Text className="text-base-content text-2xl font-Bold">
          Signup new account
        </Text>
        <CustomTextInput label="Name" placeholder="Your name" />
        <CustomTextInput
          label="Phone number"
          placeholder="Your phone number"
          keyboardType="phone-pad"
        />
        <CustomButton
          title="Send OTP"
          className="mt-4 w-11/12"
          variant="neutral"
          iconLeft={faPhone}
          iconColor="#EDE6D4"
        />
        <View className="flex flex-row justify-center items-center w-11/12 mt-4 overflow-hidden">
          <View className="mx-2 border border-base-content opacity-25 w-1/2" />
          <Text className="mx-2 text-base-content opacity-25">OR</Text>
          <View className="mx-2 border border-base-content opacity-25 w-1/2" />
        </View>
        <CustomButton
          title="Login with Google"
          className="mt-4 w-11/12"
          iconLeft={faGoogle}
          iconColor="#282425"
        />
        <TouchableOpacity
          className="mt-6"
          onPress={() => router.replace("/(auth)/sign-in")}
        >
          <Text className="">Login to existing account</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
