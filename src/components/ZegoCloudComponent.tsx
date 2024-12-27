import React, { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useRouter } from 'next/navigation';
import useSocket from "@/hooks/useSocket";

interface ZegoCloudComponentProps {
  roomId: string | null;
}

const ZegoCloudComponent: React.FC<ZegoCloudComponentProps> = ({ roomId }) => {
  const meetingRef = useRef<HTMLDivElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const zegoInstanceRef = useRef<any>(null);
  const [isRejected, setIsRejected] = useState(false);
  const router = useRouter();
  const socket = useSocket();

  const startMediaStream = async () => {
    try {
      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (meetingRef.current && mediaStreamRef.current) {
        const videoElement = document.createElement('video');
        videoElement.srcObject = mediaStreamRef.current;
        videoElement.autoplay = true;
        videoElement.muted = true; // Ensure local audio isn't heard by the user
        meetingRef.current.appendChild(videoElement);
      }
    } catch (error) {
      console.error("Failed to get media stream:", error);
    }
  };

  const stopMediaStreams = (mediaStream: MediaStream | null) => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop()); // Stop all active tracks
      mediaStreamRef.current = null; // Clear the reference
    }
  };   
  useEffect(() => {
    const initZego = async () => {
      if (roomId && meetingRef.current && !zegoInstanceRef.current) {
        const appID = 450396304;
        const serverSecret = "c19fdb9faf7395793d675817ccb24dcc";
        const userID = String(new Date().getTime());

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomId,
          userID,
          "User Name"
        );

        const instance = ZegoUIKitPrebuilt.create(kitToken);
        zegoInstanceRef.current = instance;

        instance.joinRoom({
          container: meetingRef.current,
          sharedLinks: [
            {
              name: "Copy Link",
              url: typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '',
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          showScreenSharingButton: true,
          onJoinRoom: () => startMediaStream(), // Start camera and microphone
          onLeaveRoom: () => stopMediaStreams(mediaStreamRef.current), // Stop media streams
        });
      }
    };

    initZego();

    socket.on("opponent_rejected", () => {
      console.log(`Call rejected for room: ${roomId}`);
      setIsRejected(true); // Set the rejection state
    });

    return () => {
      socket.off("opponent_rejected"); // Clean up listener
      stopMediaStreams(mediaStreamRef.current); // Ensure camera/mic are off
    };
  }, [roomId, socket]);

  const handleOk = () => {
    if (zegoInstanceRef.current) {
      zegoInstanceRef.current.destroy(); // Disconnects the Zego instance
      zegoInstanceRef.current = null;
    }

    stopMediaStreams(mediaStreamRef.current);
    setIsRejected(false);
    router.push('/room'); // Redirect to the 'room' page
  };

  return (
    <div className="relative w-full h-full">
      {isRejected ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold text-black mb-4">Call Rejected</h2>
            <p className="text-black mb-4">Your call has been rejected.</p>
            <button 
              className="mt-2 px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-500 transition"
              onClick={handleOk}
            >
              OK
            </button>
          </div>
        </div>
      ) : (
        <div ref={meetingRef} style={{ width: "100%", height: "100vh" }}></div>
      )}
    </div>
  );
};

export default ZegoCloudComponent;
