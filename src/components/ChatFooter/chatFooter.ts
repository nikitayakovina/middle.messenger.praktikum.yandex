import Block from "../../utils/block";
import Button from "../Button/button";
import Icon from "../Icon/icon";
import Input from "../Input/input";
import chatFooter from './chatFooter.hbs';
import './chatFooter.scss';

export default class ChatFooter extends Block {
    constructor(props: any) {
        const data = {
            input: new Input({
                labelFor: "message",
                label: "Отправить сообщение",
                name: "message",
                placeholder: "Отправить сообщение",
                icon: new Icon({
                    src: '/img/attached-file.svg',
                    alt: 'Прикрепить файл',
                    events: {
                        click: (event: any) => {
                            // render profile
                        }
                    }
                }),
                events: {
                    input: (event: any) => {
                        console.log(333)
                    }
                }
            }),
            send: new Button({
                type: 'submit',
                icon: new Icon({
                    src: '/img/send.svg',
                    alt: 'Отправить сообщение'
                })
            }),
        }
        super({ props, ...data });
    }

    render(props?: any) {
        return this.compile(chatFooter, props);
    }
}