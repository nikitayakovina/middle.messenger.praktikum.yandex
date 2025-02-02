import Block, { IProps } from "../../utils/block";
import Icon from "../Icon/icon";
import profile from "./profile.hbs";
import "./profile.scss";

export default class Profile extends Block {
  constructor(props: IProps) {
    const data: IProps = {
      arrowIcon: new Icon({
        src: "/img/arrow.svg",
        alt: "Перейти",
      }),
    };

    super({ ...props, ...data });
  }

  render(props: IProps) {
    return this.compile(profile, props);
  }
}
