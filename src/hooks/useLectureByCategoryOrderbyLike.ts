import React from 'react';
import useSWR from "swr";
import Lecture from "../models/Lecture";
import fetcher from "../libs/fetcher";

const useLectureByCategoryOrderbyLike = (category: string) => {
    const { data, error, isLoading, mutate} = useSWR<Lecture[]>(process.env.REACT_APP_API_URL + `/lecture/${category}/topic-lectures-byLike`, fetcher)
    return {
        data,
        error,
        isLoading,
        mutate,
    }
};

export default useLectureByCategoryOrderbyLike;
