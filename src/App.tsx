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
import PrivateRoute from "./PrivateRouter";

function App() {
  return (
    <>
        <Header/>
        <Routes>
            <Route path={"/"} element={<Home />}/>
            <Route path={"/register"} element= { <Register/>} />
            <Route path={"/login"} element= { <Login/>} />

            <Route element={<PrivateRoute authentication={true}/>}>
                <Route path={"/lecture"} element={<LectureMenu />}/>
                <Route path={"/quiz"} element={<Quiz />}/>
                <Route path={"/lecture/:lectureId"} element={<LectureDetail />}/>
                <Route path={"/voice-chat"} element={<VoiceChat />}/>
                <Route path={"/my-page"} element={<MyPage />}/>
            </Route>
        </Routes>
    </>
  );
}

export default App;
