export interface channel {
  id: string;
  name: string;
  desc: string;
  nsfw: boolean;
}

export interface SidebarProps {
  channels: channel[];
}
