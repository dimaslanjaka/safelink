/**
 * safelink options
 */
export interface SafelinkOptions {
  exclude: string[] | RegExp[] | (string | RegExp)[];
  redirect?: string[] | string;
  password: string;
  verbose?: boolean;
  type: string | 'base64' | 'aes';
}

export type Nullable<T> = T | null | undefined;
