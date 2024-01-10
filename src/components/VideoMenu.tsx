import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import VideoList from "./VideoList";
import useAllLectureByLike from "../hooks/useAllLecturesOrderbyLike";
import Carousel from "react-material-ui-carousel";
import useLectureByLectureOrderbyLike from "../hooks/useLectureByLectureOrderbyLike";
import UseLectureByLectureOrderbyLike from "../hooks/useLectureByLectureOrderbyLike";

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
    // const {data: lectures = []} = useAllLectureByLike()

    return (
        <section className="w-full">
            <main className="container mx-auto px-4 md:px-6 py-2">
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">추천 영상</h2>
                    <div className="grid grid-cols-1">
                        <Carousel cycleNavigation={true} navButtonsAlwaysVisible={true}>
                            {categories.map(category => {
                                const {data: lectures = []} = UseLectureByLectureOrderbyLike(category)
                                return (
                                    <>
                                        {lectures.length > 0 && (
                                            <div className={"flex justify-center mx-20"}>
                                                <div>
                                                    <Link to={lectures[0].video_link}>
                                                        <img
                                                            alt="Thumbnail"
                                                            className="w-full h-80 object-cover object-center rounded-lg"
                                                            src={lectures[0].thumbnail_url}
                                                            style={{
                                                                aspectRatio: "600/400",
                                                                objectFit: "contain",
                                                            }}
                                                            width="600"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="flex flex-col justify-center w-1/2">
                                                    <h3 className="text-2xl font-bold mb-2">{category}</h3>
                                                    <h3 className="text-xl font-bold mb-2">{lectures[0].title}</h3>
                                                    <p className="text-zinc-500 dark:text-zinc-400">
                                                        {lectures[0].description}
                                                    </p>
                                                    <Link className="text-blue-500 hover:text-blue-700 mt-4"
                                                          to={`/video/${lectures[0].lecture_id}`} state={lectures[0]}>
                                                        Learn More
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )
                            })}
                        </Carousel>
                    </div>
                </section>
                {categories.map((category) => (
                    <VideoList category={category}/>
                ))}
            </main>
        </section>
    );
}


export default VideoMenu;
