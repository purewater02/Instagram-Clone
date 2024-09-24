import api from "./api";
import {LoginResponse} from "./types/LoginResponse";

export const getUserFromBack = async (idToken: string): Promise<LoginResponse> => {
    try {
        console.log("getUserFromBack")
        const response = await api.get<LoginResponse>("/users",
            {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });
        return response.data;
    } catch (error) {
        console.error("Error fetching userData: ", error);
        throw error;
    }
};

export const createUserInBack = async () => {
    try {
        // 계정 생성에 필요한 내용은 firebaseToken에서 가져올것임.
        console.log("createUserInBack")
        const response = await api.post("/users");
        return response.data;
    } catch (error) {
        console.error("Error creating user: ", error);
        throw error;
    }
}