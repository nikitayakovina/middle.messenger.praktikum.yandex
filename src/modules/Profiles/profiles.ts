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

class Profiles extends Block {
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
              
              AuthController.logOut();
            },
          },
        }),
      ],
      events: {
        submit: (event: Event) => {
          event.stopPropagation();
          event.preventDefault();

          if ('children' in this.children.profileLayout && Array.isArray(this.children.profileLayout.children.inputs)) {
            const formDataValid = validateForm(this.children.profileLayout.children.inputs, event);

            if (formDataValid !== null) {
              UserController.changeUser(formDataValid);
            }
          }
        }
      }
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

  componentDidUpdate(oldProps: object, newProps: object): boolean {
    const user = this.props?.user;

    if (user && 'children' in this.children.profileLayout && Array.isArray(this.children.profileLayout.children.inputs)) {
      this.children.profileLayout.children.inputs.forEach((input: Block) => {
        Object.keys(user).find((key: string) => {
          if (key === input.props.id) {
            //@ts-ignore
            input.setProps({ value: user[key] });
          }
        });
      })
      this.children.profiles = [this.props.user].map((user: any) => new Profile({ ...user }));
    }

    return true;
  }

  render(props: IProps) {
    return this.compile(profiles, props);
  }
}
export default Connect(Profiles, (state: any) => {
  return { 
    user: state.user, 
    first_name: state?.user?.first_name 
  };
})
