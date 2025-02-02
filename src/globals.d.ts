declare module "*.hbs" {
  const template: (data) => string;
  export default template;
}
