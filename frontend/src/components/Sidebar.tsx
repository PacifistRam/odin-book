import { House, PenLine, UserRound } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { NavLink } from "react-router-dom";

type SidebarProps = {
  className?: string;
  children?: React.ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div className={`px-4 ${className}`}>
      <ul className="grid gap-5 w-full">
        <li className="p-2 hover:bg-muted hover:rounded-xl">
          <NavLink
            to="/user-home"
            className={({ isActive }) =>
              `flex sm:gap-2 md:gap-4 items-center justify-center flex-wrap p-2 rounded-xl ${isActive ? "bg-accent" : ""}`
            }
            end
          >
            <House size={32} />
            <span className="text-lg font-extrabold">Home</span>
          </NavLink>
        </li>
        <li className="p-2 hover:bg-muted hover:rounded-xl">
          <NavLink
            to={"/user-home/create-post"}
            className={({ isActive }) => 
            `flex sm:gap-2 md:gap-4 items-center justify-center flex-wrap p-2 rounded-xl ${isActive ? "bg-accent" : ""}`
            }
            end
          >
              <PenLine size={32} />
              <span className=" text-lg font-extrabold">Create</span>
          </NavLink>
        </li>
        <li className="p-2 hover:bg-muted hover:rounded-xl">
          <NavLink
            to={"/user-home/user-profile"}
            className={({ isActive }) => 
              `flex sm:gap-2 md:gap-4 items-center justify-center flex-wrap p-2 rounded-xl ${isActive ? "bg-accent" : ""}`
              }
            end
          >
              <UserRound size={32} />
              <span className="text-lg font-extrabold">Profile</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
