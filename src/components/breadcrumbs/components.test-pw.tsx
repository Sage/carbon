import React from "react";
import { Breadcrumbs, BreadcrumbsProps } from ".";
import { Crumb } from "./crumb";

const blackBackground: React.CSSProperties = {
  backgroundColor: "rgb(0, 0, 0)",
  padding: "var(--global-space-layout-2-xs)",
};

export const Default = (props: Partial<BreadcrumbsProps>) => {
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

export const FocusedCrumbBecomesCurrent = ({ hasHref = false }) => {
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

export const Inverse = () => {
  return (
    <div style={blackBackground}>
      <Breadcrumbs inverse>
        <Crumb href="#">Breadcrumb 1</Crumb>
        <Crumb href="#">Breadcrumb 2</Crumb>
        <Crumb href="#">Breadcrumb 3</Crumb>
        <Crumb href="#" isCurrent>
          Current Page
        </Crumb>
      </Breadcrumbs>
    </div>
  );
};
