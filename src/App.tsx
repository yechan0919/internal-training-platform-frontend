import React from 'react';
import './App.css';
import VideoMenu from "./components/VideoMenu";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import VoiceChat from "./components/VoiceChat";
import VideoDetail from "./components/VideoDetail";
import Login from "./components/Login";
import Register from "./components/Register";

import Quiz from "./components/Quiz";
import MyPage from "./components/MyPage";


function App() {
  return (
    <>
        <Header/>
        <Routes>
            <Route path={"/"} element={<Home />}/>
            <Route path={"/video"} element={<VideoMenu />}/>
            <Route path={"/video/:videoId"} element={<VideoDetail />}/>
            <Route path={"/voice-chat"} element={<VoiceChat />}/>
            <Route path={"/quiz"} element={<Quiz />}/>
            <Route path={"/user/:userId"} element={<MyPage />}/>
            <Route path={"/register"} element= { <Register/>} />
            <Route path={"/login"} element= { <Login/>} />
        </Routes>
    </>
  );
}

export default App;
