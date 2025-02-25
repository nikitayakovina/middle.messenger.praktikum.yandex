import { IProfile } from "./profile.ts";

export interface IChat {
  avatar: string;
  created_by: number;
  id: number;
  last_message: ILastMessage;
  title: string;
  unread_count: number;
}

export interface ILastMessage {
  content: string;
  time: string;
  user: IProfile;
}

export interface IMessageData {
  chat_id: number;
  content: string;
  file?: {
    content_size: number;
    content_type: string;
    filename: string;
    id: number;
    path: string;
    upload_date: string;
    user_id: number;
  };
  time: string;
  type: string;
  user_id: string;
}

export interface IToken {
  token: string;
}
