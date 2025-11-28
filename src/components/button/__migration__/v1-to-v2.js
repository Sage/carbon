/**
 * Codemod to migrate Button component from v1 to v2
 *
 * Changes:
 * - Remove darkBackground, gradient-grey, gradient-white buttonType values
 * - Remove isWhite prop
 * - Remove destructive prop, replace with variant="destructive"
 * - Remove subtext prop
 * - Rename buttonType to variantType
 * - Remove href, target, rel props (convert to manual review comment)
 *
 * Usage:
 *
 * Dry run:
 *  - npx jscodeshift -t src/components/button/__migration__/v1-to-v2.js src/components/button/__migration__/test-component.tsx --parser=tsx --dry --print
 * Actual change:
 *  - npx jscodeshift -t src/components/button/__migration__/v1-to-v2.js src/components/button/__migration__/test-component.tsx --parser=tsx
 */

module.exports = function transformer(file, api) {
  // Load the codeshift module
  const j = api.jscodeshift;
  // Load the source code in the file as the root AST node
  const root = j(file.source);
  // Flag to indicate modifications are present
  let hasModifications = false;

  // Find all elements named "Button"
  root
    .find(j.JSXElement, {
      openingElement: { name: { name: "Button" } },
    })
    .forEach((path) => {
      // Pull the attributes from the element
      const { attributes } = path.value.openingElement;

      let hasDestructive = false;
      let hasHref = false;
      const removedProps = [];
      const indicesToRemove = [];

      // Process each attribute
      attributes.forEach((attr, index) => {
        // We don't care about non-custom attributes
        if (attr.type !== "JSXAttribute") return;

        // Get the prop name from the attribute
        const { name: propName } = attr.name;

        // Rename buttonType to variantType
        if (propName === "buttonType") {
          // Get the value of the prop
          const { value } = attr;

          // Check for removed buttonType values
          if (value && value.type === "Literal") {
            // Get the actual value
            const buttonTypeValue = value.value;
            // Determine if it's a candidate for removal
            if (
              ["darkBackground", "gradient-grey", "gradient-white"].includes(
                buttonTypeValue,
              )
            ) {
              // Remove this prop and add a comment
              indicesToRemove.push(index);
              removedProps.push(
                `buttonType="${buttonTypeValue}" (removed - no v2 equivalent)`,
              );
              hasModifications = true;
              return;
            }
          }

          // Rename to variantType
          attr.name.name = "variantType";
          hasModifications = true;
        }

        // Swap destructive to variant="destructive"
        if (propName === "destructive") {
          hasDestructive = true;
          // Remove the destructive prop
          indicesToRemove.push(index);
          hasModifications = true;
        }

        // Remove isWhite prop
        if (propName === "isWhite") {
          indicesToRemove.push(index);
          removedProps.push("isWhite (use inverse prop instead)");
          hasModifications = true;
        }

        // Remove subtext prop
        if (propName === "subtext") {
          indicesToRemove.push(index);
          removedProps.push("subtext (no v2 equivalent - handle manually)");
          hasModifications = true;
        }

        // Remove href, target, and rel
        if (["href", "target", "rel"].includes(propName)) {
          hasHref = true;
          removedProps.push(`${propName} (convert to Link component)`);
        }
      });

      // Remove attributes in reverse order to maintain correct indices
      indicesToRemove.reverse().forEach((index) => {
        attributes.splice(index, 1);
      });

      // Add variant="destructive" if destructive prop was present
      if (hasDestructive) {
        const variantAttr = j.jsxAttribute(
          j.jsxIdentifier("variant"),
          j.literal("destructive"),
        );
        attributes.push(variantAttr);
      }

      // Insert a comment if props need manual intervention instead of automated removal
      if (removedProps.length > 0 || hasHref) {
        const commentText = `TODO: Button migration - removed props: ${removedProps.join(", ")}`;

        // Add a comment before the component
        // Find the parent JSX element or fragment to insert comment before Button
        const parent = path.parent.value;

        if (parent.type === "JSXElement" || parent.type === "JSXFragment") {
          // Insert as a JSX expression comment
          const jsxComment = j.jsxExpressionContainer(j.jsxEmptyExpression());
          jsxComment.expression.comments = [
            j.commentBlock(` ${commentText} `, true, false),
          ];

          // Find the index of current Button in parent's children
          const childIndex = parent.children.indexOf(path.value);
          if (childIndex !== -1) {
            parent.children.splice(childIndex, 0, jsxComment);
          }
        } else {
          // Just add as a leading comment
          const leadingComments = path.value.comments || [];
          leadingComments.push(j.commentBlock(` ${commentText} `, true, false));
          path.value.comments = leadingComments;
        }
      }
    });

  return hasModifications ? root.toSource({ quote: "single" }) : null;
};

module.exports.parser = "tsx";
