import Block from "../../utils/block";
import button from './button.hbs';
import './button.scss';

export default class Button extends Block {
    constructor(props: any) {
        super(props);
    }

    render() {
        return this.compile(button, this.props);
    }
}