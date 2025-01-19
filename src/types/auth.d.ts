import { IInputField } from './input';

export interface IData {
    title: string,
    inputs: IInputField[],
    footer: IFooter
}

export interface IFooter {
    title: string,
    linkText: string,
    id: string,
    link: string
}

export interface IUser {
    login: string,
    password: string,
    repeat_password?: string
}