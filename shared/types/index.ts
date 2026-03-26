// ---  Data Object Specifications ---

export type ChannelInfo = {
  slug: string;
  name: string;
  desc: string;
  nsfw: boolean;
  mediaType: string;
};

export type Post = {
  id: bigint;
  header: string | null;
  author: string;
  createdAt: Date;
  content: string | null;
  media: string | null;
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

export type PaginatedChannel = {
  chinfo: ChannelInfo;
  threads: ThreadInfo[];
  hasMore: boolean;
};

export type Status = Readonly<{
  error: boolean;
  message: string;
}>;

export type CreatePost = Readonly<{
  name: string;
  comment: string;
  header: string | null;
  mediaURL: string | null;
  mediaType: string | null;
}>;
