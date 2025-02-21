import Button, { ModeButton } from "../../components/Button/button.ts";
import Chat from "../../components/Chat/chat.ts";
import ChatFooter from "../../components/ChatFooter/chatFooter.ts";
import Icon from "../../components/Icon/icon.ts";
import Input from "../../components/Input/input.ts";
import Message from "../../components/Message/message.ts";
import PopupCreateChat from "../../components/PopupCreateChat/popupCreateChat.ts";
import ChatsController from "../../controllers/chatsController.ts";
import chats from "../../pages/chats.hbs";
import Block, { IProps } from "../../utils/block.ts";
import { Connect } from "../../utils/connect.ts";
import Router from "../../utils/router.ts";
import Store from "../../utils/store.ts";
import { ValidateType, validateForm } from "../../utils/validate.ts";
import "./chats.scss";

class Chats extends Block {
  constructor() {
    const chatFooter: Block = new ChatFooter();
    const popupCreateChat = new PopupCreateChat({
      header: 'Создание чата',
      inputs: [
        new Input({
          labelFor: "title",
          label: "Наименование чата",
          id: "title",
          name: "title",
          placeholder: "Введите наименование чата",
        }),
        new Input({
          labelFor: "user",
          label: "ID пользователя",
          id: "user",
          validateType: ValidateType.NUMBER,
          name: "user",
          placeholder: "Введите ID пользователя",
        })
      ],
      button: new Button({
        title: "Создать",
        type: "submit" 
      }),
      buttonClose: new Button({
        type: "submit",
        mode: ModeButton.ICON,
        icon: new Icon({
          src: "/img/close.svg",
          alt: "Закрыть",
        }),
        events: {
          click: (event: Event) => {
            event.stopPropagation();
            event.preventDefault(); 

            this.setProps({
              isViewPopupCreateChat: false,
            });
          }
        }
      }),
      events: {
        submit: (event: Event) => {
          event.stopPropagation();
          event.preventDefault(); 

          const formDataValid = validateForm(popupCreateChat.children.inputs, event);

          if (formDataValid !== null) {
            this.setProps({
              isViewPopupCreateChat: false,
            });
            ChatsController.createChat({ title: formDataValid.title, userId: formDataValid.user});
          } 
        }
      }
    })
    const data = {
      first_name: "Иван",
      searchMessageIcon: new Icon({
        src: "/img/search-message.svg",
        alt: "Поиск по сообщениям",
      }),
      toggleIcon: new Icon({
        src: "/img/toggle.svg",
        alt: "Дополнительное меню",
      }),
      defaultAvatar: new Icon({
        src: "/img/circle_gray.svg",
        alt: "Фото профиля",
      }),
      profileIcon: new Icon({
        src: "/img/profile.svg",
        alt: "Профиль",
        events: {
          click: (event: Event) => {
            event.stopPropagation();
            event.preventDefault();
            Router.go('/settings');
          },
        },
      }),
      newMessage: new Icon({
        src: "/img/new-chat.svg",
        alt: "Создать сообщение",
        events: {
          click: () => {
            this.setProps({
              isViewPopupCreateChat: true,
            });
          }
        }
      }),
      search: new Input({
        labelFor: "search",
        label: "Поиск",
        name: "search",
        placeholder: "Введите текст",
      }),
      chatFooter,
      popupCreateChat,
    };

    super({ ...data });
  }

  selectedChat(element: HTMLElement) {
    document.querySelectorAll(".chat").forEach((chat) => {
      chat.classList.remove("chat-active");
    });

    element.classList.add("chat-active");
  }

  componentDidUpdate(oldProps: object, newProps: object): boolean {
    if (this.props?.chats) {
      this.children.chats = (this.props.chats as [])
        .map((chat: any) => ({
          ...chat,
          first_name: chat?.title,
          count: chat?.unread_count,
          events: {
            click: (event: Event) => {
              //@ts-ignore
              const { id } = event.target.dataset;
              Store.set("selectedChatId", id);
              ChatsController.getMessages(id);
            }
          }
        }))
        .map((chat: any) => new Chat({ ...chat }));
    }

    if (this.props?.messages) {
      this.children.messages = (this.props.messages as [])
        .map((message: any) => new Message({ ...message }))
    }

    return true;
  }

  render(props: IProps) {
    return this.compile(chats, props);
  }
}
export default Connect(Chats, (state: any) => {
  return { chats: state.chats, messages: state.messages };
})
