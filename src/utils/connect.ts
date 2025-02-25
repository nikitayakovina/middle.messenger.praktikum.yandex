import Block, { IProps } from "./block";
import Store, { StoreEvents, StoreType } from "./store";

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
