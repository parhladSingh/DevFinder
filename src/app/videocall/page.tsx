"use client";

import React, { useEffect, useRef, useState } from "react";     
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"; // No change needed here
import { useSearchParams, useRouter } from "next/navigation"; 
import io from "socket.io-client"; 

const socket = io("http://localhost:3001");

const VideoCallPage = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  const router = useRouter();
  const meetingRef = useRef<HTMLDivElement>(null);
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  const [zp, setZp] = useState<any>(null); // Use any for zp instead of a specific type

  const startMeeting = async (element: HTMLDivElement) => {
    const appID = 393650276;
    const serverSecret = "2327fd0f41a4a78c4c5a612666c56ca3"; 
    console.log("Room ID:", roomId);
    const userID = String(new Date().getTime());

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId || "",
      userID,
      "User Name"
    );
    console.log("Kit Token:", kitToken);

    const zegoInstance = ZegoUIKitPrebuilt.create(kitToken);
    setZp(zegoInstance); // Save the Zego instance to state

    zegoInstance.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: window.location.origin + window.location.pathname,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: true,
      onJoinRoom: () => {
        setHasJoinedRoom(true);
      },
      onLeaveRoom: () => {
        setHasJoinedRoom(false);
      },
    });
  };

  useEffect(() => {
    if (!hasJoinedRoom && meetingRef.current) {
      startMeeting(meetingRef.current);
    }

    socket.on("opponent_rejected", () => {
      alert("Video call request is rejected.");
      
      if (zp) {
       zp.hangUp(); // Call leaveRoom method
      }

      router.push("/room");
    });

    return () => {
      setHasJoinedRoom(false);
      socket.off("opponent_rejected");
    };
  }, [hasJoinedRoom, zp]);

  return (
    <div
      ref={meetingRef}
      style={{ width: "100%", height: "100vh" }}
    ></div>
  );
};

export default VideoCallPage;
   