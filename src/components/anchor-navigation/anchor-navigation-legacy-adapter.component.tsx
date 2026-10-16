import React from "react";
import invariant from "invariant";

import AnchorNavigationItem, {
  type AnchorNavigationItemProps,
} from "./anchor-navigation-item/anchor-navigation-item.component";
import {
  AnchorNavigationContent,
  AnchorNavigationMenu,
} from "./anchor-navigation-menu.component";
import { LegacyAnchorNavigationAdapterContext } from "./anchor-navigation.context";

interface AnchorNavigationLegacyAdapterProps {
  children?: React.ReactNode;
  stickyNavigation: React.ReactNode;
}

type NavigationElement = React.ReactElement<{
  children?: React.ReactNode;
}>;

const addInitialSelectionToLegacyItems = (children: React.ReactNode) => {
  const hasOnlyNavigationItems = (nodes: React.ReactNode): boolean =>
    React.Children.toArray(nodes).every((child) => {
      if (!React.isValidElement(child)) return false;

      if (child.type === React.Fragment) {
        return hasOnlyNavigationItems(child.props.children);
      }

      return child.type === AnchorNavigationItem;
    });

  invariant(
    hasOnlyNavigationItems(children),
    "`stickyNavigation` must contain only AnchorNavigationItem components.",
  );

  const getNavigationElements = (nodes: React.ReactNode): NavigationElement[] =>
    React.Children.toArray(nodes).filter((child): child is NavigationElement =>
      React.isValidElement(child),
    );

  const hasInitiallySelectedItem = (nodes: React.ReactNode): boolean =>
    getNavigationElements(nodes).some((child) => {
      if (child.type === React.Fragment) {
        return hasInitiallySelectedItem(child.props.children);
      }

      return (
        child.type === AnchorNavigationItem &&
        (child as React.ReactElement<AnchorNavigationItemProps>).props
          .initiallySelected === true
      );
    });

  if (hasInitiallySelectedItem(children)) return children;

  let hasMarkedInitialSelection = false;

  const markFirstItemInitiallySelected = (
    nodes: React.ReactNode,
  ): React.ReactNode =>
    getNavigationElements(nodes).map((child) => {
      if (child.type === React.Fragment) {
        return React.cloneElement(
          child,
          undefined,
          markFirstItemInitiallySelected(child.props.children),
        );
      }

      if (!hasMarkedInitialSelection && child.type === AnchorNavigationItem) {
        hasMarkedInitialSelection = true;
        return React.cloneElement(
          child as React.ReactElement<AnchorNavigationItemProps>,
          { initiallySelected: true },
        );
      }

      return child;
    });

  return markFirstItemInitiallySelected(children);
};

const AnchorNavigationLegacyAdapter = ({
  children,
  stickyNavigation,
}: AnchorNavigationLegacyAdapterProps): JSX.Element => (
  <>
    <LegacyAnchorNavigationAdapterContext.Provider value>
      <AnchorNavigationMenu>
        {addInitialSelectionToLegacyItems(stickyNavigation)}
      </AnchorNavigationMenu>
    </LegacyAnchorNavigationAdapterContext.Provider>
    <AnchorNavigationContent>{children}</AnchorNavigationContent>
  </>
);

export default AnchorNavigationLegacyAdapter;
