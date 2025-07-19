import { MessageCircle } from "lucide-react";
import React from "react";

const EmptyChatScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 text-gray-500 dark:text-gray-400 w-full">
      <MessageCircle size={64} className="mb-4 text-indigo-500" />
      <h2 className="text-2xl font-semibold mb-2">No Conversation Selected</h2>
      <p className="max-w-md">
        Please select a user from the sidebar to start chatting. Your
        conversations will appear here.
      </p>
    </div>
  );
};

export default EmptyChatScreen;
