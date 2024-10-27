import { Outlet } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"


const MainLayout = () => {
  return (
    <div className="grid grid-rows-mainLayout  h-screen ">
      <Header />
        <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout