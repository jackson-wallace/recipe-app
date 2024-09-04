import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "info"
    | "success"
    | "warning"
    | "error";
  iconLeft?: IconDefinition;
  iconRight?: IconDefinition;
  iconColor?: string;
  className?: string;
}

declare interface CustomTextInputProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}
