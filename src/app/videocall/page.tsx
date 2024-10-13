// "use client";

// import React, { useEffect, useRef, useState } from "react";     
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"; // No change needed here
// import { useSearchParams, useRouter } from "next/navigation"; 
// import io from "socket.io-client"; 

// const socket = io("http://localhost:3001");

// const VideoCallPage = () => {
//   const searchParams = useSearchParams();
//   const roomId = searchParams.get("roomId");

//   const router = useRouter();
//   const meetingRef = useRef<HTMLDivElement>(null);
//   const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
//   const [zp, setZp] = useState<any>(null); // Use any for zp instead of a specific type

//   const startMeeting = async (element: HTMLDivElement) => {
//     const appID = 393650276;
//     const serverSecret = "2327fd0f41a4a78c4c5a612666c56ca3"; 
//     console.log("Room ID:", roomId);
//     const userID = String(new Date().getTime());

//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//       appID,
//       serverSecret,
//       roomId || "",
//       userID,
//       "User Name"
//     );
//     console.log("Kit Token:", kitToken);

//     const zegoInstance = ZegoUIKitPrebuilt.create(kitToken);
//     setZp(zegoInstance); // Save the Zego instance to state

//     zegoInstance.joinRoom({
//       container: element,
//       sharedLinks: [
//         {
//           name: "Copy Link",
//           url: window.location.origin + window.location.pathname,
//         },
//       ],
//       scenario: {
//         mode: ZegoUIKitPrebuilt.OneONoneCall,
//       },
//       showScreenSharingButton: true,
//       onJoinRoom: () => {
//         setHasJoinedRoom(true);
//       },
//       onLeaveRoom: () => {
//         setHasJoinedRoom(false);
//       },
//     });
//   };

//   useEffect(() => {
//     if (!hasJoinedRoom && meetingRef.current) {
//       startMeeting(meetingRef.current);
//     }

//     socket.on("opponent_rejected", () => {
//       alert("Video call request is rejected.");
      
//       if (zp) {
//        zp.hangUp(); // Call leaveRoom method
//       }

//       router.push("/room");
//     });

//     return () => {
//       setHasJoinedRoom(false);
//       socket.off("opponent_rejected");
//     };
//   }, [hasJoinedRoom, zp]);

//   return (
//     <div
//       ref={meetingRef}
//       style={{ width: "100%", height: "100vh" }}
//     ></div>
//   );
// };

// export default VideoCallPage;
   











//updated 


// "use client";

// import React, { useEffect, useRef, useState } from "react";     
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { useSearchParams, useRouter } from "next/navigation";
// import io from "socket.io-client"; 

// const socket = io("http://localhost:3001");

// const VideoCallPage = () => {
//   const searchParams = useSearchParams();
//   const roomId = searchParams.get("roomId");

//   const router = useRouter();
//   const meetingRef = useRef<HTMLDivElement>(null);
//   const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
//   const [zp, setZp] = useState<any>(null); // Zego instance stored in state

//   const startMeeting = async (element: HTMLDivElement) => {
//     const appID = 393650276;
//     const serverSecret = "2327fd0f41a4a78c4c5a612666c56ca3"; 
//     const userID = String(new Date().getTime());

//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//       appID,
//       serverSecret,
//       roomId || "",
//       userID,
//       "User Name"
//     );
    
//     const zegoInstance = ZegoUIKitPrebuilt.create(kitToken);
//     setZp(zegoInstance); // Save the Zego instance to state

//     zegoInstance.joinRoom({
//       container: element,
//       sharedLinks: [
//         {
//           name: "Copy Link",
//           // Make sure this runs only on the client
//           url: typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '',
//         },
//       ],
//       scenario: {
//         mode: ZegoUIKitPrebuilt.OneONoneCall,
//       },
//       showScreenSharingButton: true,
//       onJoinRoom: () => {
//         setHasJoinedRoom(true);
//       },
//       onLeaveRoom: () => {
//         setHasJoinedRoom(false);
//       },
//     });
//   };

//   useEffect(() => {

//     if (typeof document !== "undefined") {
//       // Your document-related code here if needed
//     }
//     // Ensure this code runs only when client-side and meetingRef is available
//     if (!hasJoinedRoom && meetingRef.current) {
//       startMeeting(meetingRef.current);
//     }

//     socket.on("opponent_rejected", () => {
//       alert("Video call request is rejected.");
      
//       if (zp) {
//         zp.hangUp(); // Ends the call
//       }

//       router.push("/room");
//     });

