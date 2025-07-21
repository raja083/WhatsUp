import { Input } from "@/components/ui/input";
import { useGetAllUsersQuery } from "@/features/api/messageApi";
import { setSelectedUser } from "@/features/chatSlice";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  
  
  const dispatch = useDispatch();
  const handleSelect = (user) =>{
    dispatch(setSelectedUser(user));
    
    console.log();
  }
  const {data} = useGetAllUsersQuery();
  const filteredUsers = data?.users;
  return (
    <div className="w-2/7 h-[calc(100vh-4rem)] flex flex-col border-r bg-white dark:bg-[#0f172a]">
      {/* Header */}
      <div className="p-2 font-bold text-xl border-b dark:border-gray-700 shrink-0 flex justify-between">
          <h1 className="ml-5">Chats</h1>
      </div>

      {/* Search Box */}
      <div className="p-2 shrink-0">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search users"
            className="pl-8 pr-2 py-2 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Scrollable user list */}
      <div className="overflow-y-auto flex-1">
        {filteredUsers?.map((user) => (
          <div
            onClick={()=>handleSelect(user)}
            key={user.id}
            className="flex items-center gap-3 p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            <img
              src={user.profilePic || "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-medium">{user.fullName}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 truncate w-[180px]">
                {user.lastMessage}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
