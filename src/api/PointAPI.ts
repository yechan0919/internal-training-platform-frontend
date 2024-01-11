import axios from 'axios';

// Get access token whenever it's needed
const getAccessToken = () => localStorage.getItem('accessToken');

// Create a custom Axios instance for Point API
export const PointApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to fetch user points
export const fetchPoint = async (userId:string) => {
    const accessToken = getAccessToken();

    // Update headers with the current access token
    PointApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    const response = await PointApi.get(`/point/${userId}/user-point`);
    return response.data;
};

// Function to add points
export const addPoint = async (userId:string, topic:string) => {
    const accessToken = getAccessToken();

    // Update headers with the current access token
    PointApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    const requestData = {
        userId: userId,
        topic: topic,
    };

    const response = await PointApi.put(`/point/add-point`, requestData);
    return response.data;
};
