import axios from "axios";

let ACCESS_TOKEN = localStorage.getItem('accessToken');

/** CREATE CUSTOM AXIOS INSTANCE */
export const UserApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
    },
});

export const fetchUser = async () => {
    const response = await UserApi.get(`/user/info`);
    return response.data;
}
