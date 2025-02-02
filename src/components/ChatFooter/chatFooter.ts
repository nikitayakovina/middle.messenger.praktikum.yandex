import Block, { IProps } from "../../utils/block";
import { ValidateType, validateForm } from "../../utils/validate";
import Button, { ModeButton } from "../Button/button";
import Icon from "../Icon/icon";
import Input from "../Input/input";
import chatFooter from './chatFooter.hbs';
import './chatFooter.scss';

export default class ChatFooter extends Block {
    constructor() {
        const data = {
            send: new Button({
                type: 'submit',
                mode: ModeButton.ICON,
                icon: new Icon({
                    src: '/img/send.svg',
                    alt: 'Отправить сообщение'
                })
            }),
            events: {
                submit: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    validateForm(this.children.input, event);
                }
            }
        }
        super({ ...data });
    }

    init() {
        this.children.input = 
            new Input({
                labelFor: "message",
                label: "Отправить сообщение",
                name: "message",
                validateType: ValidateType.TEXT,
                placeholder: "Отправить сообщение",
                icon: new Icon({
                    src: '/img/attached-file.svg',
                    alt: 'Прикрепить файл',
                })
            })
    }

    render(props: IProps) {
        return this.compile(chatFooter, props);
    }
}