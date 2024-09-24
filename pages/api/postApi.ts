import api from "./api";

export const createPost = async (formData: FormData) => {
    try {
        const response = await api.post("/posts", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
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