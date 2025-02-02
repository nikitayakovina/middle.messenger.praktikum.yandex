import signup from '../../pages/signup.hbs';
import './signup.scss';
import Block, { IProps } from '../../utils/block';
import Input from '../../components/Input/input';
import Button from '../../components/Button/button';
import Link from '../../components/Link/link';
import { ValidateType, validateForm } from '../../utils/validate';

export default class SignUp extends Block {
    constructor() {
        const data: IProps = {
            title: 'Регистрация',
            button: new Button({
                title: 'Зарегистрироваться',
            }),
            link: new Link({
                href: '#',
                text: 'Войти'
            }),
            events: {
                submit: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    validateForm(this.children.inputs, event);
                }
            }
        };

        super({...data});
    }

    init() {
        this.children.inputs = [
            new Input(
                {
                    labelFor: "first_name",
                    label: "Имя",
                    id: "first_name",
                    name: "first_name",
                    validateType: ValidateType.NAME,
                    placeholder: "Введите имя"
                },
            ),
            new Input(
                {
                    labelFor: "second_name",
                    label: "Фамилия",
                    id: "second_name",
                    name: "second_name",
                    validateType: ValidateType.NAME,
                    placeholder: "Введите фамилию"
                },
            ),
            new Input(
                {
                    labelFor: "login",
                    label: "Логин",
                    id: "login",
                    name: "login",
                    validateType: ValidateType.LOGIN,
                    placeholder: "Введите логин"
                },
            ),
            new Input(
                {
                    labelFor: "phone",
                    label: "Телефон",
                    id: "phone",
                    name: "phone",
                    validateType: ValidateType.PHONE,
                    placeholder: "Введите телефон"
                },
            ),
            new Input(
                {
                    labelFor: "password",
                    label: "Пароль",
                    id: "password",
                    name: "password",
                    validateType: ValidateType.PASSWORD,
                    placeholder: "Введите пароль"
                },
            ),
            new Input(
                {
                    labelFor: "repeat_password",
                    label: "Повторите пароль",
                    id: "repeat_password",
                    name: "repeat_password",
                    placeholder: "Введите пароль еще раз"
                },
            ),
        ];
    }

    render(props: IProps) {
        return this.compile(signup, props);
    }
}
