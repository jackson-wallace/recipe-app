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

export default function AuthForm({ isSignUp }: { isSignUp: boolean }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingOAuth, setLoadingOAuth] = useState(false);
  const [loadingPhoneAuth, setLoadingPhoneAuth] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const handleLoginWithOTP = async () => {
    setLoadingPhoneAuth(true);
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
    setLoadingPhoneAuth(false);
  };

  const handleChangeTextOTP = (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      handleVerifyOTP();
    }
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

        console.log(JSON.stringify(credential, null, 2));
        // Sign in via Supabase Auth.
        if (credential.identityToken) {
          const {
            error,
            data: { user },
          } = await supabase.auth.signInWithIdToken({
            provider: "apple",
            token: credential.identityToken,
          });
          console.log(JSON.stringify({ error, user }, null, 2));
          if (!error) {
            // User is signed in.
            console.log("User is signed in.");

            // Check if user exists in DB
            if (isSignUp) {
              // if user does not exist, create a new user
              // if user does exist, redirect to sign-in
            } else {
              // if user does not exist, redirect to sign-up
              // if user does exist, redirect to home
            }
          }
        } else {
          Alert.alert("No identityToken.");
          throw new Error("No identityToken.");
        }
      } catch (e) {
        // @ts-ignore
        if (e.code === "ERR_REQUEST_CANCELED") {
          // handle that the user canceled the sign-in flow
        } else {
          // handle other errors
          Alert.alert("Error", (e as Error).message);
        }
      }
    }
    setLoadingOAuth(false);
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
          disabled={loadingPhoneAuth || loadingOAuth}
        />

        <View className="flex flex-row justify-center items-center w-11/12 mt-4 overflow-hidden">
          <View className="mx-2 border border-base-content opacity-25 w-1/2" />
          <Text className="mx-2 text-base-content opacity-25">OR</Text>
          <View className="mx-2 border border-base-content opacity-25 w-1/2" />
        </View>

        {/* OAuth Button */}
        <CustomButton
          title="Login with Apple"
          className="mt-4 w-11/12"
          iconLeft={faApple}
          iconColor="#282425"
          onPress={handleLoginWithOAuth}
          disabled={loadingPhoneAuth || loadingOAuth}
        />
        {isSignUp ? (
          <TouchableOpacity
            className="mt-6"
            onPress={() => router.replace("/(auth)/sign-in")}
            disabled={loadingPhoneAuth || loadingOAuth}
          >
            <Text className="">Login to existing account</Text>
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
