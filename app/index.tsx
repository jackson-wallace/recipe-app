import { useAuth } from "@/providers/auth-provider";
import { Redirect, Href } from "expo-router";

const Page = () => {
  const { session, user } = useAuth();

  if (session && user) return <Redirect href={"/(root)/(tabs)/feed" as Href} />;

  return <Redirect href={"/(auth)/welcome" as Href} />;
};

export default Page;
