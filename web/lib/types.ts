import type {
  ChannelInfo,
  Post,
  ThreadInfo,
  PaginatedThread,
  PaginatedChannel,
} from "@shared/types";

export type {
  ChannelInfo,
  Post,
  ThreadInfo,
  PaginatedThread,
  PaginatedChannel,
};

export type SidebarProps = Readonly<{
  channels: ChannelInfo[];
}>;

export type ThreadCardProps = Readonly<{
  tinfo: ThreadInfo;
}>;

export type ChannelPageProps = Readonly<{
  params: Promise<{
    channelId: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}>;

export type ThreadPageProps = Readonly<{
  params: Promise<{
    channelId: string;
    threadId: string;
  }>;
}>;

export type PostItemProps = Readonly<{
  post: Post;
  isOriginal?: boolean;
  isLocked?: boolean;
}>;

export type ReplyFormProps = Readonly<{
  channel: string;
  threadId: string;
}>;
