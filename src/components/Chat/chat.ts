import Block from "../../utils/block";
import chat from './chat.hbs';
import './chat.scss';

export default class Chat extends Block {
    constructor(props: any) {
        super({ ...props });
    }

    render(props: any) {
        return this.compile(chat, props);
    }
}