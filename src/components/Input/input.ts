import Block, { IProps } from '../../utils/block';
import './input.scss';
import input from './input.hbs';
import { validate } from '../../utils/validate';

export default class Input extends Block {
    constructor(props: IProps) {
        super({
            ...props,
            events: {
                focusout: (event: FocusEvent) => {
                    const value = (event.target as HTMLInputElement).value;
                    // @ts-ignore
                    const text = validate(value, props.validateType);
                    const errorElement = Object.values(this.element.children).find(el => el.className.includes('form-error'));

                    if (errorElement) {
                        if (!text?.length) {
                            errorElement?.classList.remove('visible');
                            errorElement.textContent = '';
                            return;
                        }
    
                        errorElement.textContent = text;
                        errorElement?.classList.add('visible');
                    }
                }
            }
        });
    }

    render(props: IProps) {
        return this.compile(input, props);
    }
}
