declare module 't-writer.js' {
  export default class Writer {
    constructor(target: Element | null, options?: WriterOptions);
    type(text: string): this;
    remove(chars: number): this;
    rest(duration: number): this;
    start(): this;
    queue: any[];
  }

  export interface WriterOptions {
    loop?: boolean;
    typeSpeed?: number;
    deleteSpeed?: number;
    delay?: number;
  }
}