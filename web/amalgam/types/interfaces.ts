export interface Channel {
  slug: string;
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
  locked: boolean;
}

export interface SidebarProps {
  channels: Channel[];
}

export interface ThreadCardProps {
  thread: Thread;
}

export interface ChannelPageProps {
  params: Promise<{
    channelId: string;
  }>;
}

export interface ThreadPageProps {
  params: Promise<{
    channel: string;
    threadId: string;
  }>;
}

export interface PostItemProps {
  post: Post;
  isOriginal?: boolean;
}

export interface ReplyFormProps {
  channel: string;
  threadId: string;
}
