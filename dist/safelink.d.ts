import { Nullable } from './resolveQueryUrl';
interface Options {
    exclude: string[] | RegExp[];
    redirect?: string[];
    password: string;
    verbose?: boolean;
    type: 'base64' | 'aes';
}
export default class safelink {
    options: Partial<Options>;
    constructor(opt: Partial<Options>);
    private isExcluded;
    parse(str: Nullable<string> | HTMLElement): string;
    resolveQueryUrl(search?: string): Partial<import("./resolveQueryUrl").resolveQueryResult>;
}
export {};
