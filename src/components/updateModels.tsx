import React, { useState } from 'react';

interface Room {
  _id: string;
  username: string;
  description: string;
  githubRepo: string;
  linkedinProfile: string;
  tags: string;
}

interface UpdateModalProps {
  room: Room;
  onClose: () => void;
  onSave: (updatedRoom: Room) => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ room, onClose, onSave }) => {
  const [updatedRoom, setUpdatedRoom] = useState<Room>(room);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedRoom((prevRoom) => ({ ...prevRoom, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(updatedRoom);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <input name="username" value={updatedRoom.username} onChange={handleChange} placeholder="Username" />
          <input name="description" value={updatedRoom.description} onChange={handleChange} placeholder="Description" />
          <input name="githubRepo" value={updatedRoom.githubRepo} onChange={handleChange} placeholder="GitHub Repo" />
          <input name="linkedinProfile" value={updatedRoom.linkedinProfile} onChange={handleChange} placeholder="LinkedIn Profile" />
          <input name="tags" value={updatedRoom.tags} onChange={handleChange} placeholder="Tags" />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
