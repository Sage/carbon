import * as React from "react";

export interface PageProps {
  /** The title for the page, normally a Heading component. */
  title: React.ReactNode;
  /** This component supports children. */
  children: React.ReactNode;
}

declare function Page(props: PageProps): JSX.Element;

export default Page;
