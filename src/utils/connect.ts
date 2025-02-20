import Block, { IProps } from "./block";
import Store, { StoreEvents } from "./store";

export const Connect = (component: typeof Block, mapStateToProps: any) => {
  return class extends component {
    constructor(props: IProps = {}) {
      super({ ...props, ...mapStateToProps(Store.getState()) });
      // TODO: разобраться как прокинуть чаты из localStorage
      this.setProps({ ...mapStateToProps(Store.getState()) });

      Store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(Store.getState()) });
      });
    }
  };
}