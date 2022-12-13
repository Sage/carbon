import React from "react";
import { BreadcrumbDivider, BreadcrumbsContainer } from "./breadcrumbs.style";

type CrumbProps = {
  isCurrent: Boolean;
  color: Boolean;
  href: string;
  children?: React.ReactNode;
};

const Crumb = ({ children, href, isCurrent } : CrumbProps) => (
  <div style={{ color: isCurrent ? "gray" : "" }}>
    {isCurrent ? (
      children
    ) : (<a style={{ color: isCurrent ? "" : "green" }} href={href}>{children}</a>)}
  </div>
);

type BreadcrumbsProps = {
  breadCrumbs: any;
  bc: Object;
  i: Boolean;
};

const Breadcrumbs = ({ breadCrumbs }: BreadcrumbsProps) => (
  <BreadcrumbsContainer>
    {breadCrumbs.map((bc:any, i:any) => { 
      if (i === breadCrumbs.length - 1) return bc;

      return (
        <>
          {bc}
          <BreadcrumbDivider />
        </>
      );
    })}
  </BreadcrumbsContainer>
);

const BreadcrumbsWrapper = () => {
  const breadcrumbsArray = [
    <Crumb href="#" isCurrent color>Crumb 1</Crumb>,
    <Crumb href="#" isCurrent color>Crumb 2</Crumb>, 
    <Crumb href="#" isCurrent color>Crumb 3</Crumb>,
    <Crumb isCurrent href="#" color>Crumb 4</Crumb>
  ]
  return <Breadcrumbs breadCrumbs={breadcrumbsArray} bc i />;
};


Breadcrumbs.displayName = "Breadcrumbs";
export default BreadcrumbsWrapper;
