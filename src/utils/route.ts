import Block, { IProps } from "./block.ts";
import { renderDom } from "./renderDom.ts";

export default class Route {
  _pathname: string;
  _blockClass: typeof Block;
  _block: Block | null;
  _props: IProps;

  constructor(pathname: string, block: typeof Block, props: IProps) {
    this._pathname = pathname;
    this._blockClass = block;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      renderDom(this._props.rootQuery as string, this._block);
      return;
    }

    this._block.show(this._props.rootQuery as string);
  }
}
