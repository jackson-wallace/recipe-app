import React from "react";
import {
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";

import { CustomTextInputProps } from "@/types/type";

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}) => {
  return (
    <KeyboardAvoidingView
      className=""
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className={`my-2 w-full`}>
        {label && (
          <Text className={`text-md text-base-content mb-1 ${labelStyle}`}>
            {label}
          </Text>
        )}
        <View
          className={`flex flex-row justify-start items-center relative bg-base-200 rounded-lg w-full ${containerStyle}`}
        >
          {icon && (
            <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
          )}
          <TextInput
            className={`border border-base-300 rounded-lg px-4 py-3 flex-1 bg-base-200 focus:border-base-content text-left text-base-content ${inputStyle}`}
            secureTextEntry={secureTextEntry}
            // autoComplete="off"
            placeholderTextColor="#C0BAA9"
            {...props}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CustomTextInput;
