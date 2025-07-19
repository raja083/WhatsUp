import LoadingSpinner from "@/components/LoadingSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoadUserQuery, useUpdateUserMutation } from "@/features/api/authApi";
import { Loader2 } from "lucide-react";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const { data, isLoading, refetch } = useLoadUserQuery();
  const [updateUser,{data:updatedData,isLoading:updateUserIsLoading, isError , isSuccess , error}] = useUpdateUserMutation();
  

  if (isLoading) return <LoadingSpinner />;

  const [name, setName] = useState(""); //initially name is set empty
  const [profilePhoto, setProfilePhoto] = useState(""); //profile photo is empty initially


  useEffect(() => {
    if (data?.user?.fullName) setName(data.user.fullName);
  }, [data]);

  useEffect(()=>{
    refetch();
    if(isSuccess) toast.success(updatedData?.message || "User updated successfully")
        if(isError) toast.error( error?.data?.message || "Failed to update user")
  },[isError,isSuccess,updatedData,error])


  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () =>{
    console.log(name);
    console.log(profilePhoto);
    const formData = new FormData();
    formData.append("fullName", name);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto); // only if file is selected
    await updateUser(formData);
  }


  return (
    <div className="max-w-4xl mx-auto px-4 mt-30">
      <h1 className="font-bold text-2xl text-center md:text-left ml-3">
        PROFILE
      </h1>
      <div className="flex flex-row">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 md:h-32 md:w-32">
              <AvatarImage
                src={
                  data?.user?.profilePic ||
                  "https://i.pinimg.com/736x/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg"
                }
              />
              <AvatarFallback>Profile photo</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="ml-10">
          <div className="mb-2">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              Name:{" "}
              <span className="font-normal text-gray-700 dark:text-gray-300">
                {data?.user?.fullName}
              </span>
            </h2>
          </div>
          <div className="mb-2">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300">
                {data?.user?.email}
              </span>
            </h2>
          </div>

          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button>Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you are
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Name</Label>
                    <Input
                      className="col-span-3"
                      type="text"
                      id="name-1"
                      name="name"
                      onChange={(e) => setName(e.target.value)} //whenever input is changed set the name as the input value
                      value={name}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Profile Pic</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      className="col-span-3"
                      onChange={onChangeHandler} // on uploading the image set image as the uploades image using useState
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>

                  <Button disabled={updateUserIsLoading} onClick={updateUserHandler} type="submit">
                    {updateUserIsLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Please Wait
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Profile;
