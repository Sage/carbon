// taken from answers to https://stackoverflow.com/questions/57683303/how-can-i-see-the-full-expanded-contract-of-a-typescript-type

export type ExpandOnce<T> = T extends (...args: infer A) => infer R
  ? (...args: ExpandOnce<A>) => ExpandOnce<R>
  : T extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

// note: does not appear to fully recursively expand all styled-system types. But the alternatives
// have all had worse problems.
export type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends string // special case for strings added to definition to avoid issues with expanding complex types that include strings
  ? T
  : T extends number // same for number
  ? T
  : T extends object
  ? T extends infer O
    ? { [K in keyof O]: Expand<O[K]> }
    : never
  : T;

export default Expand;
