import signIn from '../../pages/signin.hbs';
import './signin.scss';
import Input from '../../components/Input/input';
import Block, { IProps } from '../../utils/block';
import Button from '../../components/Button/button';
import Link from '../../components/Link/link';import { ValiadateType, validate, validateForm } from '../../utils/validate';
;

export default class SignIn extends Block {
    constructor() {
        const data: any = {
            title: 'Вход',
            button: new Button({
                title: 'Войти',
                type: 'submit'
            }),
            link: new Link({
                href: '#',
                text: 'Нет аккаунта?'
            }),
            events: {
                submit: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    // @ts-ignore
                    validateForm(this.children.inputs, event);
                }
            }
        };

        super({ ...data });
    }

    init() {
        this.children.inputs = [
            new Input(
                {
                    labelFor: "login",
                    label: "Логин",
                    name: "login",
                    validateType: ValiadateType.LOGIN,
                    placeholder: "Введите логин",
                    errorText: "Неправильный логин"
                },
            ),
            new Input(
                {
                    labelFor: "password",
                    label: "Пароль",
                    name: "password",
                    validateType: ValiadateType.PASSWORD,
                    errorText: "Неправильный пароль",
                    placeholder: "Введите пароль"
                },
            ),
        ];
    }

    render(props: IProps) {
        return this.compile(signIn, props);
    }
}
