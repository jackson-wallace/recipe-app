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
  label?: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

// Users Table
export type User = {
  user_id: number;
  username: string;
  handle: string;
  name?: string;
  profile_picture?: string;
  bio?: string;
  created_at: string; // ISO Date string
};

// Followers Table
export type Follower = {
  follower_id: number; // ID of the user following
  followed_id: number; // ID of the user being followed
  followed_at: string; // ISO Date string
};

// Recipes Table
export type Recipe = {
  recipe_id: number;
  user_id: number; // Creator of the recipe
  title: string;
  estimated_time_to_make: number; // In minutes
  servings: number;
  picture?: string;
  created_at: string; // ISO Date string
};

// Recipe_Ingredients Table
export type RecipeIngredient = {
  recipe_id: number;
  ingredient_id: number;
  quantity: number;
  unit: string;
};

// Recipe_Instructions Table
export type RecipeInstruction = {
  instruction_id: number;
  recipe_id: number;
  step_number: number;
  instruction_text: string;
};

// Reviews Table
export type Review = {
  review_id: number;
  recipe_id: number;
  user_id: number; // Reviewer
  title: string;
  body: string;
  rating: number; // Between 1 and 5
  created_at: string; // ISO Date string
};

// Ingredients Table
export type Ingredient = {
  ingredient_id: number;
  name: string;
  calories_per_unit: number;
  note?: string;
  rarity: "Common" | "Uncommon" | "Rare" | "Exotic";
  created_at: string; // ISO Date string
};

// Tags Table
export type Tag = {
  tag_id: number;
  tag_name: string;
  tag_type: "dietary constraint" | "cuisine";
};

// Books (Lists) Table
export type Book = {
  book_id: number;
  user_id: number; // Creator of the book (list)
  name: string;
  description?: string;
  created_at: string; // ISO Date string
};

// Book_Recipes Table
export type BookRecipe = {
  book_id: number;
  recipe_id: number;
  added_at: string; // ISO Date string
};

// Likes_Dislikes Table
export type LikeDislike = {
  like_dislike_id: number;
  liker_user_id: number;
  liked_disliked_entity_type: "recipe" | "review" | "book";
  entity_id: number; // Can refer to either a recipe, review, or book
  liked_disliked: "like" | "dislike";
  timestamp: string; // ISO Date string
};
