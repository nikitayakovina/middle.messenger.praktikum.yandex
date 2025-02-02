declare module '*.hbs' {
  const template: (data?: T) => string;
  export default template;
}
