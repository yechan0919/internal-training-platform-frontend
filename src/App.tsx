import React from 'react';
import './App.css';
import VideoMenu from "./components/VideoMenu";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import VoiceChat from "./components/VoiceChat";
import VideoDetail from "./components/VideoDetail";



function App() {
  return (
    <>
        <Header/>
        <Routes>
            <Route path={"/"} element={<Home />}/>
            <Route path={"/video"} element={<VideoMenu />}/>
            <Route path={"/video/:videoId"} element={<VideoDetail />}/>
            <Route path={"/voice-chat"} element={<VoiceChat />}/>
        </Routes>
    </>
  );
}

export default App;
