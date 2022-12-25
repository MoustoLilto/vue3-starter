interface CatchedErrorParam extends Error {
    title: string;
    message: string;
    fileName?: string;
    stack?: string;
}
export default class CatchedError extends Error {
    title: string;
    message: string;
    fileName?: string;
    stack?: string;

    constructor({ title, message, fileName, stack }: CatchedErrorParam) {
        super(stack);
        this.name = this.constructor.name;
        this.title = title;
        this.message = message;
        this.fileName = fileName;
        this.stack = stack;
    }
}
