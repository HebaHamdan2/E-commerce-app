import { createContext, useState, ReactNode, useEffect } from "react";
import { AuthContextType } from "../types/authTypes";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    // Using !!user ensures that isAuthenticated is always a boolean even holding an object or null
    <AuthContext.Provider value={{ user,setUser, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
