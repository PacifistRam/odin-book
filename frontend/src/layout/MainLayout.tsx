import { Outlet, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useState, useEffect, createContext } from "react";

import { verifyToken } from "@/utils/apiCalls";

type User = {
  id: number | null;
  email: string;
  userName: string;
  profilePic: string;
  isAuthenticated: boolean;
};

type Token = string;

export const AuthContext = createContext<{
  token: Token;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  user: User;
  userLoading: boolean;
  userError: string | null;
  handleLogOut: () => void;
}>({
  token: "",
  setToken: () => {},
  user: {
    id: null,
    email: "",
    userName: "",
    profilePic: "",
    isAuthenticated: false,
  },
  userLoading: false,
  userError: null,
  handleLogOut: () => {},
});

const MainLayout = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<Token>(
    localStorage.getItem("token") || ""
  );
  const [user, setUser] = useState<User>({
    id: null,
    email: "",
    userName: "",
    profilePic: "",
    isAuthenticated: false,
  });
  const [userError, setUserError] = useState<string | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(false);

  const getUserDetails = async (token: Token) => {
    if (token) {
      console.log("starting verification");
      setUserLoading(true);
      setUserError(null);
      try {
        const response = await verifyToken(token);
        if (response.user) {
          setUser({
            id: response.user.id,
            email: response.user.email,
            userName: response.user.userName,
            profilePic: response.user.profile?.profilePic || "",
            isAuthenticated: true,
          });
          console.log("user verified via token");
        } else {
          console.log("failed to authenticate");
          setUserError("verification failed");
          setUser({
            id: null,
            email: "",
            userName: "",
            profilePic: "",
            isAuthenticated: false,
          });
          localStorage.removeItem("token");
        }
      } catch (err: any) {
        setUserError(err.message);
        localStorage.removeItem("token");
        console.log(userError);
      } finally {
        setUserLoading(false);
      }
    }
  };

  const handleLogOut = () => {
    setUser({
      id: null,
      email: "",
      userName: "",
      profilePic: "",
      isAuthenticated: false,
    });
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      getUserDetails(token);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, setToken, user, userLoading, userError, handleLogOut }}
    >
      <div className="grid grid-rows-mainLayout  h-screen ">
        <Header />
        <div className="overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </AuthContext.Provider>
  );
};

export default MainLayout;
