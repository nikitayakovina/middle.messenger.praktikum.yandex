import chats from '../../pages/chats.hbs';
import AbstractClass from '../abstract';
import './chats.scss';

export default class Chats extends AbstractClass {
    constructor(container: HTMLElement) {
        super(container);
    }

    render(): void {
        const data = {
            
        };

        this.container.innerHTML = chats(data);
    }
}
