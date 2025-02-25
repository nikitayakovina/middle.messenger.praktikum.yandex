import { IUser } from "../../models/user.ts";
import Block, { IProps } from "../../utils/block.ts";
import Store from "../../utils/store.ts";
import message from "./message.hbs";
import "./message.scss";

export default class Message extends Block {
  constructor(props: IProps) {
    const { user } = (Store.getState() as { user: IUser });
    super({ ...props, isMy: user?.id === props?.user_id });
  }

  render(props: IProps) {
    return this.compile(message, props);
  }
}
