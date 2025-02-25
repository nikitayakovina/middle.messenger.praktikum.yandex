import Error from "../../components/Error/error";

export default class Error404 extends Error {
  constructor() {
    super({ code: 404 });
  }
}
