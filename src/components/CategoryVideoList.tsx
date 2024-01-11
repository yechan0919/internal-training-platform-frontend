import React from 'react';
import useLectureByCategory from "../hooks/useLectureByCategory";
import VideoList from "./VideoList";

interface CategoryVideoList {
    category: string
}

export const CategoryVideoList:React.FC<CategoryVideoList> = ({category}) => {
    const { data: lectures = [] } = useLectureByCategory(category);
    return (
        <VideoList category={category} lectures={lectures} />
    );
};

export default CategoryVideoList;
