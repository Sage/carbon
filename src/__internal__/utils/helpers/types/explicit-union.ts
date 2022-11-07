type WrapInObject<T> = T extends object ? T : { key: T };
type ExtractFromObject<T> = T extends { key: unknown } ? T["key"] : T;

type ExplicitUnion<T> = ExtractFromObject<WrapInObject<T>>;

export default ExplicitUnion;
