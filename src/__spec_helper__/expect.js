import "jest-styled-components";
import { ReactWrapper } from "enzyme";

const { diff } = require("jest-matcher-utils");

expect.extend({
  toBeFocused(received) {
    const expected = document.activeElement;
    const DOMNode =
      received instanceof ReactWrapper ? received.getDOMNode() : received;
    const pass = this.equals(expected, DOMNode);
    const options = {
      isNot: this.isNot,
    };

    const hint = this.utils.matcherHint("toBeFocused", "DOMNode", "", options);

    const positive = () => {
      const diffString = diff(expected, DOMNode, {
        expand: this.expand,
      });

      return `${hint}\n\n${
        // eslint-disable-next-line multiline-ternary
        diffString && diffString.includes("- Expect")
          ? `Difference:\n\n${diffString}`
          : `Expected: ${this.utils.printExpected(
              expected
            )}\nReceived: ${this.utils.printReceived(DOMNode)}`
      }`;
    };

    const negative = () => `${hint}\n\nDOMNode should not have focus`;

    const message = pass ? negative : positive;

    return { pass, message };
  },
});
