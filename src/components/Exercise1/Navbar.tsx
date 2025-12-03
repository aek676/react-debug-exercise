import { useState } from "react";
import { Button } from "../ui/button";

interface NavbarProps {
    handleLogout: () => void;
}

export default function Navbar({ handleLogout }: NavbarProps) {
    const [showLogoutButton, setShowLogoutButton] = useState(false);

    const handleLogoutButton = () => {
        setShowLogoutButton(!showLogoutButton);
    }

    return (
        <div className="bg-gray-400 color-[#333] h-20 p-5">
            <div className="flex justify-between">
                <div className="text-[1.8em]">Exercise 1</div>
                {showLogoutButton && (
                    <Button className="color-[#333] border-gray-400" onClick={handleLogout}>
                        Sign Out
                    </Button>
                )}
            </div>
        </div>
    )
};
