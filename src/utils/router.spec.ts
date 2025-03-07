import Block from "./block";
import Router from "./router";
import Store from "./store";

enum RouterPathTest {
  COMPONENT1 = "/",
  COMPONENT2 = "component2",
}

beforeEach(() => {
  class Component1 extends Block {
    render() {
      return "<div>Component 1</div>";
    }
  }
  class Component2 extends Block {
    render() {
      return "<div>Component 2</div>";
    }
  }

  Router
    .use(RouterPathTest.COMPONENT1, Component1)
    .use(RouterPathTest.COMPONENT2, Component2)
    .start();

  global.history.pushState = jest.fn();
  global.history.back = jest.fn();
  global.history.forward = jest.fn();
});

describe("Router", () => {
  it("should rendering page of component1", () => {
    Router.go(RouterPathTest.COMPONENT1);
    expect(global.history.pushState).toHaveBeenCalledWith({}, "", RouterPathTest.COMPONENT1);
  });

  it("should rendering page of component2", () => {
    Router.go(RouterPathTest.COMPONENT2);
    expect(global.history.pushState).toHaveBeenCalledWith({}, "", RouterPathTest.COMPONENT2);
  });

  it("should call method back()", () => {
    jest.spyOn(Store, 'getState').mockReturnValue({ user: { id: 1, name: 'User' } });
    Router.go(RouterPathTest.COMPONENT2);
    Router.back();
    expect(global.history.back).toHaveBeenCalled();
    jest.spyOn(Store, 'getState').mockReturnValue({ user: null });
  });

  it("should call method forward()", () => {
    jest.spyOn(Store, 'getState').mockReturnValue({ user: { id: 1, name: 'User' } });
    Router.go(RouterPathTest.COMPONENT2);
    Router.back();
    Router.forward();
    expect(global.history.forward).toHaveBeenCalled();
  });
});
