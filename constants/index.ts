import splash from "@/assets/images/splash2.jpg";
import magnifyingGlass from "@/assets/images/magnifying-glass.jpg";
import books from "@/assets/images/books.jpg";
import chefHat from "@/assets/images/chef-hat.jpg";

export const images = {
  splash,
  magnifyingGlass,
  books,
  chefHat,
};

export const onboarding = [
  {
    id: 1,
    title: "Find recipes quickly",
    description:
      "Don't waste time scrolling past ads and life stories. With our app, finding the perfect recipe is just a tap away.",
    image: images.magnifyingGlass,
  },
  {
    id: 2,
    title: "Create cookbooks",
    description:
      "Just like playlists - save your favorites, and share delicious finds with friends and family.",
    image: images.books,
  },
  {
    id: 3,
    title: "Develop your skills",
    description:
      "Improve your culinary skills by cooking and reviewing a variety of recipes!",
    image: images.chefHat,
  },
];
