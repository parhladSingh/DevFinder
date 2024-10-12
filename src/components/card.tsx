import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getSocket } from "@/lib/SocketProvider";

interface CardProps {
  _id: string;
  username: string;
  description: string;
  tags: string | string[];
  githubRepo: string;
  linkedinprofile: string;
  email: string;
  onDelete: () => Promise<void>;
  onUpdate: () => void;
}

const Card: React.FC<CardProps> = ({
  _id,
  username,
  description,
  tags,
  githubRepo,
  linkedinprofile,
  email,
  onDelete,
  onUpdate,
}) => {
  const tagList = typeof tags === "string" ? tags.split(",") : tags;
  const router = useRouter(); // Use useRouter for navigation
  const { user } = useAuth();
  const socket = getSocket();
  const [isCalling, setIsCalling] = useState(false);

  const handleUpdateClick = (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onUpdate();
  };

  const handleVideoCallClick = async () => {
    setIsCalling(true);
    if (user?.email === email) {
      alert("Sorry, it is your room...");
    } else {
      socket.emit("request_to_call", {
        currentUserData: user,
        roomGithubRepo: githubRepo,
        roomCreatorEmail: email,
        roomId: _id,
        roomCreatorLinkedinprofile: linkedinprofile,
      });
      router.push(`/videocall?roomId=${_id}&emailId=${email}`);
    }
  };

  return (
    <div className="card border w-full sm:w-1/2 md:w-full lg:w-1/4 border-2-blue p-4 rounded-lg shadow-lg relative">
      <FaEdit
        onClick={handleUpdateClick}
        className="absolute top-2 right-8 sm:right-12 md:right-10 cursor-pointer text-blue-500 w-6 h-5 sm:w-6 sm:h-5 mr-2" 
      />

      <FaTrash
        onClick={onDelete}
        className="absolute top-2 right-2 cursor-pointer text-red-500 w-6 h-5  sm:w-6 sm:h-5 mr-2" 
      />
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
        {username}
      </h3>
      <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-4">
        {description}
      </p>

      <div className="flex flex-wrap justify-between mb-4">
        {tagList.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-500 rounded-full px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm md:text-base mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="card-details mb-4">
        <p className="mb-2">
          <a
            href={githubRepo}
            className="text-blue-500 hover:underline text-sm sm:text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repo
          </a>
        </p>
        <p className="mb-4">
          <a
            href={linkedinprofile}
            className="text-blue-500 hover:underline text-sm sm:text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn Profile
          </a>
        </p>
        <p className="text-xs sm:text-sm text-gray-300">Creator: {email}</p>
      </div>

      <button
        className={`bg-green-500 py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${
          isCalling ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleVideoCallClick}
        disabled={isCalling}
      >
        {isCalling ? "Calling..." : "Do Video Call"}
      </button>
    </div>
  );
};

export default Card;
