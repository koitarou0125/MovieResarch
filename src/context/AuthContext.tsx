import { useState, createContext, useEffect } from "react";
import type { ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = createContext<User | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(
    () =>
      onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
      }),
    [],
  );

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
