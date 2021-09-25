import { useState, useEffect, useContext, createContext, FC } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useQueryClient } from "react-query";

type LoginProps = {
  email: string;
  password: string;
};

type RegisterVisitorProps = {
  email: string;
  mobile: string;
  name: string;
  job_function: string;
  password: string;
  password_confirmation: string;
  institution_name: string;
  institution_type: string;
  country: string;
  province: string;
  visitor_type: string;
  product_interest: string[];
  visit_purpose: string[];
  member_sehat_ri: string;
  allow_share_info: boolean;
  role: string;
};

type AuthContextType = {
  user: any;
  login: ({ email, password }: LoginProps) => Promise<void>;
  registerVisitor: (props: RegisterVisitorProps) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  updateProfile: (props: UpdateProfileProps) => Promise<void>;
};

type UpdateProfileProps = {
  email: string;
  mobile: string;
  name: string;
  job_function: string;
  img_profile: any;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async ({ email, password }) => {},
  registerVisitor: async () => {},
  logout: () => {},
  isLoading: true,
  isAuthenticated: false,
  updateProfile: async () => {},
});

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cookies = parseCookies();
  const queryClient = useQueryClient();

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
      "https://api.hospital-engineering-expo.com/api/auth/login",
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
    console.log({ json });

    if (json.code !== 200) {
      setIsAuthenticated(false);
      setUser(null);
      destroyCookie(null, "access_token");
      destroyCookie(null, "user");
    } else {
      setIsAuthenticated(true);
      setUser(json.data.user);
      setCookie(null, "user", JSON.stringify(json.data.user));
      setCookie(null, "access_token", json.data.token);
    }
  };

  const registerVisitor = async (props: RegisterVisitorProps) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
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
      setUser(json.data.user);
      setCookie(null, "user", JSON.stringify(json.data.user));
      setCookie(null, "access_token", json.data.token);
    }
  };

  const logout = async () => {
    await queryClient.clear();
    setUser(null);
    setIsAuthenticated(false);
    destroyCookie(null, "access_token");
    destroyCookie(null, "user");
  };

  const updateProfile = async (props: UpdateProfileProps) => {
    const { email, job_function, img_profile, mobile, name } = props;

    const data = new FormData();
    img_profile && data.append("img_profile", img_profile);
    data.append("_method", "PUT");
    data.append("email", email);
    data.append("mobile", mobile);
    data.append("job_function", job_function);
    data.append("name", name);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/update`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies.access_token}`,
      },
      body: data,
    });

    if (!res.ok) {
      throw new Error("Error update user profile");
    }

    const json = await res.json();

    setUser(json.data);
    setCookie(null, "user", JSON.stringify(json.data));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isLoading,
        registerVisitor,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
