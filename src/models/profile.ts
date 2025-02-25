export interface IProfile {
  display_name: string;
  email: string;
  first_name: string;
  login: string;
  phone: string;
  second_name: string;
}

export interface IChatUser extends IProfile {
  role: string;
  avatar: string;
}

export type IChatUserWithAvatar = Omit<IChatUser, "role">;

export interface IPassword {
  newPassword: string;
  oldPassword: string;
}
