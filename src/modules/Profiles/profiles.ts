import profiles from '../../pages/profiles.hbs';
import './profiles.scss';
import { IProfile } from '../../types/profile';
import Block from '../../utils/block';
import Profile from '../../components/Profile/profile';
import Icon from '../../components/Icon/icon';
import Input from '../../components/Input/input';
import Link from '../../components/Link/link';
import Button, { ModeButton } from '../../components/Button/button';
import ProfileLayout from '../../components/ProfileLayout/profileLayout';

// type ProfileType = IProfile & { mode?: string };

// interface IData {
//     profiles: IProfile[];
//     profile?: ProfileType
// }

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
                    placeholder: "Введите логин"
                }),
                new Input({
                    labelFor: "email",
                    label: "Почта",
                    id: "email",
                    name: "email",
                    placeholder: "Введите почту"
                }),
                new Input({
                    labelFor: "first_name",
                    label: "Имя",
                    id: "first_name",
                    name: "first_name",
                    placeholder: "Введите имя"
                }),
                new Input({
                    labelFor: "second_name",
                    label: "Фамилия",
                    id: "second_name",
                    name: "second_name",
                    placeholder: "Введите фамилию"
                }),
                new Input({
                    labelFor: "display_name",
                    label: "Отображаемое имя",
                    id: "display_name",
                    name: "display_name",
                    placeholder: "Введите отображаемое имя"
                }),
                new Input({
                    labelFor: "phone",
                    label: "Телефон",
                    id: "phone",
                    name: "phone",
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
                                        placeholder: "Введите пароль"
                                    }),
                                    new Input({
                                        labelFor: "newPassword",
                                        label: "Новый пароль",
                                        id: "newPassword",
                                        name: "newPassword",
                                        placeholder: "Введите новый пароль"
                                    }),
                                    new Input({
                                        labelFor: "repeatPassword",
                                        label: "Повторите новый пароль",
                                        id: "repeatPassword",
                                        name: "repeatPassword",
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
                    console.log(123, event)
                }
                // click: (event: any) => {
                //     event.preventDefault();
                //     event.stopPropagation();
                // }
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
        // this.children.inputs = [
        //     new Input({
        //         labelFor: "login",
        //         label: "Логин",
        //         id: "login",
        //         name: "login",
        //         placeholder: "Введите логин"
        //     }),
        //     new Input({
        //         labelFor: "email",
        //         label: "Почта",
        //         id: "email",
        //         name: "email",
        //         placeholder: "Введите почту"
        //     }),
        //     new Input({
        //         labelFor: "first_name",
        //         label: "Имя",
        //         id: "first_name",
        //         name: "first_name",
        //         placeholder: "Введите имя"
        //     }),
        //     new Input({
        //         labelFor: "second_name",
        //         label: "Фамилия",
        //         id: "second_name",
        //         name: "second_name",
        //         placeholder: "Введите фамилию"
        //     }),
        //     new Input({
        //         labelFor: "display_name",
        //         label: "Отображаемое имя",
        //         id: "display_name",
        //         name: "display_name",
        //         placeholder: "Введите отображаемое имя"
        //     }),
        //     new Input({
        //         labelFor: "phone",
        //         label: "Телефон",
        //         id: "phone",
        //         name: "phone",
        //         placeholder: "Введите телефон"
        //     }),
        // ];
        // this.children.actions = [
        //     new Button({
        //         type: 'submit',
        //         mode: ModeButton.LINK,
        //         title: 'Изменить данные',
        //         class: 'accept'
        //     }),
        //     new Button({
        //         mode: ModeButton.LINK,
        //         title: 'Изменить пароль',
        //         class: 'accept',
        //         events: {
        //             click: (event: any) => {
        //                 event.preventDefault();
        //                 event.stopPropagation();
        //             }
        //         }
        //     }),
        //     new Button({
        //         mode: ModeButton.LINK,
        //         title: 'Удалить профиль',
        //         class: 'reject',
        //         events: {
        //             click: (event: any) => {
        //                 event.preventDefault();
        //                 event.stopPropagation();
        //             }
        //         }
        //     }),
        //     new Button({
        //         mode: ModeButton.LINK,
        //         title: 'Выйти',
        //         class: 'reject',
        //         events: {
        //             click: (event: any) => {
        //                 event.preventDefault();
        //                 event.stopPropagation();
        //             }
        //         }
        //     }),
        // ];
    }

    render(props: any) {
        return this.compile(profiles, props);
    }

    // displayTemplate(): void {
    //     this.container.innerHTML = profile(this.data);

    //     if (this.data?.profile) {
    //         document.getElementById('main').addEventListener('click', (event: MouseEvent) => {
    //             // @ts-ignore
    //             const actionElement: Element = event.target.closest('.action');
    //             // @ts-ignore
    //             const actionId: string = actionElement?.dataset?.id;
    
    //             if (!actionElement) {
    //                 return;
    //             }

    //             if (actionId === 'changeData') {
    //                 const newProfile: ProfileType = { ...this.data.profile };
    //                 const index: number = profilesList.indexOf(this.data.profile);

    //                 Object.keys(this.data.profile).forEach((key: string) => {
    //                     // @ts-ignore
    //                     newProfile[key] = document.getElementById(key)?.value;
    //                 });

    //                 newProfile.id = this.data.profile.id;
    //                 newProfile.imgSrc = this.data.profile.imgSrc;
    //                 newProfile.selected = this.data.profile.selected;
    //                 newProfile.name = this.data.profile.name;

    //                 profilesList[index] = newProfile;
    //                 this.data = { ...this.data, profile: newProfile };

    //                 this.displayTemplate();
    //             } else if (actionId === 'changePassword') {
    //                 this.mode = 'changePassword';
    //                 this.data.profile = { ...this.data.profile, mode: this.mode };
    //                 this.displayTemplate();
    //             } else if (actionId === 'exit') {
    //                 onCustomEvent('redirectSignIn');
    //             } else if (actionId === 'cancel') {
    //                 this.mode = null;
    //                 this.data.profile = { ...this.data.profile, mode: this.mode };
    //                 this.displayTemplate();
    //             } else if (actionId === 'save') {
                    
    //             } else if (actionId === 'changePhoto') {
    //                 const fileInput: HTMLElement = document.getElementById('avatar');

    //                 fileInput.click();
    //                 fileInput.addEventListener('change', (event) => {
                        
    //                 });
    //             } else if (actionId === 'remove') {
    //                 const index: number = profilesList.indexOf(this.data.profile);

    //                 if (index !== -1) {
    //                     profilesList.splice(index, 1);
    //                     this.displayTemplate();
    //                 }
    //             }
    //         });
    //     }

    //     document.getElementById('profiles__sidebar__list').addEventListener('click', (event: MouseEvent) => {
    //         // @ts-ignore
    //         const profileElement: Element = event.target.closest('.profile');

    //         if (profileElement) {
    //             profilesList.forEach((item: IProfile) => item.selected = false);

    //             // @ts-ignore
    //             const profile: IProfile = profilesList.find((profile: IProfile) => Number(profile.id) === Number(profileElement?.dataset?.id));
    //             profile.selected = true;

    //             this.data = { ...this.data, profile };
    //             this.displayTemplate();
    //         }
    //     });

    //     document.getElementById('profiles__sidebar__header').addEventListener('click', (event) => {
    //         onCustomEvent('chats');
    //     });
    // }

}
