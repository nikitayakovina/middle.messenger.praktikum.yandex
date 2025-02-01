import Block, { IProps } from "../../utils/block";
import Icon from "../Icon/icon";
import chat from './chat.hbs';
import './chat.scss';

export default class Chat extends Block {
    constructor(props: IProps) {
        const data = {
            defaultAvatarIcon: new Icon({
                src: '/img/circle_gray.svg',
                alt: 'Фото профиля',
            }),
        };

        super({ ...props, ...data });
    }

    render(props: IProps) {
        return this.compile(chat, props);
    }
}