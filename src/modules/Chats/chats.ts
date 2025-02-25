import Button, { ModeButton } from "../../components/Button/button.ts";
import Chat from "../../components/Chat/chat.ts";
import ChatFooter from "../../components/ChatFooter/chatFooter.ts";
import Icon from "../../components/Icon/icon.ts";
import Input from "../../components/Input/input.ts";
import Message from "../../components/Message/message.ts";
import PopupChat from "../../components/PopupChat/popupChat.ts";
import ChatsController from "../../controllers/chatsController.ts";
import { IChat } from "../../models/chat.ts";
import { IMessage } from "../../models/message.ts";
import { IChatUser } from "../../models/profile.ts";
import { RouterPath } from "../../models/router.ts";
import { StoreEnum } from "../../models/store.ts";
import { IUser } from "../../models/user.ts";
import chats from "../../pages/chats.hbs";
import { BASE_URL_RESOURCE } from "../../utils/HTTPTransport.ts";
import Block, { IProps } from "../../utils/block.ts";
import { Connect } from "../../utils/connect.ts";
import Router from "../../utils/router.ts";
import Store, { StoreType } from "../../utils/store.ts";
import { ValidateType, validateForm } from "../../utils/validate.ts";
import "./chats.scss";

class Chats extends Block {
  constructor() {
    const chatFooter: Block = new ChatFooter();
    const popupCreateChat = new PopupChat({
      header: "Создание чата",
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

          const formDataValid = validateForm<IChat & { user: number }>(popupCreateChat.children.inputs, event);

          if (formDataValid !== null) {
            this.setProps({
              isViewPopupCreateChat: false,
            });
            ChatsController.createChat({ title: formDataValid.title, userId: formDataValid.user});
            (popupCreateChat.children.inputs as Block[]).forEach(input => input.setProps({ value: "" }));
          } 
        }
      }
    });
    const popupAddUser = new PopupChat({
      header: "Добавление пользователя в чат",
      inputs: [
        new Input({
          labelFor: "user",
          label: "ID пользователя",
          id: "user",
          name: "user",
          placeholder: "Введите ID пользователя",
        })
      ],
      button: new Button({
        title: "Добавить",
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
              isViewPopupAddUser: false,
            });
          }
        }
      }),
      events: {
        submit: (event: Event) => {
          event.stopPropagation();
          event.preventDefault();

          const formDataValid = validateForm<{ user: number }>(popupAddUser.children.inputs, event);
          const { selectedChatId } = Store.getState();

          if (formDataValid !== null) {
            this.setProps({
              isViewPopupAddUser: false,
            });

            ChatsController.addUserChat(Number(selectedChatId), formDataValid.user);
            (popupAddUser.children.inputs as Block[]).forEach(input => input.setProps({ value: "" }));
          } 
        }
      }
    });
    const popupRemoveUser = new PopupChat({
      header: "Удаление пользователя из чата",
      inputs: [
        new Input({
          labelFor: "user",
          label: "ID пользователя",
          id: "user",
          name: "user",
          placeholder: "Введите ID пользователя",
        })
      ],
      button: new Button({
        title: "Удалить",
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
              isViewPopupRemoveUser: false,
            });
          }
        }
      }),
      events: {
        submit: (event: Event) => {
          event.stopPropagation();
          event.preventDefault();

          const formDataValid = validateForm<{ user: number }>(popupRemoveUser.children.inputs, event);
          const { selectedChatId } = Store.getState();

          if (formDataValid !== null) {
            this.setProps({
              isViewPopupRemoveUser: false,
            });

            ChatsController.removeUserChat(Number(selectedChatId), formDataValid.user);
            (popupRemoveUser.children.inputs as Block[]).forEach(input => input.setProps({ value: "" }));
          } 
        }
      }
    })
    const data = {
      searchMessageIcon: new Icon({
        src: "/img/search-message.svg",
        alt: "Поиск по сообщениям",
      }),
      removeIcon: new Icon({
        src: "/img/remove.svg",
        alt: "Удалить пользователя из чата",
        events: {
          click: () => {
            this.setProps({
              isViewPopupRemoveUser: true,
            });
          }
        }
      }),
      addUserIcon: new Icon({
        src: "/img/add.svg",
        alt: "Добавить пользователя в чат",
        style: "width: 24px",
        events: {
          click: () => {
            this.setProps({
              isViewPopupAddUser: true
            });
          }
        }
      }),
      profileIcon: new Icon({
        src: "/img/profile.svg",
        alt: "Профиль",
        events: {
          click: (event: Event) => {
            event.stopPropagation();
            event.preventDefault();
            Router.go(RouterPath.SETTINGS);
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
      popupAddUser,
      popupRemoveUser
    };

    super({ ...data });
  }

  componentDidUpdate(oldProps: object, newProps: object): boolean {
    if (this.props?.chats) {
      this.children.chats = (this.props.chats as [])
        .map((chat: IChat) => ({
          ...chat,
          first_name: chat?.title,
          count: chat?.unread_count,
          events: {
            click: () => {
              Store.set(StoreEnum.SELECTED_CHAT_ID, chat.id);
              ChatsController.getChatUsers(chat.id);
              ChatsController.getMessages(Number(chat.id));
            }
          }
        }))
        .map((chat: IChat) => new Chat({ ...chat }));
    }

    const messages = this.props?.messages as IMessage | IMessage[];

    if (!!messages) {
      this.children.messages = (Array.isArray(messages) ? messages : [messages])
        .map((message: IMessage) => new Message({ ...message }));
    }

    return true;
  }

  render(props: IProps) {
    return this.compile(chats, props);
  }
}
export default Connect(Chats, (state: StoreType) => {
  return {
    chats: state?.chats,
    messages: state?.messages,
    selectedChat: state?.selectedChatId,
    usersChat: (state?.usersChat as IChatUser[])?.map((userChat) => ({
      ...userChat,
      avatar: BASE_URL_RESOURCE + userChat?.avatar
    }))
  };
})
