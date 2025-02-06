import Block, { IProps } from "../../utils/block.ts";
import link from "./link.hbs";
import "./link.scss";

export default class Link extends Block {
  constructor(props: IProps) {
    super(props);
  }

  render(props: IProps) {
    return this.compile(link, props);
  }
}
