import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface VideoItem {
    id: string;
    snippet: {
        title: string;
        description: string;
        channelTitle: string;
        publishedAt: Date;
        thumbnails: {
            default: {
                url: string;
            };
        };
    };
}

class Youtube {
    private youtube: AxiosInstance;

    constructor(httpClient: AxiosInstance) {
        this.youtube = httpClient;
    }

    async mostPopular(maxResult: number): Promise<VideoItem[]> {
        const response: AxiosResponse = await this.youtube.get('videos', {
            params: {
                part: 'snippet',
                chart: 'mostPopular',
                maxResults: maxResult,
            },
        });

        return response.data.items as VideoItem[];
    }

    async search(query: string, maxResult: number): Promise<VideoItem[]> {
        const response: AxiosResponse = await this.youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: maxResult,
                type: 'video',
                q: query,
            },
        });

        return response.data.items.map((item: any) => ({
            id: item.id.videoId,
            snippet: item.snippet,
        })) as VideoItem[];
    }
}


const YoutubeClient = new Youtube(axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {key: process.env.REACT_APP_YOUTUBE_API_KEY}
}));

export default YoutubeClient;
