import { useState } from 'react';
import { Button } from '../ui/button';

interface NavbarProps {
  isLoginedIn: boolean;
  handleLogout: () => void;
}

export default function Navbar({ isLoginedIn, handleLogout }: NavbarProps) {
  const handleLogoutButton = () => {
    handleLogout();
  };

  return (
    <div className="bg-gray-400 color-[#333] h-20 p-5">
      <div className="flex justify-between">
        <div className="text-[1.8em]">Exercise 1</div>
        {isLoginedIn && (
          <Button
            className="color-[#333] border-gray-400"
            onClick={handleLogoutButton}
          >
            Sign Out
          </Button>
        )}
      </div>
    </div>
  );
}
