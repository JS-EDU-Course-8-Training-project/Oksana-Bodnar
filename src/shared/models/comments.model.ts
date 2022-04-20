import { Author } from "./author.model";

export interface Comments {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: Author;
}