import { createContext, useContext, useState, ReactNode } from "react";

interface OnboardingContextType {
  name: string | undefined;
  setName: (name: string) => void;
  username: string | undefined;
  setUsername: (username: string) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);

  return (
    <OnboardingContext.Provider
      value={{ name, setName, username, setUsername }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
