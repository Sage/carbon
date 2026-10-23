const spacingProps = new Set([
  "m",
  "mt",
  "mr",
  "mb",
  "ml",
  "mx",
  "my",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "marginX",
  "marginY",
  "p",
  "pt",
  "pr",
  "pb",
  "pl",
  "px",
  "py",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "paddingX",
  "paddingY",
]);

const tokenFirstNames = new Set(["BoxNext", "NextBox"]);

export default {
  rules: {
    "no-numeric-token-spacing": {
      meta: {
        type: "suggestion",
        docs: {
          description:
            "Prefer spacing token aliases or explicit CSS lengths on token-first Box APIs.",
        },
        schema: [],
        messages: {
          numeric:
            "Numeric spacing on {{component}} is interpreted as pixels. Use a token alias or an explicit CSS length.",
        },
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            if (
              node.name.type !== "JSXIdentifier" ||
              !tokenFirstNames.has(node.name.name)
            )
              return;
            node.attributes.forEach((attribute) => {
              if (
                attribute.type !== "JSXAttribute" ||
                !spacingProps.has(attribute.name.name)
              )
                return;
              const expression =
                attribute.value?.type === "JSXExpressionContainer"
                  ? attribute.value.expression
                  : undefined;
              if (
                expression?.type === "Literal" &&
                typeof expression.value === "number"
              ) {
                context.report({
                  node: attribute,
                  messageId: "numeric",
                  data: { component: node.name.name },
                });
              }
            });
          },
        };
      },
    },
  },
};
