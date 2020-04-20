interface Theme {
    name: string;
    [key: string]: any;
}
export declare function isClassic({ name }: Theme): boolean;
export declare function isDLS({ name }: Theme): boolean;
