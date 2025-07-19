import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const initialMessages = [
  {
    id: 1,
    text: "Hey there!",
    sender: "them",
    timestamp: "10:00 AM",
  },
  {
    id: 2,
    text: "Hi! How are you?",
    sender: "me",
    timestamp: "10:01 AM",
  },
  {
    id: 3,
    text: "I'm good, thanks for asking.",
    sender: "them",
    timestamp: "10:02 AM",
  },
  {
    id: 4,
    text: "Great to hear!",
    sender: "me",
    timestamp: "10:03 AM",
  },
  {
    id: 1,
    text: "Hey there!",
    sender: "them",
    timestamp: "10:00 AM",
  },
  {
    id: 2,
    text: "Hi! How are you?",
    sender: "me",
    timestamp: "10:01 AM",
  },
  {
    id: 3,
    text: "I'm good, thanks for asking.",
    sender: "them",
    timestamp: "10:02 AM",
  },
  {
    id: 4,
    text: "Great to hear!",
    sender: "me",
    timestamp: "10:03 AM",
  },
  {
    id: 1,
    text: "Hey there!",
    sender: "them",
    timestamp: "10:00 AM",
  },
  {
    id: 2,
    text: "Hi! How are you?",
    sender: "me",
    timestamp: "10:01 AM",
  },
  {
    id: 3,
    text: "I'm good, thanks for asking.",
    sender: "them",
    timestamp: "10:02 AM",
  },
  {
    id: 4,
    text: "Great to hear!",
    sender: "me",
    timestamp: "10:03 AM",
  },
];

const selectedUser = {
  name: "Alice",
  profilePic: "https://i.pravatar.cc/150?img=1",
};

const MessageBox = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        text: newMessage,
        sender: "me",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] flex-1 bg-gray-50 dark:bg-[#0b1120]">
      {/* Fixed Header */}
      <div className="p-4  flex items-center gap-3 border-b dark:border-gray-800 bg-white dark:bg-[#0f172a] shrink-0">
        <img
          src={selectedUser.profilePic}
          alt={selectedUser.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="font-medium text-lg">{selectedUser.name}</div>
      </div>

      {/* Scrollable Message Area */}
      <div className="flex-1 overflow-y-auto  px-4 py-2 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={clsx(
              "max-w-xs md:max-w-md lg:max-w-xl p-2 px-4 rounded-lg text-sm",
              {
                "bg-blue-500 text-white self-end ml-auto": msg.sender === "me",
                "bg-gray-200 dark:bg-gray-700 self-start text-black dark:text-white":
                  msg.sender === "them",
              }
            )}
          >
            <div>{msg.text}</div>
            <div className="text-xs text-right opacity-70 mt-1">
              {msg.timestamp}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Message Input */}
      <div className="border-t dark:border-gray-800 p-3 bg-white dark:bg-[#0f172a] shrink-0">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend} size="icon" variant="secondary">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
