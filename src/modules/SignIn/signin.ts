import signIn from '../../pages/signin.hbs';
import Handlebars from "handlebars";
import './signin.scss';
import Input from '../../components/Input/input.js';
import Footer from '../../components/Footer/footer.js';
import { onCustomEvent } from '../../utils/event';
import { profilesList } from '../../models/profiles.js';
import { IInputField } from '../../types/input';
import { IProfile } from '../../types/profile';
import { IData, IUser } from '../../types/auth';
import AbstractClass from '../abstract';
import Block, { Events } from '../../utils/block';

Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Footer', Footer);

export default class SignIn extends Block {
    constructor() {
        const data: IData = {
            title: 'Вход',
            inputs: [
                {
                    labelFor: "login",
                    label: "Логин",
                    id: "login",
                    name: "login",
                    placeholder: "Введите логин"
                },
                {
                    labelFor: "password",
                    label: "Пароль",
                    id: "password",
                    name: "password",
                    placeholder: "Введите пароль"
                },
            ],
            footer: {
                title: 'Войти',
                linkText: 'Нет аккаунта?',
                id: 'signIn',
                link: 'redirectSignUp'
            }
        };

        const events: Events = {
            click: (event: Event) => {
                console.log(event)
            }
        }

        super({ ...data }, events);
    }

    render() {
        return this.compile(signIn, this.props);
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
