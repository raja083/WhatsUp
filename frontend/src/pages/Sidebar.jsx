import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [search, setSearch] = useState("");

  const filteredUsers = [
    {
      id: 1,
      name: "John",
      lastMessage: "Hey",
      profilePic: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 2,
      name: "Jane",
      lastMessage: "Hello",
      profilePic: "https://i.pravatar.cc/40?img=2",
    },
    {
      id: 3,
      name: "Doe",
      lastMessage: "What's up?",
      profilePic: "https://i.pravatar.cc/40?img=3",
    },
    {
      id: 1,
      name: "John",
      lastMessage: "Hey",
      profilePic: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 2,
      name: "Jane",
      lastMessage: "Hello",
      profilePic: "https://i.pravatar.cc/40?img=2",
    },
    {
      id: 3,
      name: "Doe",
      lastMessage: "What's up?",
      profilePic: "https://i.pravatar.cc/40?img=3",
    },
    {
      id: 1,
      name: "John",
      lastMessage: "Hey",
      profilePic: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 2,
      name: "Jane",
      lastMessage: "Hello",
      profilePic: "https://i.pravatar.cc/40?img=2",
    },
    {
      id: 3,
      name: "Doe",
      lastMessage: "What's up?",
      profilePic: "https://i.pravatar.cc/40?img=3",
    },
    {
      id: 1,
      name: "John",
      lastMessage: "Hey",
      profilePic: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 2,
      name: "Jane",
      lastMessage: "Hello",
      profilePic: "https://i.pravatar.cc/40?img=2",
    },
    {
      id: 3,
      name: "Doe",
      lastMessage: "What's up?",
      profilePic: "https://i.pravatar.cc/40?img=3",
    },
    // Add more if needed...
  ];

  return (
    <div className="w-[600px] h-[calc(100vh-4rem)] flex flex-col border-r bg-white dark:bg-[#0f172a]">
      {/* Header */}
      <div className="p-2 font-bold text-xl border-b dark:border-gray-700 shrink-0 flex justify-between">
          <h1 className="ml-5">Users</h1>
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
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            <img
              src={user.profilePic}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-medium">{user.name}</div>
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
