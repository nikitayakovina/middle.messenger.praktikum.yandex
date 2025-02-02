import signIn from "../../pages/signin.hbs";
import "./signin.scss";
import Input from "../../components/Input/input.ts";
import Block, { IProps } from "../../utils/block.ts";
import Button from "../../components/Button/button.ts";
import Link from "../../components/Link/link.ts";
import { ValidateType, validateForm } from "../../utils/validate.ts";

export default class SignIn extends Block {
  constructor() {
    const data: IProps = {
      title: "Вход",
      button: new Button({
        title: "Войти",
        type: "submit",
      }),
      link: new Link({
        href: "#",
        text: "Нет аккаунта?",
      }),
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();

          validateForm(this.children.inputs, event);
        },
      },
    };

    super({ ...data });
  }

  init() {
    this.children.inputs = [
      new Input({
        labelFor: "login",
        label: "Логин",
        name: "login",
        validateType: ValidateType.LOGIN,
        placeholder: "Введите логин",
        errorText: "Неправильный логин",
      }),
      new Input({
        labelFor: "password",
        label: "Пароль",
        name: "password",
        validateType: ValidateType.PASSWORD,
        errorText: "Неправильный пароль",
        placeholder: "Введите пароль",
      }),
    ];
  }

  render(props: IProps) {
    return this.compile(signIn, props);
  }
}
