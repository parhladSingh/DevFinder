
"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // Import your authentication context hook
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth(); // Use your authentication context hook to get user info
  const [isOpen, setIsOpen] = useState<boolean>(false);  // Inside your component
  const pathname = usePathname(); // Get the current pathname
  return (
    <div className="container mx-auto px-4 py-2 flex justify-between items-center bg-gray-500">
      <div className="flex items-center">
     <Link href="/">
        <div className="h-15 w-14 relative">
        
          <Image
            src="/icon.png"
            alt="Icon"
            layout="fixed"
            width={56}  // Adjust width to match w-14 class
            height={60} // Adjust height to match h-15 class
            style={{
              objectFit: 'cover',
            }}
            
          />
         
        </div>
        </Link>
        <Link href="/">
        <p className="text-xl font-bold" >DevFinder</p>
        </Link>
      </div>
      <div className="flex items-center justify-center flex-1">
        {user && isAuthenticated && pathname === "/" && (
          <>
            <Link href="/room" className="mx-4 text-black font-bold text-2xl border border-2px-black">
              Browse
            </Link>
            <Link href="/yourroom" className="mx-4 text-black font-bold text-2xl">
              Your Room
            </Link>
          </>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="relative">
            <button className="flex items-center" onClick={() => setIsOpen(!isOpen)}>
              <span className="font-bold text-xl text-gray-800 ml-8">{user.username}</span>
            </button>
            <div className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-10 ${isOpen ? "block" : "hidden"}`}>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={logout}
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          isAuthenticated ? (
            <Link href="/login">
              <Button variant="default">Logout</Button>
            </Link>
          ) : (
            <Link href="/signup">
              <Button variant="default">Sign Up</Button>
            </Link>
          )
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;