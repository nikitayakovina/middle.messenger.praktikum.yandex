import Block, { IProps } from "../../utils/block.ts";
import error from "./error.hbs";
import "./error.scss";

export default class Error extends Block {
  constructor(props: IProps) {
    const data = {
      text:
        Number(props.code) === 404
          ? "Страница не найдена"
          : "Ошибка на стороне сервера",
    };

    super({ ...props, ...data });
  }

  render(props: IProps) {
    return this.compile(error, props);
  }
}
