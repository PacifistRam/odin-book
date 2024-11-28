import { Undo2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator"


const BackNav = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log(window.history.state);
    if (window.history.state) navigate(-1); // Go back one page in history
  };

  return (
    <div className="w-full px-2 py-1 flex gap-2 items-center ">
      <Button variant={"outline"} size={"icon"} onClick={ handleClick}>
        <Undo2 /> 
      </Button>
      <span>Go Back</span>
    </div>
  );
};

export default BackNav;
