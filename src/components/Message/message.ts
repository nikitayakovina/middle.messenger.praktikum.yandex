import Block, { IProps } from "../../utils/block";
import message from "./message.hbs";
import "./message.scss";

export default class Message extends Block {
  constructor(props: IProps) {
    super(props);
  }

  render(props: IProps) {
    return this.compile(message, props);
  }
}
