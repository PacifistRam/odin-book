import {createBrowserRouter, RouterProvider, Link } from "react-router-dom"

import MainLayout from "./layout/MainLayout"
import Login from "./pages/Login"
import UserHome from "./pages/UserHome"
import SignUp from "./pages/SignUp"



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "user-home",
        element: <UserHome/>,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        errorElement: <h1> Wrong Page! Nothing to see here</h1>,
      },
    ],
    errorElement: (
      <h1>
        404 Not found <Link to={"/"}>Go Home</Link>
      </h1>
    ),
  }
])



function App() {
 

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
