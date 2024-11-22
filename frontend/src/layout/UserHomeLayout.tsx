import { AuthContext } from "@/layout/MainLayout";
import { useState, useEffect, useContext } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "@/components/Sidebar";


const UserHomeLayout = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    !user.isAuthenticated && navigate("/");
  }, [user.isAuthenticated, navigate]);

  return (
    <div className="h-full grid grid-cols-12 border gap-2 rounded-ring overflow-y-hidden">
      <Sidebar className="col-span-3 md:col-span-2 border-r border-border  py-2">
        sidebar
      </Sidebar>
      <div className="col-span-6 md:col-span-8 lg:col-span-7 py-2 pr-2 overflow-y-auto ">
       <Outlet />
      </div>
      <div className="col-span-3 md:col-span-2 lg:col-span-3 py-2">
        right div
      </div>
    </div>
  );
};

export default UserHomeLayout;
