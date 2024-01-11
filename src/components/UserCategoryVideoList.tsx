import React from 'react';
import useLectureByCategoryAndUser from "../hooks/useLectureByCategoryAndUser";
import VideoListForMyLecture from "./VideoListForMyLecture";

interface UserCategoryVideoListProps {
    category: string;
    userId: string;
}

const UserCategoryVideoList: React.FC<UserCategoryVideoListProps> = ({category, userId}) => {
    const { data: lectures = [], mutate } = useLectureByCategoryAndUser(userId, category);

    const handleDeleteLecture = (lectureId: number) => {

        mutate();
      };

    return (
        <VideoListForMyLecture category={category} lectures={lectures} onDeleteLecture={handleDeleteLecture}/>
    );
};

export default UserCategoryVideoList;
