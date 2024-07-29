

// PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP

// "use client";

// import React, { useEffect, useState, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import useWebRTC from '@/app/webrtc/useWebRTC';
// import Link from 'next/link';

// const VideoCallPage = () => {
//     const router = useRouter();
//     const searchParams = new URLSearchParams(window.location.search);
//     const roomId = searchParams.get('roomId') || '';

//     const { startLocalStream, stopLocalStream, muteAudio, unmuteAudio, muteVideo, unmuteVideo, localVideoRef, remoteVideoRef, isCalling } = useWebRTC(roomId);

//     const [roomInfo, setRoomInfo] = useState<any>(null);
//     const [isAudioMuted, setIsAudioMuted] = useState(false);
//     const [isVideoMuted, setIsVideoMuted] = useState(false);

//     useEffect(() => {
//         const fetchRoomInfo = async () => {
//             if (roomId) {
//                 try {
//                     const response = await fetch(`/api/users/fetchroom`);
//                     const rooms = await response.json();
//                     const room = rooms.find((room: any) => room._id === roomId);
//                     if (room) {
//                         setRoomInfo(room);
//                     }
//                 } catch (error) {
//                     console.error('Failed to fetch room info:', error);
//                 }
//             }
//         };

//         fetchRoomInfo();
//     }, [roomId]);

//     useEffect(() => {
//         const startStreaming = async () => {
//             if (roomId && localVideoRef.current) {
//                 // Start local stream when roomId is available
//                 const localStream = await startLocalStream();
//                 if (localStream) {
//                     localVideoRef.current.srcObject = localStream;
//                 }
//             }
//         };

//         startStreaming();

//         return () => {
//             // Clean up function to stop local stream when component unmounts or roomId changes
//             stopLocalStream();
//         };
//     }, [roomId, startLocalStream, stopLocalStream, localVideoRef]);

//     const handleVideoCall = async () => {
//         // Implement your logic to handle video call start/stop
//         if (isCalling) {
//             await stopLocalStream();
//             router.push('/yourroom'); // Redirect to yourroom page after ending the call
//         } else {
//             const localStream = await startLocalStream();
//             if (localStream && localVideoRef.current) {
//                 localVideoRef.current.srcObject = localStream;
//             } else {
//                 console.error('Local stream or video ref is not available.');
//             }
//         }
//     };

//     const toggleAudio = () => {
//         if (isAudioMuted) {
//             unmuteAudio();
//         } else {
//             muteAudio();
//         }
//         setIsAudioMuted(!isAudioMuted);
//     };

//     const toggleVideo = () => {
//         if (isVideoMuted) {
//             unmuteVideo();
//         } else {
//             muteVideo();
//         }
//         setIsVideoMuted(!isVideoMuted);
//     };

//     return (
//         <div className="flex bg-black min-h-screen overflow-hidden container">
//             {/* Left side: Video container */}
//             <div className="w-2/3 flex flex-col justify-center items-center relative">
//                 <div className="w-[700px] p-4 bg-black">
//                     <div className=" mt-4 border border-gray-700 ">
//                         <video ref={localVideoRef} className="local-video mr-4 w-[700px] h-[300px] overflow-hidden bg-black" autoPlay muted></video>
//                         <video ref={remoteVideoRef} className="remote-video w-[700px] h-[300px]overflow-hidden bg-black" autoPlay></video>
//                     </div>
               

//                 <div className="absolute bottom-4 left-4 flex gap-4">
//                     <button className={`bg-${isAudioMuted ? 'green' : 'red'}-500 text-white px-4 py-2 rounded-md`} onClick={toggleAudio}>
//                         {isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
//                     </button>
//                     <button className={`bg-${isVideoMuted ? 'green' : 'red'}-500 text-white px-4 py-2 rounded-md`} onClick={toggleVideo}>
//                         {isVideoMuted ? 'Unmute Video' : 'Mute Video'}
//                     </button>
//                     <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleVideoCall}>
//                         {isCalling ? 'End Call' : 'Start Call'}
//                     </button>
//                 </div>
//                 </div>
//             </div>
//                      <div className="w-[1px] bg-gray-600"></div>


//             {/* Right side: Room information */}
//             <div className="w-1/3 p-4 text-white overflow-y-auto">
//                 <h2 className="text-xl font-bold mb-4">Room Information</h2>
//                 {roomInfo ? (
//                     <div className="bg-gray-800 rounded-lg p-4">
//                         <div className="mb-2">
//                             <p className="text-lg font-semibold">{roomInfo.username}</p>
//                             <p className="text-sm text-gray-400">{roomInfo.description}</p>
//                         </div>
//                         <div className="border-t border-gray-600 mt-2 pt-2">
//                             <p className="text-sm">
//                                 <strong>Tags:</strong> {roomInfo.tags.split(',').map((tag: string, index: number) => (
//                                     <span key={index} className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2">
//                                         {tag.trim()}
//                                     </span>
//                                 ))}
//                             </p>
//                         </div>

//                         <div className="m-5">
//                             <Link href={roomInfo.githubRepo} className="inline-block bg-blue-700 text-white-900 font-bold px-3 py-3 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">

//                                 GitHub

//                             </Link>
//                         </div>
//                     </div>
//                 ) : (
//                     <p>Loading room information...</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default VideoCallPage;





