import { RouterPath } from "../../models/router.ts";
import Block, { IProps } from "../../utils/block.ts";
import Router from "../../utils/router.ts";
import Store from "../../utils/store.ts";
import Link from "../Link/link.ts";
import error from "./error.hbs";
import "./error.scss";

export default class Error extends Block {
  constructor(props: IProps) {
    const { user } = Store.getState();
    const data = {
      text:
        Number(props.code) === 404
          ? "Страница не найдена"
          : "Ошибка на стороне сервера",
      link: new Link({
        text: "Назад к чатам",
        events: {
          click: (event: Event) => {
            event.stopPropagation();
            event.preventDefault();
            Router.go(RouterPath.MESSENGER);
          },
        },
      }),
      user,
    };

    super({ ...props, ...data });
  }

  render(props: IProps) {
    return this.compile(error, props);
  }
}
