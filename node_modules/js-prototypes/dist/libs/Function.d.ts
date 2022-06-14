/// <reference types="globals" />
interface Callable {
    (text: string): void;
    /**
     * indicator if this function was called
     */
    wasCalled?: boolean;
}
/**
 * Class Callable Decorator
 * @example
 * // definition for below classes
 * // can be called with `new`
 * new yourclass();
 * new yourclass(arg, arg1);
 * // can be called directly like function
 * yourclass();
 * yourclass(arg, arg1);
 */
export interface ClassCallable extends Callable {
    new (...args: any[]): ClassDecorator;
    new (): ClassDecorator;
}
export {};
