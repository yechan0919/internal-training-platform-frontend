import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import YoutubeClient, {VideoItem} from "../service/youtube";

interface VideoListProps {
    category: string;
}

const VideoList:React.FC<VideoListProps> = ({category}) => {
    const [videos, setVideos] = useState<VideoItem[]>([]);

    useEffect(() => {
        YoutubeClient
            .search(category, 3) //
            .then((videos: VideoItem[]) => setVideos(videos));
    }, [category]);

    return (
        <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {videos.map((video) => (
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
                        <h3 className="text-xl font-bold mb-2 mt-4">{video.snippet.title}</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 break-all">
                            {video.snippet.description}
                        </p>
                        <Link className="text-blue-500 hover:text-blue-700 mt-4" to={`https://www.youtube.com/embed/${video.id}`}>
                            Learn More
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default VideoList;
