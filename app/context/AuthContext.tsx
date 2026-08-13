"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface User {
  id?: string;
  username?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;

  login: (token: string, user?: User, remember?: boolean) => void;
  logout: () => void;

  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }

    setLoading(false);
  }, []);

  const login = (
    newToken: string,
    newUser?: User,
    remember = true
  ) => {
    const storage = remember ? localStorage : sessionStorage;
    const otherStorage = remember ? sessionStorage : localStorage;

    otherStorage.removeItem("token");
    otherStorage.removeItem("user");
    storage.setItem("token", newToken);

    if (newUser) {
      storage.setItem("user", JSON.stringify(newUser));
    }

    setToken(newToken);
    setUser(newUser ?? null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    setUser(null);

    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}