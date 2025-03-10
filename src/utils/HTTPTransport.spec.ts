import { BASE_URL, HTTPTransport } from "./HTTPTransport";

jest.mock('./HTTPTransport');

const httpTransport = new HTTPTransport();
const endpoint = "/chats";

describe("HTTPTransport", () => {
  it("should endpoint chats contains params", async () => {
    const mockPost = jest.fn().mockResolvedValue({});
    (HTTPTransport.prototype.post as jest.Mock) = mockPost;
    const data = { key: 'value' };
    await httpTransport.post(BASE_URL + endpoint, {data});
    expect(mockPost).toHaveBeenCalledWith(BASE_URL + endpoint, { data });
  });
});
