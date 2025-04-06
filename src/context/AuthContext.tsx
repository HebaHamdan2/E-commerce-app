import { createContext, useState, ReactNode, useEffect } from "react";
import { AuthContextType } from "../types/authTypes";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type DecodedToken = {
  id: string;
  role: string;
  status: string;
  iat: number;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      try {
        const decoded = jwtDecode<DecodedToken>(parsedUser.token);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Invalid token:", error);
        logout(); // clear invalid token
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setUserId("");
  };

  const getuserId = () => {
    if (user && user.token) {
      try {
        const decoded = jwtDecode<DecodedToken>(user.token);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        userId,
        getuserId,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
