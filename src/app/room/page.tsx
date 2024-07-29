"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import Card from '@/components/card';

interface Room {
  _id: string;
  username: string;
  description: string;
  tags: string;
  githubRepo: string;
  linkedinProfile: string;
  creatorEmail: string;
}

const RoomPage = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/api/users/fetchroom');
        const allRooms = response.data;

        // Filter out rooms created by the logged-in user
        const otherRooms = allRooms.filter((room: Room) => room.creatorEmail !== user?.email);
        setRooms(otherRooms);
        setFilteredRooms(otherRooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, [user]);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredRooms(rooms);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = rooms.filter((room) =>
        room.username.toLowerCase().includes(lowerCaseQuery) ||
        room.tags.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredRooms(filtered);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 flex flex-col items-start space-y-6">
        <h1 className="text-3xl font-bold">Find DevRooms</h1>

        <div className="w-full flex flex-row items-center justify-between">
          <div className="w-1/2 flex flex-row items-center space-x-2">
            <input
              type="text"
              placeholder="Filter room by keywords such as TypeScript, Next.js, Python"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-md font-bold text-white"
            />
            <Button variant="default" className="px-8 py-2 font-bold text-xl" onClick={handleSearch}>Search</Button>
          </div>
          <Link href="/createroom">
            <Button variant="secondary" className="bg-purple-700 hover:bg-purple-500 px-6 py-6 font-bold text-xl">Create Room</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-4 mt-8">
        {filteredRooms.length === 0 ? (
          <>
            <img src="/no-data.png" alt="Room Illustration" className="w-60 h-60 object-contain" />
            <h1 className="font-bold text-white text-xl">No room Yet</h1>
            <Link href="/createroom">
              <Button variant="secondary" className="bg-purple-700 hover:bg-purple-500 px-6 py-6 font-bold text-lg">Create Room</Button>
            </Link>
          </>
        ) : (
          <div className="room-cards mt-9 ml-4 container flex flex-wrap gap-4">
            {filteredRooms.map(room => (
              <Card
                key={room._id}
                _id={room._id}
                username={room.username}
                description={room.description}
                tags={room.tags}
                githubRepo={room.githubRepo}
                linkedinProfile={room.linkedinProfile}
                email={room.creatorEmail}
                onDelete={async () => { }} 
                onUpdate={() => { }} 
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default RoomPage;


