interface DataProps {
  "data-element"?: string;
  "data-role"?: string;
  [restKeys: string]: any;
}

export interface TagProps extends DataProps {
  "data-component": string;
}

/**
 * Builds props object containing top level data tags
 */
function tagComponent(componentName: string, props: DataProps): TagProps {
  const tagProps: TagProps = {
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
