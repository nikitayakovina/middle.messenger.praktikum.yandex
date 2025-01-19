export default class AbstractClass {
    container: HTMLElement;
    template: HTMLElement | null;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    public render(): void {}
}