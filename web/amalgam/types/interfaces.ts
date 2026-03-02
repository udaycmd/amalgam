export interface Channel {
  id: string;
  name: string;
  desc: string;
  nsfw: boolean;
}

export interface Post {
  id: string;
  threadId: string;
  author: string;
  createdAt: string;
  content: string;
  imageUrl?: string;
}

export interface Thread {
  id: string;
  channelId: string;
  subject: string;
  posts: Post[];
  origin: Post;
  replyCount: number;
  imageUrl: string;
  lastInteracted: string;
}

export interface SidebarProps {
  channels: Channel[];
}

export interface ThreadCardProps {
  thread: Thread;
}
