import useSWR from "swr";
import Review from "../models/Review";
import fetcher from "../libs/fetcher";

const useLectureReviewList = (lectureId: number) => {
    const { data, error, isLoading, mutate} = useSWR<Review[]>(process.env.REACT_APP_API_URL + `/review/${lectureId}/lecture-reviews`, fetcher)
    return {
        data,
        error,
        isLoading,
        mutate,
    }
};

export default useLectureReviewList;
