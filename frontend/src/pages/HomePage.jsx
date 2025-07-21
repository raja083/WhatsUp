// src/pages/Home.jsx
import { Button } from "@/components/ui/button"
import { MessageSquareText } from "lucide-react"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen
                    bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                    overflow-hidden transition-colors duration-500">
      <div className="text-center max-w-xl p-6">
        <div className="flex justify-center mb-6">
          <MessageSquareText className="h-16 w-16 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome to WhatsUp!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
          Connect instantly with friends and colleagues. Fast, secure, and simple messaging — all in one place.
        </p>
        <Link to="/chats"><Button>Start Messaging</Button></Link>
      </div>
    </div>
  )
}
