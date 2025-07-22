import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MessageBox from "./MessageBox";
import Navbar from "@/components/Navbar";
import EmptyChatScreen from "./EmptyChatScreen";
import { useSelector } from "react-redux";
import { useLoadUserQuery } from "@/features/api/authApi";
import { getSocket } from "@/lib/socket";

const ChatPage = () => {
  const { selectedUser } = useSelector((store) => store.chat);
  const { data: userData, isSuccess } = useLoadUserQuery();

  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
      console.log("Online Users:", userIds);
    });

    // ✅ Ask server to emit online users only after listener is ready
    socket.emit("ready-for-online-users");

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [isSuccess]);
  return (
    <div className="h-full overflow-hidden">
      <Navbar />
      <div className="flex mt-16 h-[calc(100vh-4rem)]">
        <Sidebar onlineUsers={onlineUsers} />
        {selectedUser ? <MessageBox /> : <EmptyChatScreen />}
      </div>
    </div>
  );
};

export default ChatPage;
