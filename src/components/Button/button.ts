import Block from "../../utils/block";
import button from './button.hbs';
import buttonIcon from './buttonIcon.hbs';
import buttonLink from './buttonLink.hbs';
import './button.scss';

export enum ModeButton {
    BUTTON = "button",
    ICON = "icon",
    LINK = "link"
  };


export default class Button extends Block {
    constructor(props: any) {
        super(props);
    }

    render(props: any) {
        const { mode = ModeButton.BUTTON } = props;
        if (mode === ModeButton.ICON) {
            return this.compile(buttonIcon, props);    
        } else if (mode === ModeButton.LINK) {
            return this.compile(buttonLink, props);    
        }

        return this.compile(button, props);
    }
}