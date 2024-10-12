"use client";

import React, { useEffect, useState } from "react";
import { Suspense } from "react";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const CreateRoomForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, handleSubmit, setValue } = useForm();
  const { user } = useAuth();
  const [isUpdate, setIsUpdate] = useState(false);
  const roomId = searchParams.get("_id");

  useEffect(() => {
    if (roomId) {
      setIsUpdate(true);
      setValue("username", searchParams.get("username") || "");
      setValue("creatorEmail", searchParams.get("creatorEmail") || "");
      setValue("description", searchParams.get("description") || "");
      setValue("githubRepo", searchParams.get("githubRepo") || "");
      setValue("linkedinprofile", searchParams.get("linkedinprofile") || "");
      setValue("tags", searchParams.get("tags") || "");
    } else if (user?.email) {
      setValue("creatorEmail", user.email); // Set the creatorEmail from user context
    }
    // Fetch and set the user's LinkedIn profile
    if (user?.linkedinprofile) {
      setValue("linkedinprofile", user.linkedinprofile);
    }
  }, [roomId, searchParams, setValue, user]);

  const onSubmit = async (room: any) => {
    try {
      if (isUpdate && roomId) {
        // Update existing room
        const url = `/api/users/updateRoom/${roomId}`;
        const response = await axios.put(url, room, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          console.log("Room updated successfully:", response.data);
          router.push("/yourroom"); // Navigate to your room page
        } else {
          throw new Error("Failed to update room");
        }
      } else {
        // Create new room
        const response = await axios.post("/api/users/createRoom", room, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          router.push("/yourroom"); // Navigate to your room page
        } else {
          throw new Error("Failed to create room");
        }
      }
    } catch (error: any) {
      console.error("Error saving room:", error.message);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 mt-5 container"
      >
        <div className="shadcn-form-item">
          <label className="shadcn-form-item-label">Name</label>
          <Input
            {...register("username")}
            placeholder="Enter your room name"
            className="shadcn-input"
            required
          />
          <p className="shadcn-form-item-description text-gray-400">
            This is your public display name.
          </p>
        </div>
        <div className="shadcn-form-item">
          <label className="shadcn-form-item-label">Email</label>
          <Input
            {...register("creatorEmail")}
            placeholder="Enter your email"
            className="shadcn-input"
            required
            readOnly
          />
          <p className="shadcn-form-item-description text-gray-400">
            Add login email.
          </p>
        </div>
        <div className="shadcn-form-item">
          <label className="shadcn-form-item-label">Description</label>
          <Input
            {...register("description")}
            placeholder="Please describe what you are coding on."
            className="shadcn-input"
            required
          />
          <p className="shadcn-form-item-description text-gray-400">
            Please describe what you are coding on.
          </p>
        </div>
        <div className="shadcn-form-item">
          <label className="shadcn-form-item-label">Github Repo</label>
          <Input
            {...register("githubRepo")}
            placeholder="https://github.com/parhladSingh/Cake-Bakery"
            className="shadcn-input"
            required
          />
          <p className="shadcn-form-item-description text-gray-400">
            Please put a link to the project you are working on.
          </p>
        </div>
        <div className="shadcn-form-item">
          <label className="shadcn-form-item-label">LinkedIn Profile</label>
          <Input
          
            {...register("linkedinprofile")}
             placeholder="https://www.linkedin.com/in/username"
            className="shadcn-input"
            required
            readOnly
          />
          <p className="shadcn-form-item-description cursor-pointer text-gray-400">
            This is your LinkedIn profile, automatically filled from signup.
          </p>
        </div>

        <div className="shadcn-form-item">
          <label className="shadcn-form-item-label">Tags</label>
          <Input
            {...register("tags")}
            placeholder="eg. typescript, Nextjs, taiwindCSS"
            className="shadcn-input"
            required
          />
          <p className="shadcn-form-item-description text-gray-400">
            List your programming languages, frameworks, libraries.
          </p>
        </div>
        <Button type="submit" className="py-4 px-4 font-bold">
          {isUpdate ? "Update Room" : "Create Room"}
        </Button>
      </form>
    </Suspense>
  );
};

export default CreateRoomForm;



