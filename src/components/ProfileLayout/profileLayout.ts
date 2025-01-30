import Block from "../../utils/block";
import profileLayout from './profileLayout.hbs';
import './profileLayout.scss';

export default class ProfileLayout extends Block {
    constructor(props: any) {
        super({ ...props });
    }

    init() {
        // @ts-ignore
        this.children.inputs = this.props.inputs;
        // @ts-ignore
        this.children.actions = this.props.actions;
    }

    render(props: any) {
        return this.compile(profileLayout, props);
    }
}