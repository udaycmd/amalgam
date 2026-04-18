export type ChannelInfo = {
  slug: string;
  name: string;
  desc: string;
  nsfw: boolean;
};

export type Post = {
  id: bigint;
  header: string | null;
  author: string;
  createdAt: Date;
  content: string | null;
  media: string | null;
  mediaType: string | null;
  ucode: string | null;
  op: boolean;
  sage: boolean;
};

export type ThreadInfo = {
  id: bigint;
  channelId: string;
  bumpedAt: Date;
  createdAt: Date;
  replyCount: number;
  isLocked: boolean;
  isArchived: boolean;
  op: Post;
};

export type PaginatedThread = {
  tinfo?: ThreadInfo;
  replies: Post[];
  nxtCurr?: string;
};

// TODO: chinfo -> chinfo?
export type PaginatedChannel = {
  chinfo: ChannelInfo;
  threads: ThreadInfo[];
  hasMore: boolean;
};

export type ApiError = Readonly<{
  error?: Error;
  code?: number;
  details?: unknown;
}>;

export type ApiResponse<T> = Readonly<{
  data?: T;
  error?: ApiError;
}>;
