import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { User } from "@/types/type";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  getUserFromDB: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserFromDB = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", session?.user?.id);

      if (error) {
        throw new Error(error.message);
      }

      console.log("User data:", data[0]);
      if (data.length > 1) {
        console.warn("Multiple user records found, returning the first one.");
        return data[0] as User;
      } else if (data[0] === undefined) {
        return null;
      } else {
        return data[0] as User;
      }
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    // Check for an active session at the start
    const initSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        const userInDB = await getUserFromDB();
        setUser(userInDB);
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    initSession();

    // Set up the auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session) {
          const userInDB = await getUserFromDB();
          setUser(userInDB);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      // Clean up the listener when the component unmounts
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, loading, getUserFromDB }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