//     return () => {
//       setHasJoinedRoom(false);
//       socket.off("opponent_rejected");
//     };
//   }, [hasJoinedRoom, zp, router,startMeeting]);


//   // useEffect(() => {
//   //   if (typeof document !== "undefined") {
//   //     // Your document-related code here if needed
//   //     if (!hasJoinedRoom && meetingRef.current) {
//   //       startMeeting(meetingRef.current);
//   //     }
  
//   //     socket.on("opponent_rejected", () => {
//   //       alert("Video call request is rejected.");
        
//   //       if (zp) {
//   //         zp.hangUp(); // Ends the call
//   //       }
  
//   //       router.push("/room");
//   //     });
  
//   //     // Clean up the effect when component unmounts
//   //     return () => {
//   //       setHasJoinedRoom(false);
//   //       socket.off("opponent_rejected");
//   //     };
//   //   }
//   // }, [hasJoinedRoom, zp, router, startMeeting]); // <-- Closing the dependency array and useEffect parentheses
  
//   return (
//     <div
//       ref={meetingRef}
//       style={{ width: "100%", height: "100vh" }}
//     ></div>
//   );
// };

// export default VideoCallPage;





// its nothing


// "use client"
// import dynamic from 'next/dynamic';
// import { Suspense } from "react";
// import { useSearchParams, useRouter} from 'next/navigation';
// import React, { useState, useRef, useEffect,useCallback  } from 'react';
// import io from 'socket.io-client';

// // Dynamically import ZegoUIKitPrebuilt and cast it as `any` to avoid type errors.
// const ZegoUIKitPrebuilt = dynamic(() =>
//   import('@zegocloud/zego-uikit-prebuilt').then(mod => mod.ZegoUIKitPrebuilt as any), 
//   { ssr: false }
// );

// const socket = io("http://localhost:3001");

// const VideoCallPage = () => {
//   const searchParams = useSearchParams();
//   const roomId = searchParams.get("roomId");

//   const router = useRouter();
//   const meetingRef = useRef<HTMLDivElement>(null);
//   const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
//   const [zp, setZp] = useState<any>(null); // Zego instance stored in state

//   const startMeeting = useCallback(async (element: HTMLDivElement) => {

//     const appID = 393650276;
//     const serverSecret = "2327fd0f41a4a78c4c5a612666c56ca3"; 
//     const userID = String(new Date().getTime());

//     // Call generateKitTokenForTest and create using `any` to avoid type issues
//     const kitToken = (ZegoUIKitPrebuilt as any).generateKitTokenForTest(
//       appID,
//       serverSecret,
//       roomId || "",
//       userID,
//       "User Name"
//     );
    
//     const zegoInstance = (ZegoUIKitPrebuilt as any).create(kitToken);
//     setZp(zegoInstance); // Save the Zego instance to state

//     zegoInstance.joinRoom({
//       container: element,
//       sharedLinks: [
//         {
//           name: "Copy Link",
//           url: typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '',
//         },
//       ],
//       scenario: {
//         mode: (ZegoUIKitPrebuilt as any).OneONoneCall, // Access OneONoneCall using `any`
//       },
//       showScreenSharingButton: true,
//       onJoinRoom: () => {
//         setHasJoinedRoom(true);
//       },
//       onLeaveRoom: () => {
//         setHasJoinedRoom(false);
//       },
//     });
//   }, [roomId]);
//   useEffect(() => {
//     if (typeof window !== 'undefined' && meetingRef.current && !hasJoinedRoom) {
//       startMeeting(meetingRef.current);
//     }

//     socket.on("opponent_rejected", () => {
//       alert("Video call request is rejected.");
      
//       if (zp) {
//         zp.hangUp(); // Ends the call
//       }

//       router.push("/room");
//     });

//     return () => {
//       setHasJoinedRoom(false);
//       socket.off("opponent_rejected");
//     };
//   }, [hasJoinedRoom, zp, router, startMeeting]);

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//     <div
//       ref={meetingRef}
//       style={{ width: "100%", height: "100vh" }}
//     ></div>
//         </Suspense>

//   );
// };

// export default VideoCallPage;






// page.tsx
"use client"; // This ensures the component is treated as a client component
import dynamic from 'next/dynamic';
import { Suspense } from "react";
import { useSearchParams, useRouter } from 'next/navigation';

// Ensure the import path is correct based on your file structure
const ZegoCloudComponent = dynamic(() => import('../../components/ZegoCloudComponent'), { ssr: false });

const VideoCallPage = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");
  const router = useRouter();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ZegoCloudComponent roomId={roomId} />
    </Suspense>
  );
};

export default VideoCallPage;
