import useSWR from "swr";
import fetcher from "../libs/fetcher";
import Lecture from "../models/Lecture";

const useAllLectureByLike = () => {
    const { data, error, isLoading, mutate} = useSWR<Lecture[]>(process.env.REACT_APP_API_URL + '/lecture/all-lectures-byLike', fetcher)
    return {
        data,
        error,
        isLoading,
        mutate,
    }
}

export default useAllLectureByLike
