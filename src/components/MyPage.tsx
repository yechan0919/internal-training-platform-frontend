import React from 'react';
import {categories} from "../constants/Category";
import VideoList from "./VideoList";

const MyPage = () => {
    return (
        <section className="w-full">
            <main className="container mx-auto px-4 md:px-6 py-2">
                <section className="mb-8">
                    <h2 className="text-3xl font-bold mb-4">담은 영상</h2>
                    {categories.map((category) => (
                        //TODO userId 변경
                        <VideoList category={category} userId={'userId'}/>
                    ))}
                </section>
            </main>
        </section>
    );
};

export default MyPage;
