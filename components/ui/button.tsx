import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { CustomButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: CustomButtonProps["variant"]) => {
  switch (variant) {
    case "primary":
      return "bg-primary";
    case "secondary":
      return "bg-secondary";
    case "accent":
      return "bg-accent";
    case "neutral":
      return "bg-neutral";
    case "info":
      return "bg-info";
    case "success":
      return "bg-success";
    case "warning":
      return "bg-warning";
    case "error":
      return "bg-error";
    default:
      return "bg-base-200";
  }
};

const getTextVariantStyle = (variant: CustomButtonProps["variant"]) => {
  switch (variant) {
    case "primary":
      return "text-primary-content";
    case "secondary":
      return "text-secondary-content";
    case "accent":
      return "text-accent-content";
    case "neutral":
      return "text-neutral-content";
    case "info":
      return "text-info-content";
    case "success":
      return "text-success-content";
    case "warning":
      return "text-warning-content";
    case "error":
      return "text-error-content";
    default:
      return "text-base-content";
  }
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant,
  iconLeft,
  iconRight,
  iconColor,
  className,
  loading,
  ...props
}) => {
  return (
    <TouchableOpacity
      className={`py-3 px-4 rounded-lg ${getBgVariantStyle(
        variant
      )} ${className}`}
      onPress={onPress}
      {...props}
    >
      <View className="items-center justify-center">
        {loading ? (
          <ActivityIndicator color={iconColor} />
        ) : (
          <View className="flex flex-row space-x-2 ">
            {iconLeft && <FontAwesomeIcon icon={iconLeft} color={iconColor} />}
            <Text
              className={`text-center text-md font-bold ${getTextVariantStyle(
                variant
              )}`}
            >
              {title}
            </Text>
            {iconRight && (
              <FontAwesomeIcon icon={iconRight} color={iconColor} />
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
