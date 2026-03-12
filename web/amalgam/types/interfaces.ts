export interface ChannelInfo {
  slug: string;
  name: string;
  desc: string;
  nsfw: boolean;
}

export interface Post {
  id: bigint;
  threadId: bigint;
  author: string;
  createdAt: Date;
  content: string | null;
  media: string | null;
  ucode: string | null;
  op: boolean;
  sage: boolean;
}

export interface ThreadInfo {
  id: bigint;
  bumpedAt: Date;
  createdAt: Date;
  replyCount: number;
  isLocked: boolean;
  isArchived: boolean;
  op: Post;
}

export interface PaginatedThread extends ThreadInfo {
  replies: Post[];
  nxtCurr: string;
}

export interface PaginatedChannel {
  chinfo: ChannelInfo;
  threads: ThreadInfo[];
  hasMore: boolean;
}

export interface SidebarProps {
  channels: ChannelInfo[];
}

export interface ThreadCardProps {
  tinfo: ThreadInfo;
}

export interface ChannelPageProps {
  params: Promise<{
    channelId: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export interface ThreadPageProps {
  params: Promise<{
    channelId: string;
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
