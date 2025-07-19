import { MessageCircle } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import DarkMode from "@/DarkMode";
import { useSelector } from "react-redux";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useLogOutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { Card } from "./ui/card";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [logOutUser, {data, isSuccess}] = useLogOutUserMutation();

   const logoutHandler = async () => {
    await logOutUser();
  };

  useEffect(() => {
    //once the user is logged out redirect to the login page
    if (isSuccess) {
      toast.success(data.message || "Logged out successfully");
      navigate("/login");
    }
  }, [isSuccess]);
  
  return (
    <header className="h-16 bg-white dark:bg-[#020817] border-b border-gray-200 dark:border-gray-800 fixed top-0 left-0 right-0 z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-full">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <MessageCircle size={28} className="text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">
            WhatsUp
          </h1>
        </div>

         {/* User icon and dark mode icon */}
        {/* if there is an user show the drop down button or show login and signup buttons */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* Avatar or profile pic */}
                <Avatar>
                  <AvatarImage
                    src={
                      user.photoUrl ||
                      "https://i.pinimg.com/736x/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg"
                    }
                  />
                </Avatar>

                {/* Dark and light mode button */}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/signup")}>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
