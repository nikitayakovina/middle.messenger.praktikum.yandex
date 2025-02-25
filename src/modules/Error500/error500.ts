import Error from "../../components/Error/error";

export default class Error500 extends Error {
  constructor() {
    super({ code: 500 });
  }
}
