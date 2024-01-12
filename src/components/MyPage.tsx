import React from 'react';
import {categories} from "../constants/Category";
import UserCategoryLectureList from "./UserCategoryLectureList";
import {useAuthStore} from "../store/auth";
import UserPointStats from "./UserPointStats";

const MyPage = () => {
    const { user } = useAuthStore();
    return (
        <section className="w-full">
            <main className="container mx-auto px-4 md:px-6 py-2">
                <section className="mb-8">
                    

                    <h2 className="text-3xl font-bold mb-10">내 강의실</h2>
                    {categories.map((category) => (
                        user ? <UserCategoryLectureList key={category} category={category} userId={user.userId}/> : null
                    ))}

                    <div className={"flex items-center"}>
                        <UserPointStats/>
                        <div style={{
                            bottom: '2rem',
                            right: '2rem',
                            width: '260px',
                            height: '230px',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            padding: '1rem',
                            color: '#666666',
                            textAlign: 'center',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
                        }}>
                            <span className="font-bold text-lg">Level</span>
                            <span className="block mt-3">5 포인트 미만 <span
                                className="font-bold text-lg text-green-400 ml-3">lv.0</span> </span>
                            <span className="block mt-3">5 포인트 이상 <span
                                className="font-bold text-lg text-yellow-500 ml-3">lv.1</span> </span>
                            <span className="block mt-3">10 포인트 이상 <span
                                className="font-bold text-lg text-orange-500 ml-3">lv.2</span> </span>
                            <span className="block mt-3">15 포인트 이상 <span
                                className="font-bold text-lg text-red-600 ml-3">lv.3</span></span>
                        </div>
                    </div>
                </section>
            </main>
        </section>
    );
};

export default MyPage;


