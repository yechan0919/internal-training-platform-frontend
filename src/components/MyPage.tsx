import React from 'react';
import {categories} from "../constants/Category";
import UserCategoryVideoList from "./UserCategoryVideoList";
import {useAuthStore} from "../store/auth";

const MyPage = () => {
    const { user } = useAuthStore();
    return (
        <section className="w-full">
            <main className="container mx-auto px-4 md:px-6 py-2">
                <section className="mb-8">
                    <h2 className="text-3xl font-bold mb-4">내 강의실</h2>
                    {categories.map((category) => (
                        user ? <UserCategoryVideoList key={category} category={category} userId={user.userId}/> : null
                    ))}
                </section>
            </main>
        </section>
    );
};

export default MyPage;
