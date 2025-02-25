import signup from "../../pages/signup.hbs";
import "./signup.scss";
import Block, { IProps } from "../../utils/block.ts";
import Input from "../../components/Input/input.ts";
import Button from "../../components/Button/button.ts";
import Link from "../../components/Link/link.ts";
import { ValidateType, validateForm } from "../../utils/validate.ts";
import AuthController from "../../controllers/authController.ts";
import Router from "../../utils/router.ts";
import { ISignUp } from "../../models/auth.ts";
import { RouterPath } from "../../models/router.ts";

export default class SignUp extends Block {
  constructor() {
    const data: IProps = {
      title: "Регистрация",
      button: new Button({
        title: "Зарегистрироваться",
        type: "submit",
      }),
      link: new Link({
        href: "/signin",
        text: "Войти",
        events: {
          click: (event: Event) => {
            event.stopPropagation();
            event.preventDefault();

            Router.go(RouterPath.HOME);
          },
        },
      }),
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();

          const formDataValid = validateForm<ISignUp>(this.children.inputs, event);

          if (formDataValid !== null) {
            AuthController.signUp(formDataValid);
          }
        },
      },
    };

    super({ ...data });
  }

  init() {
    this.children.inputs = [
      new Input({
        labelFor: "first_name",
        label: "Имя",
        id: "first_name",
        name: "first_name",
        validateType: ValidateType.NAME,
        placeholder: "Введите имя",
      }),
      new Input({
        labelFor: "second_name",
        label: "Фамилия",
        id: "second_name",
        name: "second_name",
        validateType: ValidateType.NAME,
        placeholder: "Введите фамилию",
      }),
      new Input({
        labelFor: "email",
        label: "Почта",
        id: "email",
        name: "email",
        validateType: ValidateType.EMAIL,
        placeholder: "Введите почту",
      }),
      new Input({
        labelFor: "login",
        label: "Логин",
        id: "login",
        name: "login",
        validateType: ValidateType.LOGIN,
        placeholder: "Введите логин",
      }),
      new Input({
        labelFor: "phone",
        label: "Телефон",
        id: "phone",
        name: "phone",
        validateType: ValidateType.PHONE,
        placeholder: "Введите телефон",
      }),
      new Input({
        labelFor: "password",
        label: "Пароль",
        id: "password",
        name: "password",
        validateType: ValidateType.PASSWORD,
        placeholder: "Введите пароль",
      }),
      new Input({
        labelFor: "repeat_password",
        label: "Повторите пароль",
        id: "repeat_password",
        name: "repeat_password",
        placeholder: "Введите пароль еще раз",
      }),
    ];
  }

  render(props: IProps) {
    return this.compile(signup, props);
  }
}
