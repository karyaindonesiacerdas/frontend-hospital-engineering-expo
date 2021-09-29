import { useState, useEffect, useContext, createContext, FC } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

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

type RegisterExhibitorProps = {
  email: string;
  mobile: string;
  name: string;
  job_function: string;
  password: string;
  password_confirmation: string;
  company_name: string;
  company_website: string;
  country: string;
  province: string;
  business_nature: string;
  role: string;
};

type AuthContextType = {
  user: any;
  login: ({ email, password }: LoginProps) => Promise<void>;
  registerVisitor: (props: RegisterVisitorProps) => Promise<void>;
  registerExhibitor: (props: RegisterExhibitorProps) => Promise<void>;
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
  registerExhibitor: async () => {},
  logout: () => {},
  isLoading: true,
  isAuthenticated: false,
  updateProfile: async () => {},
});

export const AuthProvider: FC = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cookies = parseCookies();
  const queryClient = useQueryClient();

  const fetchUser = async ({ token }: { token: string }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  };

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
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      const loginRes = await res.json();
      const userRes = await fetchUser({ token: loginRes.data.token });

      setIsAuthenticated(true);
      setUser(userRes);
      setCookie(null, "user", JSON.stringify(userRes.data), {
        path: "/",
      });
      setCookie(null, "access_token", loginRes.data.token, {
        path: "/",
      });
      toast.success("Logged in");
      router.push("/main-hall");
    } catch (error: any) {
      setIsAuthenticated(false);
      setUser(null);
      destroyCookie(null, "access_token");
      destroyCookie(null, "user");
      toast.error(error?.message);
    }
  };

  // const registerVisitor = async (props: RegisterVisitorProps) => {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(props),
  //     }
  //   );

  //   console.log({ res });

  //   if (!res.ok) {
  //     const error = await res.json();
  //     console.log({ error });
  //     throw new Error(error.message);
  //   }

  //   const json = await res.json();
  //   console.log({ json });

  //   if (json.code !== 200) {
  //     console.log("hat");
  //     setIsAuthenticated(false);
  //     setUser(null);
  //     destroyCookie(null, "access_token");
  //     destroyCookie(null, "user");
  //   } else {
  //     console.log("hat");
  //     setIsAuthenticated(true);
  //     setUser(json.data.user);
  //     setCookie(null, "user", JSON.stringify(json.data.user), {
  //       path: "/",
  //     });
  //     setCookie(null, "access_token", json.data.token, {
  //       path: "/",
  //     });
  //   }
  // };

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

    // console.log({ res });

    if (!res.ok) {
      const error = await res.json();
      // console.log({ error });
      throw new Error(error.message);
    }

    await res.json();
    // console.log({ json });

    // if (json.code !== 200) {
    //   console.log("hat");
    //   setIsAuthenticated(false);
    //   setUser(null);
    //   destroyCookie(null, "access_token");
    //   destroyCookie(null, "user");
    // } else {
    //   console.log("hat");
    //   setIsAuthenticated(true);
    //   setUser(json.data.user);
    //   setCookie(null, "user", JSON.stringify(json.data.user), {
    //     path: "/",
    //   });
    //   setCookie(null, "access_token", json.data.token, {
    //     path: "/",
    //   });
    // }
  };

  // const registerExhibitor = async (props: RegisterExhibitorProps) => {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(props),
  //     }
  //   );

  //   if (!res.ok) {
  //     const error = await res.json();
  //     throw new Error(error.message);
  //   }

  //   const json = await res.json();

  //   if (json.code !== 200) {
  //     setIsAuthenticated(false);
  //     setUser(null);
  //     destroyCookie(null, "access_token");
  //     destroyCookie(null, "user");
  //   } else {
  //     setIsAuthenticated(true);
  //     setUser(json.data.user);
  //     setCookie(null, "user", JSON.stringify(json.data.user), {
  //       path: "/",
  //     });
  //     setCookie(null, "access_token", json.data.token, {
  //       path: "/",
  //     });
  //   }
  // };

  const registerExhibitor = async (props: RegisterExhibitorProps) => {
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

    await res.json();

    // if (json.code !== 200) {
    //   setIsAuthenticated(false);
    //   setUser(null);
    //   destroyCookie(null, "access_token");
    //   destroyCookie(null, "user");
    // } else {
    //   setIsAuthenticated(true);
    //   setUser(json.data.user);
    //   setCookie(null, "user", JSON.stringify(json.data.user), {
    //     path: "/",
    //   });
    //   setCookie(null, "access_token", json.data.token, {
    //     path: "/",
    //   });
    // }
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    destroyCookie(null, "access_token");
    destroyCookie(null, "user");
    await queryClient.removeQueries(["rundowns"]);
    await queryClient.removeQueries(["exhibitor"]);
    await queryClient.removeQueries(["exhibitors"]);
    await queryClient.removeQueries(["consultations"]);
    await queryClient.removeQueries(["booked-consultations"]);
    await queryClient.removeQueries(["settings"]);
    await queryClient.removeQueries(["user"]);
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
        registerExhibitor,
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
