import Error from "../../components/Error/error.ts";

export default class Error500 extends Error {
  constructor() {
    super({ code: 500 });
  }
}
