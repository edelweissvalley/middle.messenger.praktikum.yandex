declare module '*.svg' {
  const value: string;

  export default value;
}

declare module 'handlebars/dist/handlebars' {
  import Handlebars from 'handlebars';

  export = Handlebars;
}