"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import useWebRTC from '@/app/webrtc/useWebRTC';
import Link from 'next/link';
import { FiMic, FiMicOff, FiVideo, FiVideoOff, FiPhoneOff } from 'react-icons/fi'; // Importing icons

const VideoCallPage = () => {
    const router = useRouter();
    const searchParams = new URLSearchParams(window.location.search);
    const roomId = searchParams.get('roomId') || '';

    const { startLocalStream, stopLocalStream, muteAudio, unmuteAudio, muteVideo, unmuteVideo, handleVideoCall, endCall, localVideoRef, remoteVideoRef, isCalling } = useWebRTC(roomId);

    const [roomInfo, setRoomInfo] = useState<any>(null);
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [isLocalVideoLarge, setIsLocalVideoLarge] = useState(true); // Default to large video

    useEffect(() => {
        const fetchRoomInfo = async () => {
            if (roomId) {
                try {
                    const response = await fetch(`/api/users/fetchroom`);
                    const rooms = await response.json();
                    const room = rooms.find((room: any) => room._id === roomId);
                    if (room) {
                        setRoomInfo(room);
                    }
                } catch (error) {
                    console.error('Failed to fetch room info:', error);
                }
            }
        };

        fetchRoomInfo();
    }, [roomId]);

    useEffect(() => {
        const startStreaming = async () => {
            if (roomId) {
                try {
                    const localStream = await startLocalStream();
                    if (localVideoRef.current && localStream) {
                        localVideoRef.current.srcObject = localStream;
                    }
                } catch (error) {
                    console.error('Failed to start local stream:', error);
                }
            }
        };
    
        startStreaming();
    
        return () => {
            stopLocalStream();
        };
    }, [roomId, startLocalStream, stopLocalStream]); // Removed localVideoRef from dependencies

    const handleEndCall = async () => {
        await endCall(); // Ensure the stream is stopped
        router.push('/yourroom'); // Redirect to yourroom page
    };

    const toggleAudio = () => {
        if (isAudioMuted) {
            unmuteAudio();
        } else {
            muteAudio();
        }
        setIsAudioMuted(!isAudioMuted);
    };

    const toggleVideo = () => {
        if (isVideoMuted) {
            unmuteVideo();
        } else {
            muteVideo();
        }
        setIsVideoMuted(!isVideoMuted);
    };

    const handleLocalVideoClick = () => {
        setIsLocalVideoLarge(!isLocalVideoLarge);
    };

    return (
        <div className="flex bg-black min-h-screen overflow-hidden container">
           
            <div className="w-2/3 flex flex-col justify-center items-center relative mr-8">
                <div className={`relative ${isLocalVideoLarge ? 'w-full h-full' : 'w-full h-full'} flex items-center justify-center`}>
                    <video 
                        ref={localVideoRef} 
                        className={`absolute ${isLocalVideoLarge ? 'w-full h-full' : 'w-[400px] h-[300px]'} cursor-pointer ${isVideoMuted ? 'hidden' : ''}`} 
                        autoPlay 
                        muted 
                        onClick={handleLocalVideoClick}
                    />
                    <video 
                        ref={remoteVideoRef} 
                        className={`absolute ${isLocalVideoLarge ? 'w-[400px] h-[300px] right-0 top-0' : 'w-full h-full'}`} 
                        autoPlay 
                    />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                        <button 
                            className={`bg-${isAudioMuted ? 'green' : 'red'}-500 text-white p-2 rounded-full`} 
                            onClick={toggleAudio}
                            title={isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
                        >
                            {isAudioMuted ? <FiMicOff size={30} /> : <FiMic size={30} />}
                        </button>
                        <button 
                            className={`bg-${isVideoMuted ? 'green' : 'red'}-500 text-white p-2 rounded-full`} 
                            onClick={toggleVideo}
                            title={isVideoMuted ? 'Unmute Video' : 'Mute Video'}
                        >
                            {isVideoMuted ? <FiVideoOff size={30} /> : <FiVideo size={30} />}
                        </button>
                        <button 
                            className="bg-red-500 text-white p-2 rounded-full" 
                            onClick={handleEndCall}
                            title="End Call"
                        >
                            <FiPhoneOff size={30} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-[1px] bg-gray-600"></div>

            {/* Right side: Room information */}
            <div className="w-1/3 p-4 text-white overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Room Information</h2>
                {roomInfo ? (
                    <div className="bg-gray-800 rounded-lg p-4">
                        <div className="mb-2">
                            <p className="text-lg font-semibold">{roomInfo.username}</p>
                            <p className="text-sm text-gray-400">{roomInfo.description}</p>
                        </div>
                        <div className="border-t border-gray-600 mt-2 pt-2">
                            <p className="text-sm">
                                <strong>Tags:</strong> {roomInfo.tags.split(',').map((tag: string, index: number) => (
                                    <span key={index} className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2">
                                        {tag.trim()}
                                    </span>
                                ))}
                            </p>
                        </div>

                        <div className="m-5">
                            <Link href={roomInfo.githubRepo} className="inline-block bg-blue-700 text-white-900 font-bold px-3 py-3 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                                GitHub
                            </Link>
                        </div>
                    </div>
                ) : (
                    <p>Loading room information...</p>
                )}
            </div>
        </div>
    );
};

export default VideoCallPage;
