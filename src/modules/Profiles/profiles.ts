import profiles from "../../pages/profiles.hbs";
import "./profiles.scss";
import Block, { IProps } from "../../utils/block.ts";
import Profile from "../../components/Profile/profile.ts";
import Icon from "../../components/Icon/icon.ts";
import Input from "../../components/Input/input.ts";
import Button, { ModeButton } from "../../components/Button/button.ts";
import ProfileLayout from "../../components/ProfileLayout/profileLayout.ts";
import { ValidateType, validateForm } from "../../utils/validate.ts";
import { renderDom } from "../../utils/renderDom.ts";
import SignIn from "../SignIn/signin.ts";

export default class Profiles extends Block {
  constructor(isEditPassword: boolean = false) {
    const profileLayout = new ProfileLayout({
      inputs: [
        new Input({
          labelFor: "login",
          label: "Логин",
          id: "login",
          name: "login",
          validateType: ValidateType.LOGIN,
          placeholder: "Введите логин",
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
          labelFor: "display_name",
          label: "Отображаемое имя",
          id: "display_name",
          name: "display_name",
          validateType: ValidateType.NAME,
          placeholder: "Введите отображаемое имя",
        }),
        new Input({
          labelFor: "phone",
          label: "Телефон",
          id: "phone",
          name: "phone",
          validateType: ValidateType.PHONE,
          placeholder: "Введите телефон",
        }),
      ],
      actions: [
        new Button({
          type: "submit",
          mode: ModeButton.LINK,
          title: "Изменить данные",
          class: "accept",
        }),
        new Button({
          mode: ModeButton.LINK,
          title: "Изменить пароль",
          class: "accept",
        }),
        new Button({
          mode: ModeButton.LINK,
          title: "Удалить профиль",
          class: "reject",
        }),
        new Button({
          mode: ModeButton.LINK,
          title: "Выйти",
          class: "reject",
          events: {
            click: (event: Event) => {
              event.stopPropagation();
              event.preventDefault();
              renderDom(".app", new SignIn());
            }
          }
        }),
      ],
    });

    if (isEditPassword) {
      profileLayout.setProps({
        inputs: [
          new Input({
            labelFor: "password",
            label: "Пароль",
            id: "password",
            name: "password",
            validateType: ValidateType.PASSWORD,
            placeholder: "Введите пароль",
          }),
          new Input({
            labelFor: "newPassword",
            label: "Новый пароль",
            id: "newPassword",
            name: "newPassword",
            validateType: ValidateType.PASSWORD,
            placeholder: "Введите новый пароль",
          }),
          new Input({
            labelFor: "repeatPassword",
            label: "Повторите новый пароль",
            id: "repeatPassword",
            name: "repeatPassword",
            validateType: ValidateType.PASSWORD,
            placeholder: "Введите пароль",
          }),
        ],
        actions: [
          new Button({
            mode: ModeButton.LINK,
            title: "Сохранить",
            class: "accept",
            type: "submit",
          }),
          new Button({
            mode: ModeButton.LINK,
            title: "Отмена",
            class: "reject",
          }),
        ],
      });
    }

    const data: IProps = {
      defaultAvatar: new Icon({
        src: "/img/circle_gray.svg",
        alt: "Фото профиля",
      }),
      first_name: "Имя профиль 1",
      profileLayout,
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();

          validateForm(profileLayout.children.inputs, event);
        },
      },
    };

    super({ ...data });
  }

  init() {
    this.children.profiles = [
      new Profile({
        name: "Профиль 1",
        login: "profile_1",
        password: "password_1",
        email: "email@email.ru",
        first_name: "Имя профиль 1",
        second_name: "Фамилия профиль 1",
        display_name: "Отображаемое имя профиль 1",
        phone: "8(913)999-99-99",
        defaultAvatarIcon: new Icon({
          src: "/img/circle_gray.svg",
          alt: "Фото профиля",
        }),
      }),
      new Profile({
        name: "Профиль 22",
        login: "profile_2",
        password: "password_2",
        email: "email@email.ru",
        first_name: "Имя профиль 2",
        second_name: "Фамилия профиль 2",
        display_name: "Отображаемое имя профиль 2",
        phone: "8(913)777-77-77",
        defaultAvatarIcon: new Icon({
          src: "/img/circle_gray.svg",
          alt: "Фото профиля",
        }),
      }),
    ];
  }

  render(props: IProps) {
    return this.compile(profiles, props);
  }
}
