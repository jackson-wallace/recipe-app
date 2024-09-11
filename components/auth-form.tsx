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
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { faApple } from "@fortawesome/free-brands-svg-icons/faApple";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import { router } from "expo-router";
import { useState } from "react";
import { supabase } from "@/utils/supabase";
import * as AppleAuthentication from "expo-apple-authentication";
import { useAuth } from "@/providers/auth-provider";

export default function AuthForm({ isSignUp }: { isSignUp: boolean }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingOAuth, setLoadingOAuth] = useState(false);
  const [loadingPhoneAuth, setLoadingPhoneAuth] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const { getUserFromDB } = useAuth();

  const handleSendWithOTP = async () => {
    setLoadingPhoneAuth(true);
    try {
      // Validate name and phone number
      if (!phoneNumber) {
        throw new Error("Phone number is required.");
      }

      if (phoneNumber.length < 10 || !/^\d+$/.test(phoneNumber)) {
        throw new Error("Phone number is invalid.");
      }

      // Send OTP
      const { error } = await supabase.auth.signInWithOtp({
        phone: "+1" + phoneNumber,
      });

      if (error) {
        throw new Error(error.message);
      }
      setModalVisible(true);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
      setLoadingPhoneAuth(false);
    }
  };

  const handleVerifyOTP = async () => {
    // Validate OTP
    if (!otp || otp.length < 6) {
      Alert.alert("OTP is required.");
      return;
    }

    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: "+1" + phoneNumber,
        token: otp,
        type: "sms",
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }

    handleRedirectAfterAuth();
  };

  const handleLoginWithOAuth = async () => {
    setLoadingOAuth(true);
    if (Platform.OS === "ios") {
      try {
        const credential = await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
        });

        if (!credential.identityToken) {
          throw new Error("Apple login failed - Missing identity token.");
        }

        const {
          error,
          data: { user },
        } = await supabase.auth.signInWithIdToken({
          provider: "apple",
          token: credential.identityToken,
        });

        if (error) {
          throw new Error(error.message);
        }

        handleRedirectAfterAuth();
      } catch (e) {
        Alert.alert("Error", (e as Error).message);
        // @ts-ignore
        if (e.code === "ERR_REQUEST_CANCELED") {
          // Handle user canceled the sign-in flow
        } else {
          // Handle other errors
        }
      }
    }
    setLoadingOAuth(false);
  };

  const handleRedirectAfterAuth = async () => {
    const user = await getUserFromDB();

    if (modalVisible) {
      setModalVisible(false);
    }

    // If sign-up form but user already exists, redirect to sign-in
    if (isSignUp && user) {
      setLoadingPhoneAuth(false);
      Alert.alert("User already exists. Please login.");
      return;
    }

    // If sign-in form and user does not exist, redirect to sign-up
    if (!isSignUp && !user) {
      setModalVisible(false);
      setLoadingPhoneAuth(false);
      Alert.alert("User does not exist. Please sign up.");
      return;
    }

    // If sign-up form and user does not exist, create a new user with onboarding flow
    if (isSignUp && !user) {
      setModalVisible(false);
      setLoadingPhoneAuth(false);
      console.log("User does not exist. Redirecting to name.");
      // Create a new user
      router.replace("/(auth)/name");
      return;
    }

    // If sign-in form and user exists, redirect to feed
    if (!isSignUp && user) {
      setModalVisible(false);
      setLoadingPhoneAuth(false);
      console.log("User exists. Redirecting to feed.");
      // Redirect to feed
      router.replace("/(root)/(tabs)/feed");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
      <SafeAreaView className="flex-1 px-4 justify-center items-center bg-base-100">
        <Text className="text-base-content text-2xl font-Bold mb-2">
          {isSignUp ? "Create new account" : "Login to your account"}
        </Text>
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
          title="Continue with phone number"
          className="mt-4 w-11/12"
          variant="neutral"
          iconLeft={faPhone}
          iconColor="#EDE6D4"
          onPress={handleSendWithOTP}
          disabled={loadingPhoneAuth || loadingOAuth}
          loading={loadingPhoneAuth}
        />

        <View className="flex flex-row justify-center items-center w-11/12 mt-4 overflow-hidden">
          <View className="mx-2 border border-base-content opacity-25 w-1/2" />
          <Text className="mx-2 text-base-content opacity-25">OR</Text>
          <View className="mx-2 border border-base-content opacity-25 w-1/2" />
        </View>

        {/* OAuth Button */}
        <CustomButton
          title="Continue with Apple"
          className="mt-4 w-11/12"
          iconLeft={faApple}
          iconColor="#282425"
          onPress={handleLoginWithOAuth}
          disabled={loadingPhoneAuth || loadingOAuth}
          loading={loadingOAuth}
        />
        {isSignUp ? (
          <TouchableOpacity
            className="mt-6"
            onPress={() => router.replace("/(auth)/sign-in")}
            disabled={loadingPhoneAuth || loadingOAuth}
          >
            <Text className="">Login to an existing account</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="mt-6"
            onPress={() => router.replace("/(auth)/sign-up")}
            disabled={loadingPhoneAuth || loadingOAuth}
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
                <Text className="text-base-content">{"+1" + phoneNumber}</Text>
              </View>
              <CustomTextInput
                containerStyle="w-24"
                inputStyle="text-center"
                onChangeText={(value) => setOtp(value)}
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

// Resend an otp
// const { error } = await supabase.auth.resend({
//   type: 'sms',
//   phone: '1234567890'
// })
