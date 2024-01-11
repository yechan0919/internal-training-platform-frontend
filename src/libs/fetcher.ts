import axios from 'axios';

const fetcher = (url: string) => axios.get(url,{
    headers : {
        Authorization : `Bearer ${localStorage.getItem('accessToken')}`
    }
}).then(res => res.data);

export default fetcher;
