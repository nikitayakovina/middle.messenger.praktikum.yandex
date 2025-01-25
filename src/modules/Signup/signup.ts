import signup from '../../pages/signup.hbs';
import './signup.scss';
import { onCustomEvent } from '../../utils/event';
import { profilesList } from '../../models/profiles';
import { IProfile } from '../../types/profile';
import { IData } from '../../types/auth';
import { IInputField } from '../../types/input';
import AbstractClass from '../abstract';
import Block from '../../utils/block';

export default class SignUp extends Block {
    constructor() {
        const data: IData = {
            title: 'Регистрация',
            inputs: [
                {
                    labelFor: "first_name",
                    label: "Имя",
                    id: "first_name",
                    name: "first_name",
                    placeholder: "Введите имя"
                },
                {
                    labelFor: "second_name",
                    label: "Фамилия",
                    id: "second_name",
                    name: "second_name",
                    placeholder: "Введите фамилию"
                },
                {
                    labelFor: "login",
                    label: "Логин",
                    id: "login",
                    name: "login",
                    placeholder: "Введите логин"
                },
                {
                    labelFor: "phone",
                    label: "Телефон",
                    id: "phone",
                    name: "phone",
                    placeholder: "Введите телефон"
                },
                {
                    labelFor: "password",
                    label: "Пароль",
                    id: "password",
                    name: "password",
                    placeholder: "Введите пароль"
                },
                {
                    labelFor: "repeat_password",
                    label: "Повторите пароль",
                    id: "repeat_password",
                    name: "repeat_password",
                    placeholder: "Введите пароль еще раз"
                },
            ],
            footer: {
                title: 'Зарегистрироваться',
                linkText: 'Войти',
                id: 'signUp',
                link: 'redirectSignIn'
            }
        };

        super({...data});
    }

    render() {
        return this.compile(signup, this.props);

    //     this.container.innerHTML = signup(data);

    //     document.getElementById('footer').addEventListener('click', (event: MouseEvent) => {
    //         // @ts-ignore
    //         const element = event.target.closest('.footer__action');
    //         const id: string = element?.dataset?.id;
    //         let createdProfile: IProfile = {
    //             id: (Number(profilesList[profilesList.length-1].id) + 1).toString(),
    //             imgSrc: '/img/circle_gray.svg'
    //         };
            
    //         if (id === 'signUp') {
    //             const errorMessage: HTMLElement = document.getElementById('error__message');

    //             data.inputs.forEach((input: IInputField) => {
    //                 // @ts-ignore
    //                 createdProfile[input.id] = document.getElementById(input.id).value;
    //             });

    //             if (!createdProfile?.login) {
    //                 errorMessage.textContent = 'Введите логин';
    //                 errorMessage.classList.add('error__message-visible');
    //             } else if (!createdProfile?.password) {
    //                 errorMessage.textContent = 'Введите пароль';
    //                 errorMessage.classList.add('error__message-visible');
    //             } else if (!createdProfile?.repeat_password) {
    //                 errorMessage.textContent = 'Введите повтор пароля';
    //                 errorMessage.classList.add('error__message-visible');
    //             } else if (createdProfile?.password !== createdProfile?.repeat_password) {
    //                 errorMessage.textContent = 'Пароли не совпадают';
    //                 errorMessage.classList.add('error__message-visible');
    //             } else {
    //                 profilesList.push(createdProfile);
    //                 onCustomEvent('profile');
    //             }
    //         } else {
    //             onCustomEvent(id);
    //         }
    //     });
    }
}
