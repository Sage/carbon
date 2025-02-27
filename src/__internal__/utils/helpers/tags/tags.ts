interface RestProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [restKeys: string]: any;
}

export interface TagProps {
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
}

interface InternalTagProps extends TagProps {
  /**
   * @private
   * @internal
   * @ignore
   * Identifier used for testing purposes, applied to the root element of the component.
   * INTERNAL USE ONLY.
   */
  "data-component"?: string;
}

/**
 * Builds props object containing top level data tags
 */
function tagComponent(
  componentName: string | undefined,
  props: TagProps & RestProps,
): InternalTagProps {
  const tagProps: InternalTagProps = {
    "data-component": componentName,
  };

  if (props["data-element"]) {
    tagProps["data-element"] = props["data-element"] as string;
  }
  if (props["data-role"]) {
    tagProps["data-role"] = props["data-role"] as string;
  }

  return tagProps;
}

export default tagComponent;
