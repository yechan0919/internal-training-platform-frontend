import axios from "axios";

/**
 * @description Axios 인스턴스를 생성
 * 목적 : axios 요청 시 header에 token을 보내기 위함
 */

const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

request.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken'); // Cookies를 이용해 accessToken을 가져옵니다.

        try {
            if (accessToken) {
                config.headers["Authorization"] = `Bearer ${accessToken}`;
            }
            return config;
        } catch (err) {
            console.error("[_axios.interceptors.request] config : " + err);
        }
        return config;
    },
    (error) => {
        // 요청 에러 직전 호출됩니다.
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response) => {
        console.log(response)
        //응답에 대한 로직
        return response;
    },
    (err) => {
        console.log(err.response.status)
        if (err.response.status === 403) {
            alert("권한이 만료되었거나, 없습니다.");
            localStorage.clear();

            window.location.href = '/';

            return err
        } else {
            return Promise.reject(err);
        }
    }
);

export default request;
