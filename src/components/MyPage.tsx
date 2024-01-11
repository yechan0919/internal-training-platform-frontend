import React from 'react';
import {categories} from "../constants/Category";
import UserCategoryVideoList from "./UserCategoryVideoList";

const MyPage = () => {
    return (
        <section className="w-full">
            <main className="container mx-auto px-4 md:px-6 py-2">
                <section className="mb-8">
                    <h2 className="text-3xl font-bold mb-10">내 강의실</h2>
                    {categories.map((category) => (
                        //TODO userId 변경
                        <UserCategoryVideoList category={category} userId={'abc'}/>
                    ))}
                </section>
            </main>
        </section>
    );
};

export default MyPage;
