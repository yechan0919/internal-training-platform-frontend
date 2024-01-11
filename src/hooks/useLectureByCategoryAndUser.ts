import useSWR from "swr";
import Lecture from "../models/Lecture";
import fetcher from "../libs/fetcher";

const useLectureByCategoryAndUser = (userId:string, category: string) => {
    const { data, error, isLoading, mutate} = useSWR<Lecture[]>(process.env.REACT_APP_API_URL + `/lecture/${userId}/${category}/user-topic-lectures`, fetcher)
    return {
        data,
        error,
        isLoading,
        mutate,
    }
};

export default useLectureByCategoryAndUser;
