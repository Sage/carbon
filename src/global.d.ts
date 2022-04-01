declare module "@styled-system/prop-types";

declare module "*.svg" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}
