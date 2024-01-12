import React from 'react';
import useLectureByCategoryAndUser from "../hooks/useLectureByCategoryAndUser";
import VideoList from "./VideoList";

interface UserCategoryVideoListProps {
    category: string;
    userId: string;
}

const UserCategoryVideoList: React.FC<UserCategoryVideoListProps> = ({category, userId}) => {
    const { data: lectures = [] } = useLectureByCategoryAndUser(userId, category);
    return (
        <>
            <VideoList category={category} lectures={lectures}/>
        </>
    );
};

export default UserCategoryVideoList;
