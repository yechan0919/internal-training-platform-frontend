import React from 'react';
import {Link} from "react-router-dom";
import chatGPTIcon from '../assets/icon/icons8-chatgpt-90.png'

const Header = () => {
    return (
        <header className="bg-white text-zinc-900 py-4 border-b">
            <div className="container mx-auto px-4 md:px-6">
                <nav className="flex items-center justify-between">
                    <div className="text-2xl font-bold">Internal Training Platform</div>
                    <div className="flex items-center space-x-4">
                        <Link className="text-zinc-900 hover:text-zinc-700" to="/">
                            Home
                        </Link>
                        <Link className="text-zinc-900 hover:text-zinc-700" to={"/video"}>
                            Video
                        </Link>
                        <Link className="text-zinc-900 hover:text-zinc-700" to={"/voice-chat"}>
                            <img src={chatGPTIcon} alt="ChatGPT" className="w-6 h-6"/>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
