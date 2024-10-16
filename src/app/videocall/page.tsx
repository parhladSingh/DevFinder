"use client"; 
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
