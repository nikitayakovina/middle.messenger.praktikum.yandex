import Block from "../../utils/block";
import button from './button.hbs';
import './button.scss';

export default class Button extends Block {
    constructor(props: any) {
        super(props);
    }

    render(props: any) {
        return this.compile(button, props);
    }
}