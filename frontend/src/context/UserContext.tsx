import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/react";

interface UserContextType {
  email: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [email, setEmail] = useState<string | null>(localStorage.getItem("userEmail"));

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const userEmail = user.primaryEmailAddress?.emailAddress || null;
      if (userEmail) {
        localStorage.setItem("userEmail", userEmail);
        setEmail(userEmail);
      }
    } else if (isLoaded && !isSignedIn) {
      localStorage.removeItem("userEmail");
      setEmail(null);
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <UserContext.Provider value={{ email }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
