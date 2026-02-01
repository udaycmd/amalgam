import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export type Board = {
    id: string;
    name: string;
    description: string;
    nsfw: boolean;
};

export type Post = {
    id: string;
    threadId: string;
    author: string;
    time: string;
    content: string;
    imageUrl?: string;
    isOp?: boolean;
};

export type Thread = {
    id: string;
    boardId: string;
    subject: string;
    posts: Post[];
    replyCount: number;
    imageUrl?: string;
    lastSimplifiedTime: string; // e.g., "5m ago"
};

export const BOARDS: Board[] = [
    { id: "g", name: "Technology", description: "Technology & Software", nsfw: false },
    { id: "v", name: "Video Games", description: "Video Games", nsfw: false },
    { id: "a", name: "Anime & Manga", description: "Anime & Manga", nsfw: false },
    { id: "p", name: "Photography", description: "Photography", nsfw: false },
    { id: "ck", name: "Food & Cooking", description: "Food & Cooking", nsfw: false },
    { id: "fit", name: "Fitness", description: "Health & Fitness", nsfw: false },
];

export const MOCK_THREADS: Thread[] = [
    {
        id: "1001",
        boardId: "g",
        subject: "Desktop Thread",
        replyCount: 42,
        imageUrl: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&auto=format&fit=crop&q=60",
        lastSimplifiedTime: "2m ago",
        posts: [
            {
                id: "p1",
                threadId: "1001",
                author: "Anonymous",
                time: "10/24/23(Tue)14:00:00",
                content: "Post your desktops.\n\n>linux users only",
                imageUrl: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&auto=format&fit=crop&q=60",
                isOp: true,
            },
            {
                id: "p2",
                threadId: "1001",
                author: "Anonymous",
                time: "10/24/23(Tue)14:02:15",
                content: "r8 mine",
                imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60",
            }
        ]
    },
    {
        id: "1002",
        boardId: "g",
        subject: "What makes a good keyboard?",
        replyCount: 15,
        imageUrl: "https://images.unsplash.com/photo-1587829741301-379340e0e019?w=500&auto=format&fit=crop&q=60",
        lastSimplifiedTime: "15m ago",
        posts: [
            {
                id: "p3",
                threadId: "1002",
                author: "Anonymous",
                time: "10/24/23(Tue)15:30:00",
                content: "I'm looking to build my first mechanical keyboard. What switches do you recommend for typing?",
                imageUrl: "https://images.unsplash.com/photo-1587829741301-379340e0e019?w=800&auto=format&fit=crop&q=60",
                isOp: true,
            }
        ]
    },
    {
        id: "2001",
        boardId: "v",
        subject: "Best RPG of all time?",
        replyCount: 128,
        imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=500&auto=format&fit=crop&q=60",
        lastSimplifiedTime: "30s ago",
        posts: [
            {
                id: "p4",
                threadId: "2001",
                author: "Anonymous",
                time: "10/24/23(Tue)16:00:00",
                content: "Discuss.",
                imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&auto=format&fit=crop&q=60",
                isOp: true,
            }
        ]
    }
];
