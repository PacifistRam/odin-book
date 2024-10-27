import { FaBookReader } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DarkLightToggle } from "./DarkLightToggle";

const Header = () => {
  return (
    <header className=" py-4 px-4 bg-accent ">
      <nav className="flex justify-between items-center  ">
        <div className="flex gap-2 items-center text-primary">
          <FaBookReader className=" text-4xl" />
          <span className="text-2xl font-bold ">BanterBook</span>
        </div>
        <ul className="flex gap-3 items-center text-lg font-semibold">
          <li className="hover:text-primary underline-offset-4 hover:underline">
            {" "}
            <Link to={""}>Profile</Link>
          </li>
          <li className="hover:text-primary underline-offset-4 hover:underline">
            {" "}
            <Link to={"/sign-up"}>Sign Up</Link>
          </li>
          <li>
            <DarkLightToggle />{" "}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
