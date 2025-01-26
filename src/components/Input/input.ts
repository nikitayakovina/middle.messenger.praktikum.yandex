import Block from '../../utils/block';
import './input.scss';
import input from './input.hbs';

export default class Input extends Block {
    constructor(props: any) {
        super(props);
    }

    render() {
        return this.compile(input, this.props);
    }
}
