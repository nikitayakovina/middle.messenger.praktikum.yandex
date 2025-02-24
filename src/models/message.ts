export interface IMessage {
  content: string;
  id: number;
  time: string;
  type: string;
  user_id: number;
}

export interface ISendMessage {
  message: string;
}