import React from 'react';
import Carousel from "react-material-ui-carousel";
import {categories} from "../constants/Category";
import RecommendationLecture from "./RecommendationLecture";
import CategoryLectureList from "./CategoryLectureList";


const LectureMenu = () => {
    return (
        <section className="w-full">
            <main className="container mx-auto px-4 md:px-6 py-2">
                <section className="mb-8">
                    <h2 className="text-3xl font-bold mb-4">추천 영상</h2>
                    <div className="grid grid-cols-1">
                        <Carousel cycleNavigation={true} navButtonsAlwaysVisible={true}>
                            {categories.map(category => (
                                <RecommendationLecture category={category} key={category} />
                            ))}
                        </Carousel>
                    </div>
                </section>
                {categories.map((category) => (
                    <CategoryLectureList category={category} key={category}/>
                ))}
            </main>
        </section>
    );
}


export default LectureMenu;
