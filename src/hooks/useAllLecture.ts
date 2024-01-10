import useSWR from "swr";
import fetcher from "../libs/fetcher";
import Lecture from "../models/Lecture";

const useAllLecture = () => {
    const { data, error, isLoading, mutate} = useSWR<Lecture[]>(process.env.REACT_APP_API_URL + '/lecture/all-lectures', fetcher)
    return {
        data,
        error,
        isLoading,
        mutate,
    }
}

export default useAllLecture
