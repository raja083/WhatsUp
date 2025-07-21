import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { useGetAllMessagesQuery } from "@/features/api/messageApi";
import { getSocket , connectSocket} from "@/lib/socket";
 // Adjust path as needed
import MessageInput from "./MessageInput";

const MessageBox = () => {
  const { selectedUser } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);
  const { data } = useGetAllMessagesQuery(selectedUser._id);

  const [messages, setMessages] = useState([]);

  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
  if (user?._id) {
    connectSocket(user._id); // Without this, socket won't connect
  }
}, [user?._id]);

  // Initial load of messages
  useEffect(() => {
    if (data) setMessages(data);
  }, [data]);

  // Socket listener for incoming messages
  useEffect(() => {
    if (!selectedUser?._id) return;

    const handleNewMessage = (newMsg) => {
      // Only add message if it's part of the current chat
      if (
        newMsg.senderId === selectedUser._id ||
        newMsg.receiverId === selectedUser._id
      ) {
        setMessages((prev) => [...prev, newMsg]);
      }
    };
    const socket = getSocket();
    if (socket) {
    socket.on("newMessage", handleNewMessage);
    }

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [selectedUser?._id]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] flex-1 bg-gray-50 dark:bg-[#0b1120]">
      {/* Header */}
      <div className="p-4 flex items-center gap-3 border-b dark:border-gray-800 bg-white dark:bg-[#0f172a] shrink-0">
        <img
          src={
            selectedUser.profilePic ||
            "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
          }
          alt={selectedUser.fullName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="font-medium text-lg">{selectedUser.fullName}</div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages?.map((msg) => {
          const isMe = msg.senderId === user._id;
          const isImageOnly = msg.image && !msg.text;

          return (
            <div key={msg._id} className="flex flex-col items-start gap-0.5">
              <div
                className={clsx(
                  "flex flex-col max-w-xs md:max-w-md lg:max-w-xl p-1 rounded-lg text-sm break-words",
                  isMe ? "ml-auto" : "mr-auto",
                  {
                    "bg-blue-500 text-white": isMe && !isImageOnly,
                    "bg-gray-200 dark:bg-gray-700 text-black dark:text-white":
                      !isMe && !isImageOnly,
                    "p-0": isImageOnly,
                  }
                )}
              >
                {msg.text && <div className="mb-1 px-4 pt-2">{msg.text}</div>}

                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Sent media"
                    className={clsx(
                      "rounded-md w-40 h-auto object-cover",
                      isMe ? "ml-35 md:ml-95" : ""
                    )}
                  />
                )}
              </div>

              <div
                className={clsx("text-xs opacity-70 px-1", {
                  "text-right self-end text-black": isMe,
                  "text-left self-start text-gray-600 dark:text-gray-400":
                    !isMe,
                })}
              >
                {new Date(msg.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Message Input without refetch */}
      <MessageInput />
    </div>
  );
};

export default MessageBox;
