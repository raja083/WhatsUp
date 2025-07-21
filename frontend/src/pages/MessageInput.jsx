import React from "react";
import { useEffect, useState, useRef } from "react";
import { Image, Send, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSendMessageMutation } from "@/features/api/messageApi";
import { useSelector } from "react-redux";
import { getSocket  } from "@/lib/socket";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null); //useRef is used to manipulate DOM in react (just like querySelector in js)

  const { selectedUser } = useSelector((store) => store.chat);
  const [sendMessage] = useSendMessageMutation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    console.log(file);
  };

  const removeImage = (e) => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!text.trim() && !imagePreview) return;

  try {
    const result = await sendMessage({
      text: text.trim(),
      image: imagePreview,
      id: selectedUser._id,
    });

    const socket = getSocket();
    // ✅ Emit to yourself so it appears immediately
    socket?.emit("newMessage", result.data);

    // Clear form
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  } catch (error) {
    console.error("Failed to send message:", error);
  }
};

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <Input
            type="text"
            className=" input border-gray-500 input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="text-gray-700 mt-1 ml" size={30} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send className="text-blue-600 mr-5" size={30} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
