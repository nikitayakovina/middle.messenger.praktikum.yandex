import Block, { IProps } from "../../utils/block";
import profileLayout from "./profileLayout.hbs";
import "./profileLayout.scss";

export default class ProfileLayout extends Block {
  constructor(props: IProps) {
    super({ ...props });
  }

  init() {
    if (Array.isArray(this.props.inputs)) {
      this.children.inputs = this.props.inputs;
    }
    if (Array.isArray(this.props.actions)) {
      this.children.actions = this.props.actions;
    }
  }

  render(props: IProps) {
    return this.compile(profileLayout, props);
  }
}
