import Block from "../../utils/block";
import link from './link.hbs';
import './link.scss';

export default class Link extends Block {
    constructor(props: any) {
        super(props);
    }

    render(props: any) {
        return this.compile(link, props);
    }
}