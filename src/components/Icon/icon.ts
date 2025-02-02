import Block, { IProps } from "../../utils/block";
import icon from './icon.hbs';
import './icon.scss';

export default class Icon extends Block {
    constructor(props: IProps) {
        super({ ...props });
    }

    render(props: IProps) {
        return this.compile(icon, props);
    }
}
