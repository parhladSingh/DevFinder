"use client"
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"; 
import { Spotlight } from "../components/ui/Spotlight";
import { useAuth } from "@/context/AuthContext"; 
import { useRouter } from "next/navigation"; 

const HeroPage = () => {
  const { user } = useAuth(); 
  const router = useRouter(); // Router for navigation

  const handleGetStarted = () => {
    if (user) {
      // If the user is logged in, navigate to the browse page
      router.push("/room");
    } else {
      // If the user is not logged in, navigate to the signup page
      router.push("/signup");
    }
  };

  return (
    <div className="container mx-auto px-4 mt-20 py-8 pt-1 flex flex-col items-center justify-center text-center overflow-hidden">
    <Spotlight className="absolute top-10 left-0 sm:left-5 md:left-10 lg:left-20 xl:left-24 md:top-5" fill="white" />
    
    <div className="mb-2">
      <Image
        src="/icon.png"
        priority
        alt="Icon"
        width={180}
        height={135} 
        style={{ width: "100%", height: "auto" }} 
      />
    </div>
  
    <h1 className="text-5xl sm:text-xl md:text-xl lg:text-5xl  font-bold mb-2">
      Find other awesome <br /> devs to pair with online
    </h1>
  
    <p className="text-xl sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4 mt-3">
      This platform is for sharing your screen and working with other random
      <br />
      developers online so that you can work together.
    </p>
  
    <Button
      variant="secondary"
      className="mt-5 px-5 py-2 sm:px-6 sm:py-3 md:px-7 md:py-3 bg-purple-700 hover:bg-purple-500 font-bold text-base sm:text-lg"
      onClick={handleGetStarted} 
    >
      Get Started
    </Button>
  </div>
  
  );
};

export default HeroPage;
