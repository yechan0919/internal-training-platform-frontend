import React from 'react';
import useLectureByCategory from "../hooks/useLectureByCategory";
import LectureList from "./LectureList";

interface CategoryLectureListProp {
    category: string
}

export const CategoryLectureList:React.FC<CategoryLectureListProp> = ({category}) => {
    const { data: lectures = [] } = useLectureByCategory(category);
    return (
        <LectureList category={category} lectures={lectures} />
    );
};

export default CategoryLectureList;
