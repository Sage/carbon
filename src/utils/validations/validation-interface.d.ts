export interface Validator {
    validate(value: any): boolean;
    message(): string;
}
