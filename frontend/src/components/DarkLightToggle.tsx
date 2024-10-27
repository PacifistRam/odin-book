import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export const DarkLightToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkMode") === "true" ? true : false
  );

  useEffect(() => {
    darkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");

    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <Button variant={"ghost"} size={"icon"} onClick={toggleDarkMode}>
      {darkMode ? <MdDarkMode /> : <MdLightMode />}
    </Button>
  );
};
