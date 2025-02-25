import Block, { IProps } from "../../utils/block.ts";
import popupChat from "./popupChat.hbs";
import "./popupChat.scss";

export default class PopupChat extends Block {
  constructor(props: IProps) {
    super(props);
  }

  init() {
    this.children.inputs = this.props.inputs as Block[];
  }

  render(props: IProps) {
    return this.compile(popupChat, props);
  }
}
