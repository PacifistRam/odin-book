import { FaBookReader } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { DarkLightToggle } from "./DarkLightToggle";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { AuthContext } from "@/layout/MainLayout";
import { useContext } from "react";

const Header = () => {
  const { user, handleLogOut } = useContext(AuthContext);
  return (
    <header className=" py-4 px-4 border border-border border-collapse">
      <nav className="flex justify-between items-center  ">
        <div className="flex gap-2 items-center text-primary">
          <FaBookReader className=" text-4xl" />
          <span className="text-2xl font-bold ">BanterBook</span>
        </div>
        <ul className="flex gap-3 items-center text-lg font-semibold">
          {user.isAuthenticated ? (
            <>
              <li className="hover:text-primary underline-offset-4 hover:underline">
                <Button  variant={"link"} className="text-lg px-1 py-0">
                  <Link to={"/user-home"}>
                    <Avatar>
                      <AvatarImage src={user.profilePic} />
                      <AvatarFallback className="uppercase">
                        {user.userName.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                </Button>
              </li>
              <li className="hover:text-primary underline-offset-4 hover:underline">
                <Button
                  variant={"destructive"}
                  onClick={handleLogOut}
                  className="text-sm "
                >
                  Log-Out
                </Button>
              </li>
            </>
          ) : (
            <li className="hover:text-primary underline-offset-4 hover:underline">
              <Link to={"/sign-up"}>Sign Up</Link>
            </li>
          )}
          <li>
            <DarkLightToggle />{" "}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
