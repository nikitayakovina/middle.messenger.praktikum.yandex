import Block from "../../utils/block"
import Icon from "../Icon/icon";
import profile from './profile.hbs';
import './profile.scss';

export default class Profile extends Block {
    constructor(props: any) {
        const data: any = {
            arrowIcon: new Icon({
                src: '/img/arrow.svg',
                alt: 'Перейти',
            })
        };

        super({ ...props, ...data });
    }

    render(props: any) {
        return this.compile(profile, props);
    }
}