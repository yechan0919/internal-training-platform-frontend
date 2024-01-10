import React from 'react';
import {useLocation} from "react-router-dom";
import Lecture from "../models/Lecture";
import YouTube from 'react-youtube';
import { GrChannel } from "react-icons/gr";



const VideoDetail = () => {
    const location = useLocation()
    const lecture = location.state as Lecture
    const lastSlashIndex = lecture.video_link.lastIndexOf('/');
    const questionMarkIndex = lecture.video_link.indexOf('?');

    return (
        <>
            <div className="w-full bg-[#002333]">
                <div className="container mx-auto px-4 md:px-6 py-8 flex gap-20">
                    <div className={"mb-10 w-2/3"}>
                        <YouTube
                            videoId={lecture.video_link.substring(lastSlashIndex + 1, questionMarkIndex)}
                            opts={{
                                width: "100%",
                                height: "400vh",
                                playerVars: {
                                    autoplay: 1, //자동재생 O
                                    rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                                    modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
                                },
                            }}
                            onEnd={(e) => {
                                e.target.stopVideo(0);
                            }}
                        />
                    </div>
                    <div className={"my-auto"}>
                        <p className={"text-xl text-white mb-2"}>{lecture.topic}</p>
                        <p className="text-3xl font-bold mb-4 text-white">{lecture.title}</p>
                        <p className={"text-white "}>{lecture.description}</p>
                        <p className={"text-white "}>{lecture.published_date.toLocaleString()}</p>
                        <div className={"text-white pt-10 flex space-x-2 items-center"}>
                            <GrChannel/>
                            <p className={" "}>{lecture.channel_name}</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="container mx-auto px-4 md:px-6 py-8 flex border-b border-gray-800">
                <p className={"font-bold text-2xl"}>VIEW</p>
            </div>
        </>

    );
};

export default VideoDetail;
