import React from "react";

type MainContentProps = {
    className?: string;
    children?: React.ReactNode;
}

const MainContent:React.FC<MainContentProps> = ({className}) => {
  return (
    <div className={` px-5 ${className}`}>MainContent</div>
  )
}

export default MainContent