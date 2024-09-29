interface CreatePostRequest {
    images: string[];
    caption: string;
}

interface CreateCommentRequest {
    comment: string;
}

export type { CreatePostRequest, CreateCommentRequest };