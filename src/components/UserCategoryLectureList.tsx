import React from 'react';
import useLectureByCategoryAndUser from "../hooks/useLectureByCategoryAndUser";
import LectureListForMyLecture from "./LectureListForMyLecture";

interface UserCategoryLectureListProps {
    category: string;
    userId: string;
}

const UserCategoryLectureList: React.FC<UserCategoryLectureListProps> = ({category, userId}) => {
    const { data: lectures = [], mutate } = useLectureByCategoryAndUser(userId, category);

    return (
        <LectureListForMyLecture category={category} lectures={lectures} mutate={mutate}/>
    );
};

export default UserCategoryLectureList;
