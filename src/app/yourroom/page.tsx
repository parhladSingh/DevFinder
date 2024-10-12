"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Card from '@/components/card';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";

interface Room {
  _id: string;
  username: string;
  description: string;
  tags: string;
  githubRepo: string;
  linkedinprofile: string;
  creatorEmail: string;
}

const YourRoomPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const router = useRouter();
  const { user } = useAuth(); // Use AuthContext to get the user

  const handleGetStarted = () => {
    if (user) {
      // If the user is logged in, navigate to the browse page
      router.push("/createroom");
    } else {
      // If the user is not logged in, navigate to the signup page
      router.push("/signup");
    }
  };
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/api/users/fetchroom');
        const allRooms = response.data;

        if (user) {
          // Display rooms based on user role
          const filteredRooms = allRooms.filter((room: Room) => room.creatorEmail === user.email);
          setRooms(filteredRooms);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, [user]);

  const handleUpdate = (room: Room) => {
    const queryString = new URLSearchParams(room as any).toString();
    router.push(`/createroom?${queryString}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete('/api/users/deleteroom', {
        data: { id },
      });
      setRooms(prevRooms => prevRooms.filter(room => room._id !== id));
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const handleCreateRoom = () => {
    router.push('/createroom');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Flex container for title and button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Your Rooms</h2>
     
        <Button
      variant="secondary"
      className="mt-5 px-5 py-2 sm:px-6 sm:py-3 md:px-7 md:py-3 bg-purple-700 hover:bg-purple-500 font-bold text-base sm:text-lg"
      onClick={handleGetStarted} 
    >
      Create Your Room
    
    </Button>
      </div>

      {/* Content for displaying rooms */}
      {rooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-9 text-center">
          <img src="/minion.png" alt="No rooms" width={250} height={250} className="mb-4 mt-9" />
          <p className="text-2xl text-yellow-500 mb-4 mt-8">Start by creating your first room to collaborate and share ideas.</p>
        </div>
      ) : (
        <div className="room-cards flex flex-wrap justify-start gap-[120px] mt-[60px]">
          {rooms.map(room => (
            <Card
              key={room._id}
              _id={room._id}
              username={room.username}
              description={room.description}
              tags={room.tags}
              githubRepo={room.githubRepo}
              linkedinprofile={room.linkedinprofile}
              email={room.creatorEmail}
              onDelete={() => handleDelete(room._id)}
              onUpdate={() => handleUpdate(room)}
            />
          ))}
        </div>

      )}
    </div>

  );
};

export default YourRoomPage;
