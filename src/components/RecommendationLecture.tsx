import React from 'react';
import useLectureByCategoryOrderbyLike from "../hooks/useLectureByCategoryOrderbyLike";
import {Link} from "react-router-dom";

interface CategoryLectureProps {
    category: string;
}

const RecommendationLecture:React.FC<CategoryLectureProps> = ({ category }) => {
    const {data: lectures = []} = useLectureByCategoryOrderbyLike(category)
    return (
        <>
            {lectures.length > 0 && (
                <div className={"flex justify-center mx-20"}>
                    <div style={{marginRight:"2vw"}}>
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
                        <Link className="text-xl font-bold mb-2" to={`/video/${lectures[0].lecture_id}`} state={lectures[0]}>
                            {lectures[0].title}
                        </Link>
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
    );
};

export default RecommendationLecture;
