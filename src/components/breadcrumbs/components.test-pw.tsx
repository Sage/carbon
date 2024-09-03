import React from "react";
import { Breadcrumbs, BreadcrumbsProps } from ".";
import { Crumb, CrumbProps } from "./crumb";
import Box from "../box";

const Default = (props: Partial<BreadcrumbsProps>) => {
  return (
    <Breadcrumbs {...props}>
      <Crumb href="#">Breadcrumb 1</Crumb>
      <Crumb href="#">Breadcrumb 2</Crumb>
      <Crumb href="#">Breadcrumb 3</Crumb>
      <Crumb href="#" isCurrent>
        Current Page
      </Crumb>
    </Breadcrumbs>
  );
};

const DefaultCrumb = (props: Partial<CrumbProps>) => {
  return (
    <Breadcrumbs>
      <Crumb href="#" {...props}>
        Breadcrumb 1
      </Crumb>
    </Breadcrumbs>
  );
};

const FocusedCrumbBecomesCurrent = ({ hasHref = false }) => {
  const [current, setCurrent] = React.useState(false);

  return (
    <>
      <Breadcrumbs>
        <Crumb
          href={hasHref ? "#foo" : undefined}
          onClick={() => setCurrent(true)}
          isCurrent={current}
        >
          foo
        </Crumb>
      </Breadcrumbs>
      {hasHref && <div id="foo">foo</div>}
    </>
  );
};

export const OnDarkBackground = () => {
  return (
    <Box p={2} bg="#000">
      <Breadcrumbs isDarkBackground>
        <Crumb href="#">Breadcrumb 1</Crumb>
        <Crumb href="#">Breadcrumb 2</Crumb>
        <Crumb href="#">Breadcrumb 3</Crumb>
        <Crumb href="#" isCurrent>
          Current Page
        </Crumb>
      </Breadcrumbs>
    </Box>
  );
};

export { Default, DefaultCrumb, FocusedCrumbBecomesCurrent };
