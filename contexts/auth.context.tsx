import { useState, useEffect, useContext, createContext, FC } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";

type LoginProps = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: any;
  login: ({ email, password }: LoginProps) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async ({ email, password }) => {},
  logout: () => {},
  isLoading: true,
  isAuthenticated: false,
});

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cookies = parseCookies();

  useEffect(() => {
    const token = cookies.access_token;
    const user = cookies.user ? JSON.parse(cookies.user) : "";
    if (user) {
      setUser(user);
    }
    if (token && user) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [cookies.access_token, cookies.user]);

  const login = async ({ email, password }: LoginProps) => {
    const res = await fetch(
      "http://api.hospital-engineering-expo.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const json = await res.json();

    if (json.code !== 200) {
      setIsAuthenticated(false);
      setUser(null);
      destroyCookie(null, "access_token");
      destroyCookie(null, "user");
    } else {
      setIsAuthenticated(true);
      setUser("hello");
      setCookie(null, "user", JSON.stringify(json.data.user));
      setCookie(null, "access_token", json.data.token);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    destroyCookie(null, "access_token");
    destroyCookie(null, "user");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
