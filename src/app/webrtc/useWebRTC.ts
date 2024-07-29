
// import { useEffect, useRef, useState } from 'react';
// import { io, Socket } from 'socket.io-client';

// const useWebRTC = (roomId: string) => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [peerConnections, setPeerConnections] = useState<{ [key: string]: RTCPeerConnection }>({});
//   const localStream = useRef<MediaStream | null>(null);
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const [isCalling, setIsCalling] = useState(false);
//   const [isAudioMuted, setIsAudioMuted] = useState(false);
//   const [isVideoMuted, setIsVideoMuted] = useState(false);

//   useEffect(() => {
//     const newSocket = io('http://localhost:3001'); // Replace with your signaling server URL
//     setSocket(newSocket);
  
//     newSocket.emit('join-room', roomId);
  
//     newSocket.on('user-connected', (userId) => {
//       // console.log(`User connected: ${userId}`);
//       createPeerConnection(userId, newSocket);
//     });
  
//     newSocket.on('offer', async (data) => {
//       // console.log(`Received offer from ${data.userId}`);
//       await handleOffer(data, newSocket);
//     });
  
//     newSocket.on('answer', async (data) => {
//       // console.log(`Received answer from ${data.userId}`);
//       await handleAnswer(data);
//     });
  
//     newSocket.on('candidate', async (data) => {
//       // console.log(`Received candidate from ${data.userId}`);
//       await handleCandidate(data);
//     });
  
//     return () => {
//       console.log(`Disconnecting socket ${newSocket.id}`);
//       newSocket.disconnect();
//       setPeerConnections({});
//     };
//   }, [roomId]);

//   const createPeerConnection = (userId: string, socket: Socket) => {
//     const peerConnection = new RTCPeerConnection({
//       iceServers: [
//         {
//           urls: 'stun:stun.l.google.com:19302',
//         },
//       ],
//     });

//     peerConnection.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit('candidate', { candidate: event.candidate, roomId });
//       }
//     };

//     peerConnection.ontrack = (event) => {
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       }
//     };

//     if (localStream.current) {
//       localStream.current.getTracks().forEach((track) => {
//         peerConnection.addTrack(track, localStream.current!);
//       });
//     }

//     setPeerConnections((prev) => ({ ...prev, [userId]: peerConnection }));
//     return peerConnection;
//   };

//   const handleOffer = async (data: any, socket: Socket) => {
//     const peerConnection = createPeerConnection(data.userId, socket);
//     await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
//     const answer = await peerConnection.createAnswer();
//     await peerConnection.setLocalDescription(answer);
//     socket.emit('answer', { answer, roomId });
//   };

//   const handleAnswer = async (data: any) => {
//     const peerConnection = peerConnections[data.userId];
//     await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
//   };

//   const handleCandidate = async (data: any) => {
//     const peerConnection = peerConnections[data.userId];
//     await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
//   };

//   const startLocalStream = async () => {
//     localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     if (localVideoRef.current) {
//       localVideoRef.current.srcObject = localStream.current;
//     }
//     return localStream.current;
//   };

//   const stopLocalStream = () => {
//     if (localStream.current) {
//       localStream.current.getTracks().forEach((track) => {
//         track.stop();
//       });
//       localStream.current = null;
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = null;
//       }
//     }
//   };

//   const muteAudio = () => {
//     if (localStream.current) {
//       localStream.current.getAudioTracks().forEach((track) => {
//         track.enabled = false;
//       });
//       setIsAudioMuted(true);
//     }
//   };

//   const unmuteAudio = () => {
//     if (localStream.current) {
//       localStream.current.getAudioTracks().forEach((track) => {
//         track.enabled = true;
//       });
//       setIsAudioMuted(false);
//     }
//   };

//   const muteVideo = () => {
//     if (localStream.current) {
//       localStream.current.getVideoTracks().forEach((track) => {
//         track.enabled = false;
//       });
//       setIsVideoMuted(true);
//     }
//   };

//   const unmuteVideo = () => {
//     if (localStream.current) {
//       localStream.current.getVideoTracks().forEach((track) => {
//         track.enabled = true;
//       });
//       setIsVideoMuted(false);
//     }
//   };

//   const endCall = () => {
//     Object.values(peerConnections).forEach((peerConnection) => {
//       peerConnection.close();
//     });
//     setPeerConnections({});
//     stopLocalStream(); // Ensure local stream is stopped
//     setIsCalling(false);
//   };

