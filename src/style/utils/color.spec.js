import color from "./color";
import { baseTheme } from "../themes";

const assert = (props, result) => {
  expect(
    color({
      theme: baseTheme,
      ...props,
    })
  ).toEqual(result);
};

it("changes the opacity", () => {
  assert({ opacity: "10%" }, { opacity: "10%" });
});

describe.each([
  ["color", "color"],
  ["bg", "backgroundColor"],
  ["backgroundColor", "backgroundColor"],
])("changes the color using the `%s` prop", (prop, css) => {
  it("uses the palette instead of a CSS string", () => {
    assert(
      {
        [prop]: "gold",
      },
      {
        [css]: "#FFB500",
      }
    );
  });

  it("uses theme.colors", () => {
    assert(
      {
        [prop]: "primary",
      },
      {
        [css]: "#008200",
      }
    );
  });

  it("uses theme.palette", () => {
    assert(
      {
        [prop]: "brilliantGreenTint38",
      },
      {
        [css]: "#61E961",
      }
    );
  });

  it("uses opacityAt(black)", () => {
    assert(
      {
        [prop]: "blackOpacity10",
      },
      {
        [css]: "rgba(0,0,0,0.10)",
      }
    );
  });

  it("uses opacityAt(white)", () => {
    assert(
      {
        [prop]: "whiteOpacity10",
      },
      {
        [css]: "rgba(255,255,255,0.10)",
      }
    );
  });

  it("uses CSS strings", () => {
    assert(
      {
        [prop]: "blue",
      },
      {
        [css]: "blue",
      }
    );

    assert(
      {
        [prop]: "#eee",
      },
      {
        [css]: "#eee",
      }
    );
  });
});
