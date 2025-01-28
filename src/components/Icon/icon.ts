import Block from "../../utils/block";
import icon from './icon.hbs';
import './icon.scss';

export default class Icon extends Block {
    constructor(props: any) {
        super({ ...props });
    }

    render(props: any) {
        return this.compile(icon, props);
    }
}