import signIn from '../../pages/signin.hbs';
import Handlebars from "handlebars";
import './signin.scss';
import Input from '../../components/Input/input';
import { onCustomEvent } from '../../utils/event';
import { profilesList } from '../../models/profiles.js';
import { IInputField } from '../../types/input';
import { IProfile } from '../../types/profile';
import { IData, IUser } from '../../types/auth';
import Block, { Events } from '../../utils/block';
import Button from '../../components/Button/button';
import Link from '../../components/Link/link';;

export default class SignIn extends Block {
    constructor() {
        const data: any = {
            title: 'Вход',
            login: new Input(
                {
                    labelFor: "login",
                    label: "Логин",
                    name: "login",
                    placeholder: "Введите логин"
                },
            ),
            password: new Input(
                {
                    labelFor: "password",
                    label: "Пароль",
                    name: "password",
                    placeholder: "Введите пароль"
                },
            ),
            button: new Button({
                title: 'Войти',
                type: 'submit'
            }),
            link: new Link({
                href: '#',
                text: 'Нет аккаунта?'
            }),
            events: {
                submit: (event: any) => {
                    event.preventDefault();
                        event.stopPropagation();
                        console.log(123)
                }
            }
        };

        super({ ...data });
    }

    render(props: any) {
        return this.compile(signIn, props);
    }

    // this.container.innerHTML = signIn(data);

//         document.getElementById('footer')?.addEventListener('click', (event: Event) => {
//             const element: Element = (event.target as HTMLElement)?.closest('.footer__action');
//             // @ts-ignore
//             const id: string = element?.dataset?.id;
            
//             if (id === 'signIn') {
//                 let user: IUser;

//                 data.inputs.forEach((input: IInputField) => {
//                     user[input.id] = (document.getElementById(input.id) as HTMLInputElement)?.value;
//                 });

//                 const findProfile: IProfile = profilesList.find((profile: IProfile) => profile.login === user.login);
//                 const error: HTMLElement = document.getElementById('error__message');

//                 if (!findProfile || findProfile.password !== user.password) {
//                     error.classList.add('error__message-visible');

//                     return;
//                 }

//                 error.classList.remove('error__message-visible');
//                 onCustomEvent('profile');
//             } else {
//                 onCustomEvent(id);
//             }
//         });
}
