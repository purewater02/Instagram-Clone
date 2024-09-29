import api from "./api";
import {ImageUploadResponse} from "./types/responseTypes";
import {CreateCommentRequest, CreatePostRequest} from "./types/requestTypes";

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

export const fetchPosts = async (page: number, size: number) => {
    try {
        const response = await api.get(`/posts?page=${page}&size=${size}`);
        console.log("fetchPosts: ", response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching posts: ", error);
        throw error;
    }
}

export const fetchPublicPosts = async (page: number, size: number) => {
    try {
        const response = await api.get(`/posts/public?page=${page}&size=${size}`);
        console.log("fetchPublicPosts: ", response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching public posts: ", error);
        throw error;
    }
}

export const createComment = async (requestBody: CreateCommentRequest) => {
    try {
        const response = await api.post("/comments", requestBody);
        return response.data;
    } catch (error) {
        console.error("Error creating comment: ", error);
        throw error;
    }
}

export const fetchPostLikes = async (postId: number) => {
    try {
        const response = await api.get(`/posts/public/${postId}/likes`);
        return response.data;
    } catch (error) {
        console.error("Error fetching post likes: ", error);
        throw error;
    }
}

export const dislikePost = async (postId: number) => {
    try {
        const response = await api.delete(`/posts/${postId}/likes`);
        return response.data;
    } catch (error) {
        console.error("Error disliking post: ", error);
        throw error;
    }
}

export const likePost = async (postId: number) => {
    try {
        const response = await api.post(`/posts/${postId}/likes`);
        return response.data;
    } catch (error) {
        console.error("Error liking post: ", error);
        throw error;
    }
}

export const fetchPostComments = async (postId: number, page: number, size: number) => {
    try {
        const response = await api.get(`/posts/public/${postId}/comments?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching post comments: ", error);
        throw error;
    }
}