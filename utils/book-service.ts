import { supabase } from "@/utils/supabase";

// Fetch books with recipe count from the database
export async function fetchUserBooks(userId: string) {
    const { data, error } = await supabase
      .from("book")
      .select(`
        *,
        book_recipe (recipe_id)
      `)
      .eq("user_id", userId);
  
    if (error) {
      console.error("Error fetching books with recipe count:", error);
      return [];
    }
  
    // Count the number of recipes per book based on the `book_recipe` relationship
    const booksWithRecipeCount = data.map(book => ({
      ...book,
      num_recipes: book.book_recipe.length,  // Count the recipes from the `book_recipe` relationship
    }));
  
    return booksWithRecipeCount;
  }

// Fetch all custom books for users
export async function fetchDefaultBooks(userId: string) {
    const { data, error } = await supabase
      .from("book")
      .select(`
        *,
        book_recipe (recipe_id)
      `)
      .eq("user_id", userId)
      .eq("is_default", true);  // Only select custom (non-default) books
  
    if (error) {
      console.error("Error fetching custom books with recipe count:", error);
      return [];
    }
  
    // Count the number of recipes per book based on the `book_recipe` relationship
    const customBooksWithRecipeCount = data.map(book => ({
      ...book,
      num_recipes: book.book_recipe.length,  // Count the recipes from the `book_recipe` relationship
    }));
  
    return customBooksWithRecipeCount;
  }
  

// Fetch the default books for the current user (Want To Make, Made, Keepers)
export async function fetchCustomBooks(userId: string) {
    const { data, error } = await supabase
      .from("book")
      .select(`
        *,
        book_recipe (recipe_id)
      `)
      .eq("user_id", userId)
      .eq("is_default", false);  // Only select custom (non-default) books
  
    if (error) {
      console.error("Error fetching custom books with recipe count:", error);
      return [];
    }
  
    // Count the number of recipes per book based on the `book_recipe` relationship
    const customBooksWithRecipeCount = data.map(book => ({
      ...book,
      num_recipes: book.book_recipe.length,  // Count the recipes from the `book_recipe` relationship
    }));
    return customBooksWithRecipeCount;
  }
  

// Add a new book for the user
export async function addNewBook(userId: string, bookName: string) {
  const { data, error } = await supabase
    .from("book")
    .insert([
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
  console.log("Successfully inserted a new book. \nBook details:")
  return data;
}
