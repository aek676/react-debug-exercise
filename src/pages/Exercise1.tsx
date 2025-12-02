import Footer from "@/components/Exercise1/Footer";
import LoginForm from "@/components/Exercise1/LoginForm";
import Navbar from "@/components/Exercise1/Navbar";
import { Star } from "lucide-react";
import { useState } from "react";

export default function Exercise1() {
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showCheckmark, setShowCheckmark] = useState(false);

    const handleLogin = () => {
        setShowLoginForm(false);
        setShowCheckmark(true);
    };

    const handleLogout = () => {
        setShowLoginForm(true);
        setShowCheckmark(false);
    }

    return (
        <div className="container mx-auto p-8 text-center">
            <Navbar handleLogout={handleLogout} />
            <div className={`${showLoginForm ? "" : "hidden"}`}>
                <LoginForm />
            </div>
            <div className={`${showCheckmark ? "text-center mt-90" : "hidden"}`}>
                <Star />
                <h2>Great Work!</h2>
            </div>
            <Footer />
        </div>
    );
}
