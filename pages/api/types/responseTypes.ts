interface LoginResponse {
    uid: string;
    email: string;
    name: string;
    photoURL: string;
    signInProvider: string;
    caption: string;
}

interface ImageUploadResponse {
    urls: string[];
}

export type {LoginResponse, ImageUploadResponse};