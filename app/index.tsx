import { Redirect, Href } from "expo-router";

const Page = () => {
  if (false) return <Redirect href={"/(root)/(tabs)/feed" as Href} />;

  return <Redirect href={"/(auth)/welcome" as Href} />;
};

export default Page;
