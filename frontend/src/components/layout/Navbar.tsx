import { useState } from "react";

export const Navbar = () => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state

    return (
        <nav className="shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold leading-tight bg-[#154313] bg-clip-text text-transparent">
                    Aai's <br /> Kitchen
                </h1>
                <ul className="flex items-center text-black gap-28 font-medium">
                    <li><a href="#" className="hover:text-yellow-400">Home</a></li>
                    <li><a href="#" className="hover:text-yellow-400">Menu</a></li>
                    <li><a href="#" className="hover:text-yellow-400">About</a></li>
                    <li><a href="#" className="hover:text-yellow-400">Contact</a></li>
                    
                </ul>

                {/* Right side: Auth/Profile */}
                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        // Profile button and dropdown
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="w-10 h-10 rounded-full bg-[#154313] text-white font-bold flex items-center justify-center hover:scale-105 transition-transform"
                            >
                                S
                            </button>
                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-40 bg-white text-black  rounded-md shadow-lg z-10">
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">View Profile</a>
                                    <button
                                        onClick={() => {
                                            setIsLoggedIn(false);
                                            setShowProfileMenu(false);
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Sign In & Sign Up buttons
                        <>
                            <a
                                href="/signin"
                                className="px-2 py-1 rounded-2xl text-black font-bold border border-[#154313] text-[#154313] transition hover:border-green-700"
                            >
                                Log In
                            </a>

                            <a
                                href="/signup"
                                className="px-2 py-1 rounded-2xl bg-[#154313] font-bold text-white   rounded hover:bg-[#1e5a1f] transition"
                            >
                                Sign Up
                            </a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
