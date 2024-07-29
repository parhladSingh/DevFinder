
// import React from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import Link from 'next/link'; // Import Link from next/link for navigation
// import useWebRTC from "@/app/webrtc/useWebRTC";

// interface CardProps {
//   _id: string;
//   username: string;
//   description: string;
//   tags: string | string[];
//   githubRepo: string;
//   linkedinProfile: string;
//   email: string;
//   onDelete: () => Promise<void>;
//   onUpdate: () => void;
// }


// const Card: React.FC<CardProps> = ({
//   _id,
//   username,
//   description,
//   tags,
//   githubRepo,
//   linkedinProfile,
//   email,
//   onDelete,
//   onUpdate
// }) => {
//   const { startLocalStream, localVideoRef, remoteVideoRef, isCalling, handleVideoCall } = useWebRTC(_id); // Use _id as roomId
//   const tagList = typeof tags === 'string' ? tags.split(',') : tags;

//   const handleUpdateClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
//     event.stopPropagation();
//     onUpdate();
//   };

//   return (
//     <div className="card border w-1/4 border-2-blue p-4 rounded-lg shadow-lg relative">
//       <FaEdit
//         onClick={handleUpdateClick}
//         className="absolute top-2 right-10 cursor-pointer text-blue-500"
//       />
//       <FaTrash
//         onClick={onDelete}
//         className="absolute top-2 right-2 cursor-pointer text-red-500"
//       />
//       <h3 className='text-white text-xl font-bold mb-2'>{username}</h3>
//       <p className='text-gray-400 mb-4'>{description}</p>
//       <div className="flex flex-wrap mb-4">
//         {tagList.map((tag, index) => (
//           <span
//             key={index}
//             className='text-white bg-blue-500 rounded-full px-3 py-1 text-sm mr-2 mb-2'>
//             {tag}
//           </span>
//         ))}
//       </div>
//       <div className="card-details mb-4">
//         <p className='mb-2'>
//           <a href={githubRepo} className='text-blue-500 hover:underline' target="_blank" rel="noopener noreferrer">
//             GitHub Repo
//           </a>
//         </p>
//         <p className='mb-4'>
//           <a href={linkedinProfile} className='text-blue-500 hover:underline' target="_blank" rel="noopener noreferrer">
//             LinkedIn Profile
//           </a>
//         </p>
//         <p className='text-gray-300'>Creator: {email}</p>
//       </div>
//       <Link href={`/videocall?roomId=${_id}`}> {/* Navigate to videocall page with _id */}
//         <button
//           className={`bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${isCalling ? 'opacity-50 cursor-not-allowed' : ''}`}
//           onClick={handleVideoCall}
//           disabled={isCalling}>
//           {isCalling ? 'Calling...' : 'Do Video Call'}
//         </button>
//       </Link>
    
//     </div>
//   );
// };

// export default Card;








// parhlad
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import useWebRTC from "@/app/webrtc/useWebRTC";

interface CardProps {
  _id: string;
  username: string;
  description: string;
  tags: string | string[];
  githubRepo: string;
  linkedinProfile: string;
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
  linkedinProfile,
  email,
  onDelete,
  onUpdate
}) => {
  const { startLocalStream, localVideoRef, remoteVideoRef, isCalling, handleVideoCall } = useWebRTC(_id); // Use _id as roomId
  const tagList = typeof tags === 'string' ? tags.split(',') : tags;
  const router = useRouter(); // Use useRouter for navigation

  const handleUpdateClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation();
    onUpdate();
  };

  const handleVideoCallClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await handleVideoCall();
    router.push(`/videocall?roomId=${_id}`);
  };

  return (
    <div className="card border w-1/4 border-2-blue p-4 rounded-lg shadow-lg relative">
      <FaEdit
        onClick={handleUpdateClick}
        className="absolute top-2 right-10 cursor-pointer text-blue-500"
      />
      <FaTrash
        onClick={onDelete}
        className="absolute top-2 right-2 cursor-pointer text-red-500"
      />
      <h3 className='text-white text-xl font-bold mb-2'>{username}</h3>
      <p className='text-gray-400 mb-4'>{description}</p>
      <div className="flex flex-wrap mb-4">
        {tagList.map((tag, index) => (
          <span
            key={index}
            className='text-white bg-blue-500 rounded-full px-3 py-1 text-sm mr-2 mb-2'>
            {tag}
          </span>
        ))}
      </div>
      <div className="card-details mb-4">
        <p className='mb-2'>
          <a href={githubRepo} className='text-blue-500 hover:underline' target="_blank" rel="noopener noreferrer">
            GitHub Repo
          </a>
        </p>
        <p className='mb-4'>
          <a href={linkedinProfile} className='text-blue-500 hover:underline' target="_blank" rel="noopener noreferrer">
            LinkedIn Profile
          </a>
        </p>
        <p className='text-gray-300'>Creator: {email}</p>
      </div>
      <button
        className={`bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${isCalling ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleVideoCallClick}
        disabled={isCalling}>
        {isCalling ? 'Calling...' : 'Do Video Call'}
      </button>
    </div>
  );
};

export default Card;
