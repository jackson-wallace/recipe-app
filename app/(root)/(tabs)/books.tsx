import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faBookmark } from "@fortawesome/free-solid-svg-icons/faBookmark";
import { faUtensils } from "@fortawesome/free-solid-svg-icons/faUtensils";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faSort } from "@fortawesome/free-solid-svg-icons/faSort";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { Modal } from "react-native";
import Button from "@/components/ui/button";
import CustomTextInput from "@/components/ui/text-input";
import { useAuth } from "@/providers/auth-provider";

export default function BooksTab() {
  const [loading, setLoading] = useState(false);
  const [sortingModalVisible, setSortingModalVisible] = useState(false);
  const [newBookModalVisible, setNewBookModalVisible] = useState(false);
  const [selectedSortMethod, setSelectedSortMethod] = useState("Recents");

  const { session } = useAuth();

  // you can query using session?.user.id instead of doing await supabase.auth.getUser();
  // ex: .eq("user_id", session?.user.id)

  if (loading) {
    return (
      <SafeAreaView className="flex h-full items-center justify-center bg-base-100 px-4">
        <ActivityIndicator size="large" color="#000000" />
      </SafeAreaView>
    );
  }

  const booksTest = [
    {
      name: "Date Night",
      numRecipes: "21",
      image: "https://via.placeholder.com/100",
      creator: "daviswestbrook",
    },

    {
      name: "Easy",
      numRecipes: "21",
      image: "https://via.placeholder.com/100",
      creator: "daviswestbrook",
    },
    {
      name: "Good Macros",
      numRecipes: "21",
      image: "https://via.placeholder.com/100",
      creator: "jacksonwallace",
    },
    {
      name: "Cocktails",
      numRecipes: "2100",
      image: "https://via.placeholder.com/100",
      creator: "jacksonwallace",
    },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
      <SafeAreaView className="flex h-full items-center justify-start bg-base-100 px-4">
        <View className="flex flex-row w-full items-center justify-between">
          <Text className="text-2xl font-Bold mt-1 text-base-content">
            Your Books
          </Text>
          <TouchableOpacity onPress={() => setNewBookModalVisible(true)}>
            <FontAwesomeIcon icon={faPlus} size={20} color="#282425" />
          </TouchableOpacity>
        </View>

        {/* MAIN BOOKS */}
        <View className="flex flex-row w-full mt-4">
          <TouchableOpacity className="flex-1 h-28 rounded-xl bg-base-200 justify-center items-center">
            <FontAwesomeIcon icon={faBookmark} size={24} color="#282425" />
            <Text className="text-base-content text-xs mt-2 font-bold">
              Want to make
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 h-28 rounded-xl bg-secondary mx-4 justify-center items-center">
            <FontAwesomeIcon icon={faUtensils} size={24} color="#282425" />
            <Text className="text-secondary-content text-xs mt-2  font-bold">
              Made
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 h-28 rounded-xl bg-primary justify-center items-center">
            <FontAwesomeIcon icon={faHeart} size={24} color="#282425" />
            <Text className="text-primary-content text-xs mt-2 font-bold">
              Keepers
            </Text>
          </TouchableOpacity>
        </View>

        {/* CUSTOM BOOKS */}
        <ScrollView className="flex-1 flex-col w-full mt-6">
          {/* Sorting */}
          <View className="flex flex-row w-full mb-4">
            <TouchableOpacity
              onPress={() => setSortingModalVisible(true)}
              className="flex flex-row"
            >
              <FontAwesomeIcon icon={faSort} color="#282425" />
              <Text className="font-bold ml-2 text-base-content">
                {/* Recents */}
                {/* Creator, Alphabetical */}
                {selectedSortMethod}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Books */}
          {booksTest.length === 0 ? (
            <View className="flex justify-center items-center h-full">
              <Text>You haven't created any Books!</Text>
              <View className="flex flex-row mt-2 items-center">
                <Text>Click the </Text>
                <FontAwesomeIcon icon={faPlus} color="#282425" size={16} />
                <Text> icon to get started.</Text>
              </View>
            </View>
          ) : (
            booksTest.map((book, index) => (
              <TouchableOpacity
                key={index}
                className="flex flex-row w-full my-1"
              >
                <Image
                  source={{
                    uri: book.image || "https://via.placeholder.com/100",
                  }}
                  style={{
                    width: "22%",
                    height: undefined,
                    aspectRatio: 1,
                    borderRadius: 10,
                  }}
                />
                <View className="flex flex-col justify-center ml-2">
                  <Text className="font-bold text-md">{book.name}</Text>
                  <Text className="text-sm opacity-50 text-base-content">
                    {book.numRecipes} recipes • {book.creator}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        {/* SORTING MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          presentationStyle="overFullScreen"
          visible={sortingModalVisible}
          onRequestClose={() => setSortingModalVisible(false)}
        >
          <TouchableWithoutFeedback
            onPress={() => setSortingModalVisible(false)}
          >
            <View className="flex-1 justify-end items-center">
              <View className="bg-base-200 p-6 rounded-lg w-full">
                <Text className="text-md text-base-content font-bold mb-4">
                  Sort by
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedSortMethod("Recents");
                    setSortingModalVisible(false);
                  }}
                  className="mb-3 flex flex-row justify-between"
                >
                  <Text className="text-base-content text-lg">Recents</Text>
                  {selectedSortMethod === "Recents" && (
                    <FontAwesomeIcon icon={faCheck} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedSortMethod("Alphabetical");
                    setSortingModalVisible(false);
                  }}
                  className="mb-3 flex flex-row justify-between"
                >
                  <Text className="text-base-content text-lg">
                    Alphabetical
                  </Text>
                  {selectedSortMethod === "Alphabetical" && (
                    <FontAwesomeIcon icon={faCheck} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedSortMethod("Creator");
                    setSortingModalVisible(false);
                  }}
                  className="mb-8 flex flex-row justify-between"
                >
                  <Text className="text-base-content text-lg">Creator</Text>
                  {selectedSortMethod === "Creator" && (
                    <FontAwesomeIcon icon={faCheck} />
                  )}
                </TouchableOpacity>
                <Button
                  title="Cancel"
                  variant="neutral"
                  onPress={() => setSortingModalVisible(false)}
                  className="mb-4"
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* NEW BOOK MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          presentationStyle="overFullScreen"
          visible={newBookModalVisible}
          onRequestClose={() => setNewBookModalVisible(false)}
        >
          <View className="flex-1 w-full justify-center items-center bg-base-100 px-4 relative">
            <TouchableOpacity
              onPress={() => {
                setNewBookModalVisible(false);
              }}
              className="w-full flex justify-start items-end absolute top-16 right-4"
            >
              <FontAwesomeIcon icon={faXmark} size={24} />
            </TouchableOpacity>
            <Text className="mb-4 font-Bold text-2xl">
              Give your new book a name
            </Text>
            <CustomTextInput inputStyle="text-center" />
            <View className="flex flex-row w-full justify-around mt-6">
              <Button
                title="Create"
                variant="neutral"
                onPress={() => setNewBookModalVisible(false)}
                className="mb-4 w-1/3"
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
