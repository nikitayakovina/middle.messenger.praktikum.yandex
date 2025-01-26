import chats from '../../pages/chats.hbs';
import Block from '../../utils/block';
import './chats.scss';

export default class Chats extends Block {
    constructor() {
        const data = {
            
        };

        super({ ...data });
    }

    render(): void {
        this.compile(chats, this.props);
    }
}
