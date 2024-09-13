import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  Image,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import CustomTextInput from "@/components/ui/text-input";
import testImage from "@/assets/images/vodka-carbonara.jpg";

export default function FeedTab() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
      <SafeAreaView className="flex h-full items-center justify-start bg-base-100 px-4">
        <View className="flex flex-row w-full items-center justify-between">
          <Text className="text-2xl font-Bold mt-1 text-base-content">
            CookBook
          </Text>
          <View className="w-14 flex flex-row justify-between">
            <FontAwesomeIcon icon={faBell} size={20} color="#282425" />
            <FontAwesomeIcon icon={faBars} size={20} color="#282425" />
          </View>
        </View>
        <CustomTextInput placeholder="Search a recipe, member, etc." />
        <Text className="text-base-content text-sm font-bold w-full justify-start my-4">
          YOUR FEED
        </Text>
        <View>
          <Image
            source={testImage}
            style={{
              width: "100%",
              height: undefined,
              aspectRatio: 1,
              borderRadius: 10,
            }}
          />
          <View className="flex flex-row w-full justify-between items-center mt-2">
            <Text className="text-base-content text-2xl font-Bold">
              Calabrian Carbonara
            </Text>
            <View className="flex flex-row">
              <FontAwesomeIcon icon={faClock} size={16} color="#282425" />
              <Text className="ml-1">45 min</Text>
            </View>
          </View>
          <View className="w-full flex flex-row items-center mb-2">
            <Text>Created by </Text>
            <Text className="font-bold">@davis-westbrook</Text>
          </View>
          <Text>
            A Calabrian spin on a Roman classic using nduja, a spicy, spreadable
            salami from Calabria. Spicy, creamy and satisfying!
          </Text>
          <View className="flex flex-row w-full justify-center items-center mt-2">
            <Text className="font-bold">30</Text>
            <Text> want to make | </Text>
            <Text className="font-bold">22</Text>
            <Text> made | </Text>
            <Text className="font-bold">18</Text>
            <Text> would make again</Text>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
