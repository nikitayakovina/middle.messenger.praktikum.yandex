import Chat from '../../components/Chat/chat';
import ChatFooter from '../../components/ChatFooter/chatFooter';
import Icon from '../../components/Icon/icon';
import Input from '../../components/Input/input';
import Message from '../../components/Message/message';
import chats from '../../pages/chats.hbs';
import Block from '../../utils/block';
import './chats.scss';

export default class Chats extends Block {
    constructor() {
        const chatFooter: Block = new ChatFooter();
        const data = {
            first_name: 'Иван',
            searchMessageIcon: new Icon({
                src: '/img/search-message.svg',
                alt: 'Поиск по сообщениям',
            }),
            toggleIcon: new Icon({
                src: '/img/toggle.svg',
                alt: 'Дополнительное меню',
            }),
            defaultAvatar: new Icon({
                src: '/img/circle_gray.svg',
                alt: 'Фото профиля',
            }),
            profileIcon: new Icon({
                src: '/img/profile.svg',
                alt: 'Профиль',
                events: {
                    click: (event: any) => {
                        // render profile
                    }
                }
            }),
            newMessage: new Icon({
                src: '/img/new-chat.svg',
                alt: 'Создать сообщение',
                events: {
                    click: (event: any) => {
                        // create message
                    }
                }
            }),
            search: new Input({
                labelFor: "search",
                label: "Поиск",
                name: "search",
                placeholder: "Введите текст",
                events: {
                    input: (event: any) => {
                        // search
                    }
                }
            }),
            chatFooter,
            events: {
                submit: (event: Event) => {
                    event.preventDefault();
                    const target = event.target as HTMLElement;
                    console.log(target)
                }
            }
        };

        super({ ...data });
    }

    selectedChat(element: Element) {
        // @ts-ignore
        const selectedChat: string = element?.dataset?.id;

        document.querySelectorAll('.chat').forEach(chat => {
            chat.classList.remove('chat-active');
        })

        element.classList.add('chat-active');
    }

    init() {
        // @ts-ignore
        this.children.chats = [
            new Chat({
                first_name: 'Иван',
                last_message: 'Последнее сообщение',
                count: 2,
                time: '10:00',
                events: {
                    click: (event: Event) => {
                        // @ts-ignore
                        this.selectedChat(event.target.closest('.chat'));
                    }
                }
            }),
            new Chat({
                first_name: 'Петр',
                last_message: 'Последнее сообщение 2',
                count: 1,
                time: '12:00',
                events: {
                    click: (event: Event) => {
                        // @ts-ignore
                        this.selectedChat(event.target.closest('.chat'));
                    }
                }
            })
        ];
        this.children.messages = [
            new Message({
                text: 'Привет, как дела?',
                time: '10:00',
                isMy: false
            }),
            new Message({
                text: 'Привет! у меня все хорошо',
                time: '10:20',
                isMy: true
            }),
        ];
    }

    render(props: any) {
        return this.compile(chats, props);
    }
}
