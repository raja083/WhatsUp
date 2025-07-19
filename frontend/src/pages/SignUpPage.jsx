import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, User, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useRegisterUserMutation } from "@/features/api/authApi"
import { toast } from "sonner"

const Signup = () => {

   
  const [inputData, setInputData] = useState({
    fullName : "",
    email:"",
    password:""
  });

  const [registerUser,{isLoading,isSuccess,isError,error,data}] = useRegisterUserMutation();
   const changeInputHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    
      setInputData({ ...inputData, [name]: value }); // Copies the previous state (signUpInput) and updates the field corresponding to name with the new value.
  };
  
  useEffect(()=>{
    if(isSuccess){
      toast.success( data.message || "User registered successfully");
    }
    if(isError){
      toast.error( error.data.message || "Could not register user");
    }
  },[isError,isSuccess,error])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <Card className="w-full max-w-md shadow-xl rounded-2xl p-6 bg-white dark:bg-gray-800">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            Sign Up
          </h2>
        </CardHeader>
        <CardContent>
           <div className="space-y-4">
             <div>
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name</Label>
              <div className="flex items-center gap-2 mt-1">
                <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="text"
                  name="fullName"
                  value={inputData.fullName}
                  onChange = {changeInputHandler}
                  id="name"
                  placeholder="John Doe"
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                 name="email"
                  value={inputData.email}
                  onChange = {changeInputHandler}
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
              <div className="flex items-center gap-2 mt-1">
                <Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  name="password"
                  value={inputData.password}
                  onChange = {changeInputHandler}
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
            </div>
           </div>

            <Button className="mt-4 w-full"
                  disabled={isLoading}
                  onClick={()=>registerUser(inputData)}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      Wait
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
        </CardContent>
      </Card>
    </div>
  )
}


export default Signup;