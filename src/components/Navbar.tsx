"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext"; // Import your authentication context hook
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import useSocket from "@/hooks/useSocket";
import { MenuIcon } from "@heroicons/react/outline"; // Heroicons
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/outline";

interface Notification {
  opponentUserData: {
    username: string;
    email: string;
  };
  roomGithubRepo: string;
  roomId: string;
  roomCreatorLinkedinprofile?: string;
}

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth(); // Use your authentication context hook to get user info
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false); // Inside your component
  const [isNotificationBoxOpen, setIsNotificationBoxOpen] =
    useState<boolean>(false); // Inside your component
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // For handling scroll menu
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("new_notification", (data: any) => {
        setAllNotifications((prevNotifications) => [
          ...prevNotifications,
          {
            opponentUserData: data.opponentUserData,
            roomGithubRepo: data.roomGithubRepo,
            roomId: data.roomId,
            roomCreatorLinkedinprofile: data.roomCreatorLinkedinprofile,
          },
        ]);
      });
    }
  }, [socket]);

  return (
    <div className="w-full px-6 py-2 flex justify-between items-center bg-[#36454F]">
      <div className="flex items-center lg:justify-start sm:justify-start md:justify-start">
        <Link href="/" className="lg:block hidden">
          <Image
            src="/icon.png"
            alt="DevFinder"
            width={60}
            height={60}
            className=""
          />
        </Link>
        <Link href="/" className="w-full lg:w-auto lg:ml-0 sm:ml-0 md:ml-0">
          <p className="lg:text-3xl sm:text-2xl md:text-2xl font-bold text-white">
            DevFinder
          </p>
        </Link>
      </div>

      <div className="hidden md:flex items-center justify-center flex-1">
        {user && isAuthenticated && (
          <>
            <Link
              href="/room"
              className="mx-6 ml-[90px] text-white font-bold text-lg md:text-2xl hover:text-[#caa2e5]"
            >
              Browse
            </Link>
            <Link
              href="/yourroom"
              className="mx-6 text-white font-bold text-lg md:text-2xl hover:text-[#caa2e5]"
            >
              Your Room
            </Link>
          </>
        )}
      </div>

      {/* Small screen view - Scroll icon to show Browse and Your Room */}
      <div className="md:hidden flex items-center justify-center flex-1 ml-9 h-[26px] w-[28px]">
        {user && isAuthenticated && pathname === "/" && (
          <>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              {/* Toggle between Chevron icons */}
              {isMenuOpen ? (
                <ChevronDownIcon className="h-6 w-6 ml-15" aria-hidden="true" />
              ) : (
                <ChevronRightIcon
                  className="h-6 w-6 ml-15"
                  aria-hidden="true"
                />
              )}
            </button>
            {isMenuOpen && (
              <div className="absolute top-12  bg-gray-800 bg-opacity-50 p-4 rounded-md shadow-lg z-50">
                <Link
                  href="/room"
                  className="block mx-2 my-2 text-white font-bold text-lg hover:text-[#caa2e5]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Browse
                </Link>
                <Link
                  href="/yourroom"
                  className="block mx-2 my-2 text-white font-bold text-lg hover:text-[#caa2e5]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Your Room
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {/* Right side - Notification bell, Username, and Mode Toggle */}
      <div className="flex items-center space-x-4 relative">
        {user ? (
          <>
            <div className="relative">
              <button
                className="flex items-center"
                onClick={() => setIsNotificationBoxOpen(!isNotificationBoxOpen)}
              >
                <Image
                  src="/gold.png"
                  width={30} // Adjusted for responsiveness
                  height={30}
                  alt="Bell Icon"
                  className="ml-20 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" // Add margin to separate from menu icon
                />
                <sup className="font-bold text-sm sm:text-sm md:text-lg lg:text-xl text-[#FFD700] hover:text-[#FF6347]">
                  {allNotifications.length > 0 ? allNotifications.length : ""}
                </sup>
              </button>

              <div
                className={`absolute px-4 py-2 right-0 mt-2 w-64 sm:w-72 lg:w-96 bg-gray-800 bg-opacity-50 shadow-lg rounded-lg overflow-hidden z-10 ${
                  isNotificationBoxOpen ? "block" : "hidden"
                }`}
              >
                {allNotifications.map((notification, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-3 border-2"
                  >
                    <div className="text-white-200 text-[13px] sm:text-[12px] lg:text-[15px] text-center sm:text-left sm:mr-2">
                      {notification.opponentUserData.username} started a call
                    </div>
                    <Button
                      variant="secondary"
                      className="px-1 sm:px-2 bg-purple-700 hover:bg-purple-500 font-bold  mx-1 sm:mx-1"
                      onClick={async () => {
                        router.push(
                          `/videocall?roomId=${notification.roomId}&emailId=${notification.opponentUserData.email}`
                        );
                        setIsNotificationBoxOpen(false);
                        await new Promise((resolve) =>
                          setTimeout(resolve, 3000)
                        );
                        socket.emit("opponent_joined", {
                          email: notification.opponentUserData.email,
                        });
                      }}
                    >
                      Join
                    </Button>

                    <Button
                      variant="secondary"
                      className="px-1 sm:px-2 bg-purple-700 hover:bg-purple-500 font-bold mx-1 sm:mx-1"
                      onClick={() => {
                        console.log(
                          `Reject button clicked for: ${notification.opponentUserData.email}`
                        ); // Log the rejected email
                        socket.emit("opponent_rejected", {
                          email: notification.opponentUserData.email,
                        });
                        // Optionally, close the notification box if needed
                        setIsNotificationBoxOpen(false);
                      }}
                    >
                      Reject
                    </Button>

                    {notification.roomCreatorLinkedinprofile ? (
                      <Button
                        variant="secondary"
                        className="px-1 sm:px-2 bg-purple-700 hover:bg-purple-500 font-bold mx-1 sm:mx-1"
                      >
                        <a
                          href={notification.roomCreatorLinkedinprofile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white"
                        >
                          View
                        </a>
                      </Button>
                    ) : (
                      <span>No LinkedIn Profile Available</span>
                    )}
                  </div>
                ))}

                {allNotifications.length === 0 && (
                  <div className="flex justify-between text-white font-bold p-3 border-2">
                    No notifications yet
                  </div>
                )}
              </div>
            </div>

            <div className="relative">
              <button
                className="flex items-center"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="font-bold text-2xl text-white ml-8 hover:text-[#caa2e5]">
                  {user.username}
                </span>
              </button>
              {/* User dropdown */}
              <div
                className={`absolute right-0 mt-6 ml-6 w-48 text-white bg-gray-800 bg-opacity-90 shadow-lg rounded-lg overflow-hidden z-10 ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                <button
                  className="block px-4 py-2 text-base text-white font-bold bg-gray-800 bg-opacity-90 hover:bg-gray-700 w-full text-left"
                  onClick={logout}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </>
        ) : isAuthenticated ? (
          <Link href="/login">
            <Button variant="default">Logout</Button>
          </Link>
        ) : (
          <Link href="/signup">
            <Button variant="default">Sign Up</Button>
          </Link>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
