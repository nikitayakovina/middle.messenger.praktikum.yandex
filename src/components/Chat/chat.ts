import Block, { IProps } from "../../utils/block.ts";
import Store from "../../utils/store.ts";
import Icon from "../Icon/icon.ts";
import chat from "./chat.hbs";
import "./chat.scss";

export default class Chat extends Block {
  constructor(props: IProps) {
    const { selectedChatId } = Store.getState();
    const data = {
      defaultAvatarIcon: new Icon({
        src: props?.avatar ? props.avatar : "/img/circle_gray.svg",
        alt: "Фото профиля",
      }),
      isActiveChat: props.id === selectedChatId
    };

    super({ ...props, ...data });
  }

  render(props: IProps) {
    return this.compile(chat, props);
  }
}
