import Block from '../../utils/block';
import error from './error.hbs';
import './error.scss';

export default class Error extends Block {
    constructor(props: any) {
        const data = {
            text: Number(props.code) === 404 ? 'Страница не найдена' : 'Ошибка на стороне сервера'
        };
        
        super({ ...props, ...data });
    }

    render(props: any) {
        return this.compile(error, props);
    }
}
