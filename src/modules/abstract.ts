export default class AbstractClass {
    container: HTMLElement;
    template: HTMLElement | null = null;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    public render(): void {}
}
