import React, { useEffect, useRef } from 'react';
import useWebRTC from './useWebRTC';

const VideoCall = ({ roomId }: { roomId: string }) => {
  const { startLocalStream } = useWebRTC(roomId);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startStream = async () => {
      const localStream = await startLocalStream();
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
    };

    startStream();
  }, [startLocalStream]);

  return (
    <div>
      <video ref={localVideoRef} autoPlay playsInline />
    </div>
  );
};

export default VideoCall;
