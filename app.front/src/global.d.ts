declare const __DEV__;
declare const __TEST__;
declare const __SERVER__;
declare const __CLIENT__;

declare module '*.svg' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content: any;
    export default content;
}

declare module '*.png' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content: any;
    export default content;
}

declare module '@bucket-of-bolts/ui';
