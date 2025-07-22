import { AuthenticatedUser, ProtectRoute } from "@/components/protectedRoutes";
import MainLayout from "@/layout/MainLayout";
import ChatPage from "@/pages/ChatPage";
import Home from "@/pages/HomePage";
import Login from "@/pages/LoginPage";
import Profile from "@/pages/Profile";
import Signup from "@/pages/SignUpPage";
import { createBrowserRouter } from "react-router-dom";
const isAuthenticated= true;
export const appRouter = createBrowserRouter([
    {
        
      path:"/",
      element:<MainLayout/>,
      children:[
        {
          path:"",
          element:isAuthenticated?<ChatPage/> : <Home/>
        }
        ,
        {
          path:"login",
          element:<AuthenticatedUser><Login/></AuthenticatedUser>
        },
        {
          path:"signup",
          element:<AuthenticatedUser><Signup/></AuthenticatedUser>
        },
        {
          path:"chats",
          element:<ProtectRoute><ChatPage/></ProtectRoute>
        },
        {
          path:"profile",
          element:<ProtectRoute><Profile/></ProtectRoute>
        }
      ]
    }
])
