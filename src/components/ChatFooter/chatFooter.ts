import ChatsController from "../../controllers/chatsController.ts";
import Block, { IProps } from "../../utils/block.ts";
import Store from "../../utils/store.ts";
import { ValidateType, validateForm } from "../../utils/validate.ts";
import Button, { ModeButton } from "../Button/button.ts";
import Icon from "../Icon/icon.ts";
import Input from "../Input/input.ts";
import chatFooter from "./chatFooter.hbs";
import "./chatFooter.scss";

export default class ChatFooter extends Block {
  constructor() {
    const data = {
      send: new Button({
        type: "submit",
        mode: ModeButton.ICON,
        icon: new Icon({
          src: "/img/send.svg",
          alt: "Отправить сообщение",
        }),
      }),
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();

          const formDataValid = validateForm(this.children.input, event);

          if (formDataValid !== null) {
            const { selectedChatId } = Store.getState();
            //@ts-ignore
            ChatsController.sendMessage(selectedChatId, formDataValid.message);
          }
        },
      },
    };
    super({ ...data });
  }

  init() {
    this.children.input = new Input({
      labelFor: "message",
      label: "Отправить сообщение",
      name: "message",
      validateType: ValidateType.TEXT,
      placeholder: "Отправить сообщение",
      icon: new Icon({
        src: "/img/attached-file.svg",
        alt: "Прикрепить файл",
      }),
    });
  }

  render(props: IProps) {
    return this.compile(chatFooter, props);
  }
}
