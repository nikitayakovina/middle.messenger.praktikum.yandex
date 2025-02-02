import Block from "./block.ts";

export enum ValidateType {
  EMAIL = "email",
  LOGIN = "login",
  PASSWORD = "password",
  PHONE = "phone",
  NAME = "name",
  TEXT = "text",
}

const validateEmail = (email: string) => {
  let error: string = "";

  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/.test(email)) {
    error = "Неверный формат email.";
  }
  if (!email.includes("@")) {
    error = "Email должен содержать '@'.";
  }
  if (!email.includes(".")) {
    error = "Email должен содержать точку после '@'.";
  }
  if (/@[^.]+$/.test(email)) {
    error = "После '@' должна быть точка.";
  }
  if (!/[a-zA-Z]/.test(email.split("@")[1]?.split(".")[0] || "")) {
    error = "Перед точкой после '@' должны быть буквы.";
  }

  return error;
};

const validatePassword = (password: string) => {
  let error: string = "";

  if (password.length < 8 || password.length > 40) {
    error = "Длина пароля должна быть от 8 до 40 символов.";
  }

  if (!/[A-Z]/.test(password)) {
    error = "Пароль должен содержать хотя бы одну заглавную букву.";
  }
  if (!/\d/.test(password)) {
    error = "Пароль должен содержать хотя бы одну цифру.";
  }

  return error;
};

const validateLogin = (login: string) => {
  let error: string = "";

  if (login.length < 3 || login.length > 20) {
    error = "Длина логина должна быть от 3 до 20 символов.";
  }
  if (!/[a-zA-Z]/.test(login)) {
    error = "Должна быть хотя бы одна буква латиницы.";
  }
  if (/\s/.test(login)) {
    error = "Не должно быть пробелов.";
  }
  if (/[^a-zA-Z0-9-_]/.test(login)) {
    error = "Допустимы только буквы, цифры, дефис и нижнее подчёркивание.";
  }
  if (/^\d+$/.test(login)) {
    error = "Логин не должен состоять только из цифр.";
  }

  return error;
};

const validatePhone = (phone: string) => {
  let error: string = "";

  if (phone.length < 10 || phone.length > 15) {
    error = "Длина телефона должна быть от 10 до 15 символов.";
  }

  if (!/^\+?\d+$/.test(phone)) {
    error = "Телефон должен содержать только цифры и может начинаться с '+'.";
  }

  return error;
};

const validateName = (text: string) => {
  let error: string = "";

  if (!/^[A-ZА-ЯЁ]/.test(text)) {
    error = "Первая буква должна быть заглавной.";
  }
  if (/\s/.test(text)) {
    error = "Имя не должно содержать пробелы.";
  }
  if (/\d/.test(text)) {
    error = "Имя не должно содержать цифры.";
  }
  if (/[^a-zа-яё-]/i.test(text)) {
    error = "Допустимы только буквы и дефис.";
  }
  if (/^-|-$/.test(text)) {
    error = "Имя не должно начинаться или заканчиваться дефисом.";
  }

  return error;
};

export const validate = (value: string, type: ValidateType) => {
  if (!value.length) {
    return "Поле не может быть пустым";
  }

  switch (type) {
  case ValidateType.EMAIL:
    return validateEmail(value);

  case ValidateType.PASSWORD:
    return validatePassword(value);

  case ValidateType.PHONE:
    return validatePhone(value);

  case ValidateType.NAME:
    return validateName(value);

  case ValidateType.LOGIN:
    return validateLogin(value);

  default:
    return "";
  }
};

export const validateForm = (input: Block | Block[], event: Event) => {
  const formData = new FormData(event.target as HTMLFormElement);
  const formFields: Record<string, string> = {};

  const isValidForm = (Array.isArray(input) ? input : [input]).every(
    (block: Block) => {
      const inputElement = block.element.querySelector("input") as HTMLInputElement;
      const errorElement = block.element.querySelector(".form-error");
      const textError = validate(
        inputElement.value,
        block.props.validateType as ValidateType,
      );

      if (errorElement && textError.length) {
        errorElement.textContent = textError;
        errorElement?.classList.add("visible");

        return false;
      }

      return true;
    },
  );

  if (!isValidForm) {
    return;
  }

  formData.forEach((value, key) => {
    if (typeof value === "string") {
      formFields[key] = value;
    }
  });

  console.log(formFields);
};
