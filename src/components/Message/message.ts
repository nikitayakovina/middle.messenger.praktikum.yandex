import Block from "../../utils/block";
import message from './message.hbs';
import './message.scss';

export default class Message extends Block {
    constructor(props: any) {
        super(props);
    }

    render(props: any) {
        return this.compile(message, props);
    }

    componentDidMount() {
        console.log('!!!!!')
    }
}