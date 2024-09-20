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
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPlus,
  faBookmark,
  faUtensils,
  faHeart,
  faSort,
  faCheck,
  faXmark,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/ui/button";
import CustomTextInput from "@/components/ui/text-input";
import { useAuth } from "@/providers/auth-provider";
import {
  fetchCustomBooks,
  fetchDefaultBooks,
  addNewBook,
} from "@/utils/book-service";
import { Book } from "@/types/type";
import { Href, router } from "expo-router";

export default function BooksTab() {
  const [loading, setLoading] = useState(true);
  const [sortingModalVisible, setSortingModalVisible] = useState(false);
  const [newBookModalVisible, setNewBookModalVisible] = useState(false);
  const [newBookName, setNewBookName] = useState("");
  const [selectedSortMethod, setSelectedSortMethod] = useState("Recents");
  const [customBooks, setCustomBooks] = useState<Book[]>([]); // Store non-default books
  const { session } = useAuth();

  const loadBooks = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    const books = await fetchCustomBooks(session?.user?.id);
    // should add an updated_at column to the books table so that we can sort by recents
    const sortedBooks = sortBooksBySortMethod(books, selectedSortMethod);
    console.log(JSON.stringify(sortedBooks, null, 2));

    setCustomBooks(sortedBooks);
    setLoading(false);
  };

  useEffect(() => {
    loadBooks();
  }, [session]);

  const handleAddNewBook = async () => {
    if (!newBookName.trim()) {
      // Handle empty book name case (optional)
      return;
    }
    if (!session?.user?.id) {
      console.error("User not authenticated");
      return;
    }
    try {
      await addNewBook(session.user.id, newBookName); // Pass the user ID and book name
      setNewBookModalVisible(false); // Close the modal after adding the book
      setNewBookName(""); // Reset the input field
      loadBooks();
    } catch (error) {
      console.error("Error adding new book:", error);
    }
  };

  const sortBooksBySortMethod = (books: Book[], sortMethod: string) => {
    switch (sortMethod) {
      case "Recents":
        return books.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "Alphabetical":
        return books.sort((a, b) => a.name.localeCompare(b.name));
      case "Creator":
        return books.sort((a, b) =>
          a.user_id.toString().localeCompare(b.user_id.toString())
        );
      default:
        return books;
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex h-full items-center justify-center bg-base-100 px-4">
        <ActivityIndicator size="large" color="#000000" />
      </SafeAreaView>
    );
  }

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
                {selectedSortMethod}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Custom Books from Database */}
          {customBooks.length === 0 ? (
            <View className="flex justify-center items-center h-full">
              <Text>You haven't created any Books!</Text>
              <View className="flex flex-row mt-2 items-center">
                <Text>Click the </Text>
                <FontAwesomeIcon icon={faPlus} color="#282425" size={16} />
                <Text> icon to get started.</Text>
              </View>
            </View>
          ) : (
            customBooks.map((book, index) => (
              <TouchableOpacity
                key={index}
                className="flex flex-row w-full my-2 justify-between items-center"
                // Bad practice to pass entire book object as params
                onPress={() => router.push(`/book/${book.id}` as Href)}
              >
                <View className="flex flex-row">
                  <Image
                    source={{
                      uri: book.image_url || "https://via.placeholder.com/100",
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
                      {book.num_recipes || 0} recipes • {book.author}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => {}}>
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    size={20}
                    color="#A8A4A5"
                  />
                </TouchableOpacity>
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
                    sortBooksBySortMethod(customBooks, "Recents");
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
                    sortBooksBySortMethod(customBooks, "Alphabetical");
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
                    sortBooksBySortMethod(customBooks, "Creator");
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
              onPress={() => setNewBookModalVisible(false)}
              className="w-full flex justify-start items-end absolute top-16 right-4"
            >
              <FontAwesomeIcon icon={faXmark} size={20} />
            </TouchableOpacity>
            <Text className="mb-4 font-Bold text-2xl">
              Give your new book a name
            </Text>
            <CustomTextInput
              value={newBookName}
              onChangeText={setNewBookName}
              inputStyle="text-center"
            />
            <View className="flex flex-row w-full justify-around mt-6">
              <Button
                title="Create"
                variant="neutral"
                onPress={handleAddNewBook}
                className="mb-4 w-1/3"
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
