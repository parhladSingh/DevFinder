// ZegoCloudComponent.tsx
import React, { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'; // Adjust if necessary

// Define an interface for props
interface ZegoCloudComponentProps {
  roomId: string | null; // You can adjust the type based on your logic
}

const ZegoCloudComponent: React.FC<ZegoCloudComponentProps> = ({ roomId }) => {
  const meetingRef = useRef<HTMLDivElement>(null);
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);

  useEffect(() => {
    if (roomId && meetingRef.current && !hasJoinedRoom) {
      const appID = 393650276;
      const serverSecret = "2327fd0f41a4a78c4c5a612666c56ca3";
      const userID = String(new Date().getTime());

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        userID,
        "User Name"
      );

      const zegoInstance = ZegoUIKitPrebuilt.create(kitToken);

      zegoInstance.joinRoom({
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
        onJoinRoom: () => {
          setHasJoinedRoom(true);
        },
        onLeaveRoom: () => {
          setHasJoinedRoom(false);
        },
      });
    }
  }, [roomId, hasJoinedRoom]);

  return (
    <div ref={meetingRef} style={{ width: "100%", height: "100vh" }}></div>
  );
};

export default ZegoCloudComponent;
