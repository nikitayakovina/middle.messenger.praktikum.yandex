import Block, { IProps } from "../../utils/block.ts";
import "./input.scss";
import input from "./input.hbs";
import { ValidateType, validate } from "../../utils/validate.ts";

export default class Input extends Block {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        focusout: (event: FocusEvent) => {
          const { value } = event.target as HTMLInputElement;
          const text = validate(value, props.validateType as ValidateType);
          const errorElement = Object.values(this.element.children).find((el) => el.className.includes("form-error"));

          if (errorElement) {
            if (!text?.length) {
              errorElement?.classList.remove("visible");
              errorElement.textContent = "";
              return;
            }

            errorElement.textContent = text;
            errorElement?.classList.add("visible");
          }
        },
      },
    });
  }

  render(props: IProps) {
    return this.compile(input, props);
  }
}
