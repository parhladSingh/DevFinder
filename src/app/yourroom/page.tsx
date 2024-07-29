"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Card from '@/components/card';
import { useAuth } from '@/context/AuthContext';


interface Room {
  _id: string;
  username: string;
  description: string;
  tags: string;
  githubRepo: string;
  linkedinProfile: string;
  creatorEmail: string;
}

const YourRoomPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const router = useRouter();
  const { user } = useAuth(); // Use AuthContext to get the user

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

  return (
    <div className="your-room-page">
      <h2 className='text-white font-bold text-4xl mt-5 container'>Your Rooms</h2>
      <div className="room-cards mt-9 ml-4 container flex flex-wrap gap-4">
        {rooms.map(room => (
          <Card
            key={room._id}
            _id={room._id}
            username={room.username}
            description={room.description}
            tags={room.tags}
            githubRepo={room.githubRepo}
            linkedinProfile={room.linkedinProfile}
            email={room.creatorEmail} // Pass the email here
            onDelete={() => handleDelete(room._id)}
            onUpdate={() => handleUpdate(room)}
          />
        ))}
      </div>
    </div>
  );
};

export default YourRoomPage;
