import api from "./api";
import {ImageUploadResponse} from "./types/responseTypes";
import {CreatePostRequest} from "./types/requestTypes";

export const uploadImages = async (formData: FormData): Promise<ImageUploadResponse> => {
    try {
        const response = await api.post("/images", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading images: ", error);
        throw error;
    }
}

export const createPost = async (requestBody: CreatePostRequest) => {
    try {
        const response = await api.post("/posts", requestBody);
        return response.data;
    } catch (error) {
        console.error("Error creating post: ", error);
        throw error;
    }
};

export const fetchPosts = async () => {
    try {
        const response = await api.get("/posts");
        return response.data;
    } catch (error) {
        console.error("Error fetching posts: ", error);
        throw error;
    }
}