import Block, { IProps } from "./block";
import Handlebars from "handlebars";

class Test extends Block {
  constructor(props: IProps) {
    super(props);
  }

  render(props: IProps) {
    return this.compile(Handlebars.compile(`{{ text }}`), props);
  }
}

describe("Block", () => {
  const props = {
    text: "Test",
  };
  const block = new Test(props);
  const text = block.getContent().innerHTML;

  it("should render new block", () => {
    expect(text).toBe(props.text);
  });
});