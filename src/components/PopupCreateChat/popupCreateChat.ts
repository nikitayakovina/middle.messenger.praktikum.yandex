import Block, { IProps } from "../../utils/block.ts";
import popupCreateChat from "./popupCreateChat.hbs";
import "./popupCreateChat.scss";

export default class PopupCreateChat extends Block {
  constructor(props: IProps) {
    super(props);
  }

  init() {
    this.children.inputs = this.props.inputs as Block[];
  }

  render(props: IProps) {
    return this.compile(popupCreateChat, props);
  }
}
