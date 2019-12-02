export type Nullable<X = any> = X | null;

export interface GenericClass {
    new (...args: any[]): {};
}

export interface ObjectLiteral<P = any> {
    [k: string]: P;
}

export type Scalar = string | number | boolean;
