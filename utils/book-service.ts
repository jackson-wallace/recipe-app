import { supabase } from "@/utils/supabase";

// Fetch books with recipe count from the database
export async function fetchUserBooks(userId: string) {
  const { data, error } = await supabase
    .from("book")
    .select(
      `
        *,
        users (username),
        book_recipe (recipe_id)
      `
    )
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching books:", error);
    return [];
  }

  // Count the number of recipes per book based on the `book_recipe` relationship
  const booksWithRecipeCount = data.map((book) => ({
    ...book,
    author: book.users.username,
    num_recipes: book.book_recipe.length, // Count the recipes from the `book_recipe` relationship
  }));

  return booksWithRecipeCount;
}

// Fetch all custom books for users
export async function fetchDefaultBooks(userId: string) {
  const { data, error } = await supabase
    .from("book")
    .select(
      `
        *,
        users (username),
        book_recipe (recipe_id)
      `
    )
    .eq("user_id", userId)
    .eq("is_default", true); // Only select custom (non-default) books

  if (error) {
    console.error("Error fetching default books", error);
    return [];
  }

  // Count the number of recipes per book based on the `book_recipe` relationship
  const customBooksWithRecipeCount = data.map((book) => ({
    ...book,
    author: book.users.username,
    num_recipes: book.book_recipe.length, // Count the recipes from the `book_recipe` relationship
  }));
  return customBooksWithRecipeCount;
}

// Fetch the default books for the current user (Want To Make, Made, Keepers)
export async function fetchCustomBooks(userId: string) {
  const { data, error } = await supabase
    .from("book")
    .select(
      `
        *,
        users (username),
        book_recipe (recipe_id)
      `
    )
    .eq("user_id", userId)
    .eq("is_default", false); // Only select custom (non-default) books

  if (error) {
    console.error("Error fetching custom books:", error);
    return [];
  }

  // Count the number of recipes per book based on the `book_recipe` relationship
  const customBooksWithRecipeCount = data.map((book) => ({
    ...book,
    author: book.users.username,
    num_recipes: book.book_recipe.length, // Count the recipes from the `book_recipe` relationship
  }));
  return customBooksWithRecipeCount;
}

// Add a new book for the user
export async function addNewBook(userId: string, bookName: string) {
  const { data, error } = await supabase.from("book").insert([
    {
      name: bookName,
      user_id: userId,
      is_default: false, // Since it's a custom book
    },
  ]);

  if (error) {
    console.error("Error adding new book:", error);
    return null;
  }
  console.log("Successfully inserted a new book. \nBook name: " + bookName);
  return data;
}

// Fetch a single book by its ID
export async function fetchBookById(bookId: number) {
  const { data, error } = await supabase
    .from("book")
    .select(
      `
      *,
      users (username),
      book_recipe (recipe_id)
    `
    )
    .eq("id", bookId)
    .single();

  if (error) {
    console.error("Error fetching book by ID:", error);
    return null;
  }

  const bookWithRecipeCount = {
    ...data,
    author: data.users.username,
    num_recipes: data.book_recipe.length,
  };

  return bookWithRecipeCount;
}
