import CustomButton from "@/components/ui/button";
import CustomTextInput from "@/components/ui/text-input";
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import { router } from "expo-router";
import { useState } from "react";
import { supabase } from "@/utils/supabase";

export default function AuthForm({ isSignUp }: { isSignUp: boolean }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const handleLoginWithOTP = async () => {
    // setLoading(true);
    // Validate name and phone number
    if (!phoneNumber) {
      Alert.alert("Phone number is required.");
      return;
    }
    if (phoneNumber.length < 10 || !/^\d+$/.test(phoneNumber)) {
      Alert.alert("Phone number is invalid.");
      return;
    }
    if (isSignUp && !name) {
      Alert.alert("Name is required.");
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      phone: "+1" + phoneNumber,
    });

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    setModalVisible(true);
  };

  const handleVerifyOTP = async () => {
    // Validate OTP
    if (!otp || otp.length < 6) {
      Alert.alert("OTP is required.");
      return;
    }

    const { data, error } = await supabase.auth.verifyOtp({
      phone: "+1" + phoneNumber,
      token: otp,
      type: "sms",
    });

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    // Use isSignUp boolean to conditionally chack if user exists in DB
    if (isSignUp) {
      const { data, error } = await supabase.auth.updateUser({
        data: { name: name },
      });

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }
    }

    setModalVisible(false);
    console.log("data:", data);
  };

  const handleChangeTextOTP = (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      handleVerifyOTP();
    }
  };

  const handleLoginWithOAuth = async () => {
    setLoading(true);

    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
      <SafeAreaView className="flex-1 px-4 justify-center items-center bg-base-100">
        {isSignUp ? (
          <Text className="text-base-content text-2xl font-Bold">
            Signup new account
          </Text>
        ) : (
          <Text className="text-base-content text-2xl font-Bold mb-2">
            Login to your account
          </Text>
        )}
        {isSignUp && (
          <CustomTextInput
            label="Name"
            placeholder="Your name"
            containerStyle="w-11/12"
            onChangeText={(value) => setName(value)}
            maxLength={32}
          />
        )}
        <CustomTextInput
          label="Phone number"
          placeholder="Your phone number"
          keyboardType="phone-pad"
          containerStyle="w-11/12"
          onChangeText={(value) => setPhoneNumber(value)}
          maxLength={10}
        />

        {/* OTP Button */}
        <CustomButton
          title="Login with phone number"
          className="mt-4 w-11/12"
          variant="neutral"
          iconLeft={faPhone}
          iconColor="#EDE6D4"
          onPress={handleLoginWithOTP}
        />

        <View className="flex flex-row justify-center items-center w-11/12 mt-4 overflow-hidden">
          <View className="mx-2 border border-base-content opacity-25 w-1/2" />
          <Text className="mx-2 text-base-content opacity-25">OR</Text>
          <View className="mx-2 border border-base-content opacity-25 w-1/2" />
        </View>

        {/* OAuth Button */}
        <CustomButton
          title="Login with Google"
          className="mt-4 w-11/12"
          iconLeft={faGoogle}
          iconColor="#282425"
          onPress={handleLoginWithOAuth}
        />
        {isSignUp ? (
          <TouchableOpacity
            className="mt-6"
            onPress={() => router.replace("/(auth)/sign-in")}
          >
            <Text className="">Login to existing account</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="mt-6"
            onPress={() => router.replace("/(auth)/sign-up")}
          >
            <Text className="">Create a new account</Text>
          </TouchableOpacity>
        )}

        {/* OTP Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          className="flex items-center justify-center"
        >
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            className="flex-1"
          >
            <View className="flex-1 justify-center items-center bg-base-100 p-6 rounded-lg w-full flex items-center relative">
              <Text className="text-2xl font-Bold mb-4 text-base-content">
                Verify phone number
              </Text>
              <View className="flex flex-row mb-4">
                <Text className="text-base-content opacity-50">
                  OTP has been sent to{" "}
                </Text>
                <Text className="text-base-content">[phone number]</Text>
              </View>
              <CustomTextInput
                containerStyle="w-24"
                inputStyle="text-center"
                onChangeText={(value) => handleChangeTextOTP(value)}
              />
              <View className="mt-8 h-8">
                {true ? (
                  <TouchableOpacity>
                    <Text className="flex items-center justify-center text-base-content font-bold">
                      Resend OTP
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View className="flex flex-col items-center">
                    <Text className="text-base-content">Resend in</Text>
                    <Text className="text-base-content font-bold">00:30</Text>
                  </View>
                )}
              </View>
              <CustomButton
                title="Verify"
                className="absolute bottom-10 mb-4 w-11/12"
                variant="neutral"
                onPress={handleVerifyOTP}
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

// Sign in with sms otp
// const { data, error } = await supabase.auth.signInWithOtp({
//   phone: '+13334445555',
// })

// Resend an otp
// const { error } = await supabase.auth.resend({
//   type: 'sms',
//   phone: '1234567890'
// })

// Verify and login with otp
// const { data, error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms'})

// Updating a phone number
// const { data, error } = await supabase.auth.updateUser({
//   phone: '123456789',
// })
