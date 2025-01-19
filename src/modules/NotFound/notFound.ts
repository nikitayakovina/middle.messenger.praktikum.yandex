import notFound from '../../pages/notFound.hbs';
import './notFound.scss';
import Handlebars from "handlebars";
import Error from '../../components/Error/error.js';
import { onCustomEvent } from '../../utils/event';
import AbstractClass from '../abstract';

Handlebars.registerPartial('Error', Error);

interface IData {
    code: string,
    text: string
}

export default class NotFound extends AbstractClass {
    template: HTMLElement | null = document.getElementById('notFound');
    code: string;

    constructor(container: HTMLElement, code: string = '500') {
        super(container);
        this.code = code;
    }

    render(): void {
        const data: IData = {
            code: this.code,
            text: this.textByCode(this.code)
        };

        this.container.innerHTML = notFound(data);

        document.getElementById('error__link')?.addEventListener('click', () => {
            onCustomEvent('chats')
        });
    }

    textByCode(code: string): string {
        return Number(code) === 404 ? 'Страница не найдена' : 'Ошибка на стороне сервера';
    }
}
