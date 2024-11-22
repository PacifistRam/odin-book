import {createBrowserRouter, RouterProvider, Link } from "react-router-dom"

import MainLayout from "./layout/MainLayout"
import Login from "./pages/Login"
import UserHomeLayout from "./layout/UserHomeLayout"
import SignUp from "./pages/SignUp"
import Posts from "./pages/Posts"
import CreatePost from "./pages/CreatePost"
import Profile from "./pages/Profile"



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
        element: <UserHomeLayout/>,
        children:[
          {
            index: true,
            element: <Posts />
          },
          {
            path: "create-post",
            element: <CreatePost />
          },
          {
            path: "user-profile",
            element: <Profile />
          },

        ]
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
