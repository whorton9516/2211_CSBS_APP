
export default class DefaultException extends error {
    constructor() {
        super("Default Exception");
        this.name = "DefaultException";
        this.code = 500;
      }
}