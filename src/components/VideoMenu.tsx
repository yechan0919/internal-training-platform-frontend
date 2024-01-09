import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import VideoList from "./VideoList";
import YoutubeClient, {VideoItem} from "../service/youtube";

interface VideoMenuProps {
}

const categories = [
    '언어',
    '생산기술',
    '재무',
    '마케팅',
    'it'
]

const VideoMenu:React.FC<VideoMenuProps> = () => {
    const [videos, setVideos] = useState<VideoItem[]>([]);

    useEffect(() => {
        YoutubeClient
            .mostPopular(1) //
            .then((videos) => setVideos(videos));
    }, []);

    return (
        <div className={"pt-14"}>
            <section className="w-full ">
                <main className="container mx-auto px-4 md:px-6 py-8">
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">추천 영상</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {videos.map((video) => (
                                <>
                                    <div>
                                        <Link to={`https://www.youtube.com/embed/${video.id}`}>
                                            <img
                                                alt="Thumbnail"
                                                className="w-full h-64 object-cover object-center rounded-lg"
                                                height="400"
                                                src={video.snippet.thumbnails.default.url}
                                                style={{
                                                    aspectRatio: "600/400",
                                                    objectFit: "cover",
                                                }}
                                                width="600"
                                            />
                                        </Link>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-xl font-bold mb-2">{video.snippet.title}</h3>
                                        <p className="text-zinc-500 dark:text-zinc-400">
                                            {video.snippet.description}
                                        </p>
                                        <Link className="text-blue-500 hover:text-blue-700 mt-4"
                                              to={`https://www.youtube.com/embed/${video.id}`}>
                                            Learn More
                                        </Link>
                                    </div>
                                </>
                            ))}
                        </div>
                    </section>
                    {categories.map((category) => (
                        <VideoList category={category}/>
                    ))}
                </main>
            </section>
        </div>
    );
}


export default VideoMenu;
