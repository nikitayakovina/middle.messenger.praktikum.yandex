declare module '*.hbs' {
    const template: (data: unknown) => string;
    export default template;
  }