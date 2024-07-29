
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Import your button component
import { Spotlight } from "../components/ui/Spotlight";
import Link from "next/link";
import RoomPage from "@/app/room/page";


const HeroPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center overflow-hidden">
      <Spotlight className="absolute top-10 left-0 md:left-0 md:top-0" fill="white" />
      <div className="mb-4 relative h-60 w-80">
        <Image
          src="/icon.png"
          alt="Icon"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />
      </div>
      <h1 className="text-5xl font-bold mb-2 text-white">
        Find other awesome <br /> devs to pair with online
      </h1>
      <p className="text-lg text-gray-100 mb-4 mt-3">
        This platform is for sharing your screen and working with other random
        <br />
        developers online so that you can work together.
      </p>
      <Link href="/room">
        <Button variant="secondary" className="mt-5 px-7 py-3 bg-purple-700 hover:bg-purple-500 font-bold text-lg">
          Get Started
        </Button>
      </Link>
    </div>
  );
};

export default HeroPage;
