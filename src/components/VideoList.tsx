import React from 'react';
import {Link} from "react-router-dom";
import useLectureByCategory from "../hooks/useLectureByCategory";

interface VideoListProps {
    category: string;
}

const VideoList:React.FC<VideoListProps> = ({category}) => {
    const {data: lectures = [] } = useLectureByCategory(category)

    return (
        <div className={"mb-4"}>
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <ul role="list" className="divide-y divide-gray-100">
                {lectures.map((lecture) => (
                    <li key={lecture.lecture_id} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                 src={lecture.thumbnail_url} alt=""/>
                            <div className="min-w-0 flex-auto">
                                <Link to={`/video/${lecture.lecture_id}`} state={lecture}>
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{lecture.title}</p>
                                </Link>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{lecture.description}</p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">{lecture.channel_name}</p>
                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                Published At: {lecture.published_date.toLocaleString().split("T")[0]}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VideoList;
