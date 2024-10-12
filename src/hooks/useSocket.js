import { useEffect, useState } from 'react';
import { getSocket, socketInitializedEmitter } from '@/lib/SocketProvider';

const useSocket = () => {
  const [socket, setSocket] = useState(getSocket());

  useEffect(() => {
    const handleSocketInitialized = () => {
      setSocket(getSocket());
    };

    // Listen for the socket_initialized event only if socket is not already available
    if (!socket) {
      socketInitializedEmitter.on('socket_initialized', handleSocketInitialized);
    }

    // Clean up listener on unmount or when socket is available
    return () => {
      socketInitializedEmitter.off('socket_initialized', handleSocketInitialized);
    };
  }, [socket]);

  return socket;
};

export default useSocket;
