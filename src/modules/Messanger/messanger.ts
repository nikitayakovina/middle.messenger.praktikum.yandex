import Block, { IProps } from "../../utils/block";
import messanger from '../../pages/messanger.hbs';

export default class Messanger extends Block {
    constructor(props: IProps) {
        super(props);
    }

    init() {
        if (Array.isArray(this.props.chats)) {
            this.children.chats = this.props.chats;
        }
    }

    render(props: IProps) {
        return this.compile(messanger, props);
    }
}