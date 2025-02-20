import Block, { IProps } from "../../utils/block.ts";
import popupCreateChat from "./popupCreateChat.hbs";
import "./popupCreateChat.scss";

export default class PopupCreateChat extends Block {
  constructor(props: IProps) {
    super(props);
  }

  render(props: IProps) {
    return this.compile(popupCreateChat, props);
  }
}
