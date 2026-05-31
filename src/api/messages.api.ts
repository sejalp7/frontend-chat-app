import { apiAxiosClient } from "./client";

// API interceptor for error/response handling, authentication refresh, logging
apiAxiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

export interface Message {
    id: string;
    author: string;
    message: string;
    createdAt: string;
}

// API Call to get the messages
export const getMessages = async (nextMsg: string, limit: number): Promise<Message[]> => {
    const response = await apiAxiosClient.get<Message[]>('api/v1/messages', {
        params: { nextMsg, limit },
    });
    return response.data;
}


//API call to post the messages 
export const sendMessage = async (data: {
    message: string;
    author: string;
}) : Promise<Message> => {
    const response = await apiAxiosClient.post<Message>('api/v1/messages', data);
    return response.data;
}