//   const handleVideoCall = async () => {
//     if (isCalling) {
//       endCall();
//     } else {
//       const localStream = await startLocalStream();
//       if (localStream) {
//         setIsCalling(true);
//       } else {
//         console.error('Local stream not started');
//       }
//     }
//   };

//   return {
//     startLocalStream,
//     stopLocalStream,
//     muteAudio,
//     unmuteAudio,
//     muteVideo,
//     unmuteVideo,
//     handleVideoCall,
//     endCall,
//     localVideoRef,
//     remoteVideoRef,
//     isCalling,
//     isAudioMuted,
//     isVideoMuted,
//   };
// };

// export default useWebRTC;
    


// parhlad





import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const useWebRTC = (roomId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [peerConnections, setPeerConnections] = useState<{ [key: string]: RTCPeerConnection }>({});
  const localStream = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  useEffect(() => {
    // Clean up when component unmounts
    return () => {
      endCall();
    };
  }, []);

  const createPeerConnection = (userId: string, socket: Socket) => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('candidate', { candidate: event.candidate, roomId });
      }
    };

    peerConnection.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream.current!);
      });
    }

    setPeerConnections((prev) => ({ ...prev, [userId]: peerConnection }));
    return peerConnection;
  };

  const handleOffer = async (data: any, socket: Socket) => {
    const peerConnection = createPeerConnection(data.userId, socket);
    await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit('answer', { answer, roomId });
  };

  const handleAnswer = async (data: any) => {
    const peerConnection = peerConnections[data.userId];
    if (peerConnection) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
    }
  };

  const handleCandidate = async (data: any) => {
    const peerConnection = peerConnections[data.userId];
    if (peerConnection) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  };

  const startLocalStream = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('getUserMedia is not supported by this browser.');
      }

      localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream.current;
      }

      return localStream.current;
    } catch (error:any) {
      console.error('Error accessing media devices:', error);
      alert('Error accessing media devices: ' + error.message);
      return null;
    }
  };

  const stopLocalStream = () => {
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => {
        track.stop();
      });
      localStream.current = null;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
    }
  };

  const muteAudio = () => {
    if (localStream.current) {
      localStream.current.getAudioTracks().forEach((track) => {
        track.enabled = false;
      });
      setIsAudioMuted(true);
    }
  };

  const unmuteAudio = () => {
    if (localStream.current) {
      localStream.current.getAudioTracks().forEach((track) => {
        track.enabled = true;
      });
      setIsAudioMuted(false);
    }
  };

  const muteVideo = () => {
    if (localStream.current) {
      localStream.current.getVideoTracks().forEach((track) => {
        track.enabled = false;
      });
      setIsVideoMuted(true);
    }
  };

  const unmuteVideo = () => {
    if (localStream.current) {
      localStream.current.getVideoTracks().forEach((track) => {
        track.enabled = true;
      });
      setIsVideoMuted(false);
    }
  };

  const endCall = () => {
    Object.values(peerConnections).forEach((peerConnection) => {
      peerConnection.close();
    });
    setPeerConnections({});
    stopLocalStream();
    setIsCalling(false);
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  const handleVideoCall = async () => {
    if (isCalling) {
      endCall();
    } else {
      const localStream = await startLocalStream();
      if (localStream) {
        const newSocket = io('http://localhost:3001'); // Replace with your signaling server URL
        setSocket(newSocket);

        newSocket.on('connect', () => {
          console.log(`User ${newSocket.id} connected`);
          newSocket.emit('join-room', roomId);
        });

        newSocket.on('user-connected', (userId) => {
          console.log(`User ${userId} connected`);
          createPeerConnection(userId, newSocket);
        });

        newSocket.on('offer', async (data) => {
          await handleOffer(data, newSocket);
        });

        newSocket.on('answer', async (data) => {
          await handleAnswer(data);
        });

        newSocket.on('candidate', async (data) => {
          await handleCandidate(data);
        });

        newSocket.on('disconnect', () => {
          console.log(`User ${newSocket.id} disconnected`);
          stopLocalStream();
          setPeerConnections({});
        });

        setIsCalling(true);
      } else {
        console.error('Local stream not started');
      }
    }
  };

  return {
    startLocalStream,
    stopLocalStream,
    muteAudio,
    unmuteAudio,
    muteVideo,
    unmuteVideo,
    
    handleVideoCall,
    endCall,
    localVideoRef,
    remoteVideoRef,
    isCalling,
    isAudioMuted,
    isVideoMuted,
  };
};

export default useWebRTC;
