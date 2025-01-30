import Block from "../../utils/block";
import Icon from "../Icon/icon";
import chat from './chat.hbs';
import './chat.scss';

export default class Chat extends Block {
    constructor(props: any) {
        const data = {
            defaultAvatarIcon: new Icon({
                src: '/img/circle_gray.svg',
                alt: 'Фото профиля',
            }),
        };

        super({ ...props, ...data });
    }

    render(props: any) {
        return this.compile(chat, props);
    }
}