import MainLayout from "@/layout/MainLayout";
import ChatPage from "@/pages/ChatPage";
import Home from "@/pages/HomePage";
import Login from "@/pages/LoginPage";
import Profile from "@/pages/Profile";
import Signup from "@/pages/SignUpPage";
import { createBrowserRouter } from "react-router-dom";

export const appRouter = createBrowserRouter([
    {
        
      path:"/",
      element:<MainLayout/>,
      children:[
        {
          path:"",
          element:<Home/>
        }
        ,
        {
          path:"login",
          element:<Login/>
        },
        {
          path:"signup",
          element:<Signup/>
        },
        {
          path:"chats",
          element:<ChatPage/>
        },
        {
          path:"profile",
          element:<Profile/>
        }
      ]
    }
])