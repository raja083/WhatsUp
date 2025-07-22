import { Input } from "@/components/ui/input";
import { useGetAllUsersQuery } from "@/features/api/messageApi";
import { setSelectedUser } from "@/features/chatSlice";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Sidebar = ({ onlineUsers }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const { data } = useGetAllUsersQuery();
  const filteredUsers = data?.users;

  const handleSelect = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 h-[calc(100vh-4rem)] flex flex-col border-r bg-white dark:bg-[#0f172a]">
      {/* Header */}
      <div className="p-2 font-bold text-lg sm:text-xl border-b dark:border-gray-700 flex justify-between">
        <h1 className="ml-5">Chats</h1>
      </div>

      {/* Search Box */}
      <div className="p-2">
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

      {/* User List */}
      <div className="overflow-y-auto flex-1">
        {filteredUsers?.map((user) => {
          const isOnline = onlineUsers.includes(user._id || user.id);

          return (
            <div
              onClick={() => handleSelect(user)}
              key={user._id || user.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all"
            >
              <div className="relative">
                <img
                  src={
                    user.profilePic ||
                    "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
                  }
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-[#0f172a]" />
                )}
              </div>

              <div className="flex flex-col truncate">
                <div className="font-medium text-sm sm:text-base">
                  {user.fullName}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate w-[140px] sm:w-[180px]">
                  {user.lastMessage}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
