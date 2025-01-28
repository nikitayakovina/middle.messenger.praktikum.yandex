import Block from "../../utils/block";
import messanger from '../../pages/messanger.hbs';

export default class Messanger extends Block {
    constructor(props: any) {
        super(props);
    }

    init() {
        // @ts-ignore
        this.children.chats = this.props.chats;
    }

    render(props: any) {
        // console.log(props)
        return this.compile(messanger, props);
    }
}