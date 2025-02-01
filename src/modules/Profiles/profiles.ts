import profiles from '../../pages/profiles.hbs';
import './profiles.scss';
import { IProfile } from '../../types/profile';
import Block, { IProps } from '../../utils/block';
import Profile from '../../components/Profile/profile';
import Icon from '../../components/Icon/icon';
import Input from '../../components/Input/input';
import Link from '../../components/Link/link';
import Button, { ModeButton } from '../../components/Button/button';
import ProfileLayout from '../../components/ProfileLayout/profileLayout';
import { ValiadateType, validateForm } from '../../utils/validate';

export default class Profiles extends Block {
    profile!: IProfile;
    mode!: string;

    constructor() {
        const profileLayout = new ProfileLayout({
            inputs: [
                new Input({
                    labelFor: "login",
                    label: "Логин",
                    id: "login",
                    name: "login",
                    validateType: ValiadateType.LOGIN,
                    placeholder: "Введите логин"
                }),
                new Input({
                    labelFor: "email",
                    label: "Почта",
                    id: "email",
                    name: "email",
                    validateType: ValiadateType.EMAIL,
                    placeholder: "Введите почту"
                }),
                new Input({
                    labelFor: "first_name",
                    label: "Имя",
                    id: "first_name",
                    name: "first_name",
                    validateType: ValiadateType.NAME,
                    placeholder: "Введите имя"
                }),
                new Input({
                    labelFor: "second_name",
                    label: "Фамилия",
                    id: "second_name",
                    name: "second_name",
                    validateType: ValiadateType.NAME,
                    placeholder: "Введите фамилию"
                }),
                new Input({
                    labelFor: "display_name",
                    label: "Отображаемое имя",
                    id: "display_name",
                    name: "display_name",
                    validateType: ValiadateType.NAME,
                    placeholder: "Введите отображаемое имя"
                }),
                new Input({
                    labelFor: "phone",
                    label: "Телефон",
                    id: "phone",
                    name: "phone",
                    validateType: ValiadateType.PHONE,
                    placeholder: "Введите телефон"
                }),
            ],
            actions: [
                new Button({
                    type: 'submit',
                    mode: ModeButton.LINK,
                    title: 'Изменить данные',
                    class: 'accept'
                }),
                new Button({
                    mode: ModeButton.LINK,
                    title: 'Изменить пароль',
                    class: 'accept',
                    events: {
                        click: (event: any) => {
                            event.preventDefault();
                            event.stopPropagation();

                            profileLayout.setProps({
                                inputs: [
                                    new Input({
                                        labelFor: "password",
                                        label: "Пароль",
                                        id: "password",
                                        name: "password",
                                        validateType: ValiadateType.PASSWORD,
                                        placeholder: "Введите пароль"
                                    }),
                                    new Input({
                                        labelFor: "newPassword",
                                        label: "Новый пароль",
                                        id: "newPassword",
                                        name: "newPassword",
                                        validateType: ValiadateType.PASSWORD,
                                        placeholder: "Введите новый пароль"
                                    }),
                                    new Input({
                                        labelFor: "repeatPassword",
                                        label: "Повторите новый пароль",
                                        id: "repeatPassword",
                                        name: "repeatPassword",
                                        validateType: ValiadateType.PASSWORD,
                                        placeholder: "Введите пароль"
                                    }),
                                ],
                                actions: [
                                    new Button({
                                        mode: ModeButton.LINK,
                                        title: 'Сохранить',
                                        class: 'accept',
                                        type: 'submit',
                                        events: {
                                            submit: (event: any) => {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                console.log(event)
                                            }
                                        }
                                    }),
                                    new Button({
                                        mode: ModeButton.LINK,
                                        title: 'Отмена',
                                        class: 'reject',
                                        events: {
                                            click: (event: any) => {
                                                event.preventDefault();
                                                event.stopPropagation();

                                                
                                            }
                                        }
                                    }),
                                ]
                            });
                        }
                    }
                }),
                new Button({
                    mode: ModeButton.LINK,
                    title: 'Удалить профиль',
                    class: 'reject',
                    events: {
                        click: (event: any) => {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }
                }),
                new Button({
                    mode: ModeButton.LINK,
                    title: 'Выйти',
                    class: 'reject',
                    events: {
                        click: (event: any) => {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }
                }),
            ]
        });
        const data: any = {
            defaultAvatar: new Icon({
                src: '/img/circle_gray.svg',
                alt: 'Фото профиля',
            }),
            first_name: 'Имя профиль 1',
            profileLayout,
            events: {
                submit: (event: any) => {
                    event.preventDefault();
                    event.stopPropagation();
                    
                    // @ts-ignore
                    validateForm(profileLayout.children.inputs, event);
                }
            }
        };

        super({ ...data });
    }

    init() {
        this.children.profiles = [
            new Profile({
                name: 'Профиль 1',
                login: 'profile_1',
                password: 'password_1',
                email: 'email@email.ru',
                first_name: 'Имя профиль 1',
                second_name: 'Фамилия профиль 1',
                display_name: 'Отображаемое имя профиль 1',
                phone: '8(913)999-99-99',
                defaultAvatarIcon: new Icon({
                    src: '/img/circle_gray.svg',
                    alt: 'Фото профиля',
                }),
            }),
            new Profile({
                name: 'Профиль 22',
                login: 'profile_2',
                password: 'password_2',
                email: 'email@email.ru',
                first_name: 'Имя профиль 2',
                second_name: 'Фамилия профиль 2',
                display_name: 'Отображаемое имя профиль 2',
                phone: '8(913)777-77-77',
                defaultAvatarIcon: new Icon({
                    src: '/img/circle_gray.svg',
                    alt: 'Фото профиля',
                }),
            }),
        ];
    }

    render(props: IProps) {
        return this.compile(profiles, props);
    }
}
