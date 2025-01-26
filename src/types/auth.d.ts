import { IInputField } from './input';

export interface IData {
    title: string,
    inputs: IInputField[],
}

export interface IUser {
    login: string,
    password: string,
    repeat_password?: string
}