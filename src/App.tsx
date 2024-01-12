import React from 'react';
import './App.css';
import LectureMenu from "./components/LectureMenu";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import VoiceChat from "./components/VoiceChat";
import LectureDetail from "./components/LectureDetail";
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
            <Route path={"/lecture"} element={<LectureMenu />}/>
            <Route path={"/lecture/:lectureId"} element={<LectureDetail />}/>
            <Route path={"/voice-chat"} element={<VoiceChat />}/>
            <Route path={"/quiz"} element={<Quiz />}/>
            <Route path={"/my-page"} element={<MyPage />}/>
            <Route path={"/register"} element= { <Register/>} />
            <Route path={"/login"} element= { <Login/>} />
        </Routes>
    </>
  );
}

export default App;
