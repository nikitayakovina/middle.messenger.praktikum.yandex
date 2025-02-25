import profiles from "../../pages/profiles.hbs";
import "./profiles.scss";
import Block, { IProps } from "../../utils/block.ts";
import Profile from "../../components/Profile/profile.ts";
import Icon from "../../components/Icon/icon.ts";
import Input from "../../components/Input/input.ts";
import Button, { ModeButton } from "../../components/Button/button.ts";
import ProfileLayout from "../../components/ProfileLayout/profileLayout.ts";
import { ValidateType, validateForm } from "../../utils/validate.ts";
import AuthController from "../../controllers/authController.ts";
import { Connect } from "../../utils/connect.ts";
import UserController from "../../controllers/userController.ts";
import { IUser } from "../../models/user.ts";
import Router from "../../utils/router.ts";
import {
  IChatUserWithAvatar,
  IPassword,
  IProfile,
} from "../../models/profile.ts";
import { StoreType } from "../../utils/store.ts";
import { StoreEnum } from "../../models/store.ts";

class Profiles extends Block {
  constructor() {
    let isPasswordMode: boolean = false;
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
          events: {
            click: () => {
              isPasswordMode = true;
              profileLayout.setProps({
                inputs: [
                  new Input({
                    labelFor: "oldPassword",
                    label: "Пароль",
                    id: "oldPassword",
                    name: "oldPassword",
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
                    events: {
                      click: () => {
                        isPasswordMode = false;
                        profileLayout.setProps(initialProps);
                      },
                    },
                  }),
                ],
              });
            },
          },
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
              AuthController.logOut();
            },
          },
        }),
      ],
      events: {
        submit: (event: Event) => {
          event.stopPropagation();
          event.preventDefault();

          if (
            "children" in this.children.profileLayout
            && Array.isArray(this.children.profileLayout.children.inputs)
          ) {
            if (isPasswordMode) {
              const formDataValidPassword = validateForm<IPassword>(
                this.children.profileLayout.children.inputs,
                event,
              );
              if (formDataValidPassword !== null) {
                UserController.changePassword(formDataValidPassword);
                profileLayout.setProps(initialProps);
              }
            } else {
              const formDataValidProfile = validateForm<IProfile>(
                this.children.profileLayout.children.inputs,
                event,
              );
              if (formDataValidProfile !== null) {
                UserController.changeUser(formDataValidProfile);
              }
            }
          }
        },
      },
    });
    const initialProps: IProps = { ...profileLayout.props };
    const data: IProps = {
      back: new Button({
        mode: ModeButton.LINK,
        title: "Назад",
        events: {
          click: () => {
            Router.back();
          },
        },
      }),
      defaultAvatar: new Input({
        type: "file",
        icon: new Icon({
          src: "/img/circle_gray.svg",
          alt: "Фото профиля",
        }),
      }),
      profileLayout,
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();

          validateForm(profileLayout.children.inputs, event);
        },
        change: (event: Event) => {
          const target = event.target as HTMLInputElement;
          const formData = new FormData();

          if (!target.files?.length) {
            return;
          }

          formData.append("avatar", target.files[0]);
          UserController.changeAvatar(formData);
        },
      },
    };

    super({ ...data });
  }

  componentDidUpdate(): boolean {
    const user: IUser = this.props?.user as IUser;

    if (user) {
      if (
        "children" in this.children.profileLayout
        && Array.isArray(this.children.profileLayout.children.inputs)
      ) {
        this.children.profileLayout.children.inputs.forEach((input: Block) => {
          const profileLayoutInput = Object.keys(user).find((key: string) => key === input.props.id);
          if (profileLayoutInput) {
            input.setProps({ value: user[profileLayoutInput] });
          }
        });
        const profiles = this.props?.user as IChatUserWithAvatar;
        this.children.profiles = [profiles].map(
          (userProps: IChatUserWithAvatar) =>
            new Profile({
              ...userProps,
              avatar: new Icon({
                src: userProps.avatar,
                alt: "Фото профиля",
                style: "width: 50px",
              }),
            }),
        );
      }
      if ("children" in this.children.defaultAvatar) {
        const icon = this.children.defaultAvatar.children.icon as Block;

        icon.setProps({ src: user.avatar });
      }
    }

    return true;
  }

  render(props: IProps) {
    return this.compile(profiles, props);
  }
}
export default Connect(Profiles, (state: StoreType) => ({
  user: state?.user,
  first_name: (state[StoreEnum.USER] as { first_name: string })?.first_name,
}));
