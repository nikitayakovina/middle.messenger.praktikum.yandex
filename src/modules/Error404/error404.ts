import Error from "../../components/Error/error.ts";

export default class Error404 extends Error {
  constructor() {
    super({ code: 404 });
  }
}
