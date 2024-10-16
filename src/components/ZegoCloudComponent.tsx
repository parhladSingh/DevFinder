// ZegoCloudComponent.tsx
import React, { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


interface ZegoCloudComponentProps {
  roomId: string | null; 
}

const ZegoCloudComponent: React.FC<ZegoCloudComponentProps> = ({ roomId }) => {
  const meetingRef = useRef<HTMLDivElement>(null);
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);

  useEffect(() => {
    if (roomId && meetingRef.current && !hasJoinedRoom) {
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
