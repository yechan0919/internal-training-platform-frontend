import React from 'react';
import useSWR from "swr";
import fetcher from "../libs/fetcher";
import Lecture from "../models/Lecture";

const useLectureByCategory = (category: string) => {
    const { data, error, isLoading, mutate} = useSWR<Lecture[]>(process.env.REACT_APP_API_URL + `/lecture/${category}/topic-lectures`, fetcher)
    return {
        data,
        error,
        isLoading,
        mutate,
    }
};

export default useLectureByCategory;
