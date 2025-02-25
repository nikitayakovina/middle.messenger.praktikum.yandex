import Block, { IProps } from "./block.ts";
import Store, { StoreEvents, StoreType } from "./store.ts";

export const Connect = (component: typeof Block, mapStateToProps: (state: StoreType) => StoreType) => {
  return class extends component {
    constructor(props: IProps = {}) {
      super({ ...props, ...mapStateToProps(Store.getState()) });
      this.setProps({ ...mapStateToProps(Store.getState()) });

      Store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(Store.getState()) });
      });
    }
  };
}
