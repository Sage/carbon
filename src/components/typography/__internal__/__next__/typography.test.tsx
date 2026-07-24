import React from "react";
import { render, screen } from "@testing-library/react";
import Typography from ".";
import { testStyledSystemSpacing } from "../../../../__spec_helper__/__internal__/test-utils";

testStyledSystemSpacing(
  (props) => <Typography {...props}>Test</Typography>,
  () => screen.getByText("Test"),
);

describe("'p' variant", () => {
  it("should render as p element by default with correct font/color tokens", () => {
    render(<Typography variant="p">Paragraph text</Typography>);

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
    expect(paragraph).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply M size by default", () => {
    render(<Typography variant="p">Text</Typography>);

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
  });

  it("should apply large size font token when `size` is L", () => {
    render(
      <Typography variant="p" size="L">
        Text
      </Typography>,
    );

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-l)",
    );
  });

  it("should apply regular weight by default", () => {
    render(<Typography variant="p">Text</Typography>);

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
  });

  it("should apply medium weight font token when `weight` is medium", () => {
    render(
      <Typography variant="p" weight="medium">
        Text
      </Typography>,
    );

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-medium-m)",
    );
  });

  it("should apply default tint color token by default", () => {
    render(<Typography variant="p">Text</Typography>);

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply alt tint color token when `tint` is alt", () => {
    render(
      <Typography variant="p" tint="alt">
        Text
      </Typography>,
    );

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-alt)",
    );
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="p" fluid>
        Text
      </Typography>,
    );

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveStyleRule(
      "font",
      "var(--global-font-fluid-body-regular-m)",
    );
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="p" inverse>
        Text
      </Typography>,
    );

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveStyleRule(
      "color",
      "var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="p" as="h1">
        Text
      </Typography>,
    );

    const paragraph = screen.getByRole("heading", { level: 1 });

    expect(paragraph).toBeVisible();
  });
});

describe("'h1' variant", () => {
  it("should render as h1 element with correct font/color tokens", () => {
    render(<Typography variant="h1">Heading text</Typography>);

    const h1 = screen.getByRole("heading", { level: 1 });

    expect(h1).toHaveStyleRule("font", "var(--global-font-static-heading-l)");
    expect(h1).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="h1" fluid>
        Heading text
      </Typography>,
    );

    const h1 = screen.getByRole("heading", { level: 1 });

    expect(h1).toHaveStyleRule("font", "var(--global-font-fluid-heading-l)");
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="h1" inverse>
        Heading text
      </Typography>,
    );

    const h1 = screen.getByRole("heading", { level: 1 });

    expect(h1).toHaveStyleRule(
      "color",
      "var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="h1" as="h2">
        Heading text
      </Typography>,
    );

    const h1 = screen.getByRole("heading", { level: 2 });

    expect(h1).toBeVisible();
  });
});

describe("'h2' variant", () => {
  it("should render as h2 element with correct font/color tokens", () => {
    render(<Typography variant="h2">Heading text</Typography>);

    const h2 = screen.getByRole("heading", { level: 2 });

    expect(h2).toHaveStyleRule("font", "var(--global-font-static-heading-m)");
    expect(h2).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="h2" fluid>
        Heading text
      </Typography>,
    );

    const h2 = screen.getByRole("heading", { level: 2 });

    expect(h2).toHaveStyleRule("font", "var(--global-font-fluid-heading-m)");
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="h2" inverse>
        Heading text
      </Typography>,
    );

    const h2 = screen.getByRole("heading", { level: 2 });

    expect(h2).toHaveStyleRule(
      "color",
      "var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="h2" as="h3">
        Heading text
      </Typography>,
    );

    const h2 = screen.getByRole("heading", { level: 3 });

    expect(h2).toBeVisible();
  });
});

describe("'h3' variant", () => {
  it("should render as h3 element with correct font/color tokens", () => {
    render(<Typography variant="h3">Heading text</Typography>);

    const h3 = screen.getByRole("heading", { level: 3 });

    expect(h3).toHaveStyleRule("font", "var(--global-font-static-heading-s)");
    expect(h3).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="h3" fluid>
        Heading text
      </Typography>,
    );

    const h3 = screen.getByRole("heading", { level: 3 });

    expect(h3).toHaveStyleRule("font", "var(--global-font-fluid-heading-s)");
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="h3" inverse>
        Heading text
      </Typography>,
    );

    const h3 = screen.getByRole("heading", { level: 3 });

    expect(h3).toHaveStyleRule(
      "color",
      "var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="h3" as="h4">
        Heading text
      </Typography>,
    );

    const h3 = screen.getByRole("heading", { level: 4 });

    expect(h3).toBeVisible();
  });
});

describe("'h4' variant", () => {
  it("should render as h4 element with correct font/color tokens", () => {
    render(<Typography variant="h4">Heading text</Typography>);

    const h4 = screen.getByRole("heading", { level: 4 });

    expect(h4).toHaveStyleRule(
      "font",
      "var(--global-font-static-subheading-l)",
    );
    expect(h4).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="h4" fluid>
        Heading text
      </Typography>,
    );

    const h4 = screen.getByRole("heading", { level: 4 });

    expect(h4).toHaveStyleRule("font", "var(--global-font-fluid-subheading-l)");
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="h4" inverse>
        Heading text
      </Typography>,
    );

    const h4 = screen.getByRole("heading", { level: 4 });

    expect(h4).toHaveStyleRule(
      "color",
      "var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="h4" as="h5">
        Heading text
      </Typography>,
    );

    const h4 = screen.getByRole("heading", { level: 5 });

    expect(h4).toBeVisible();
  });
});

describe("'h5' variant", () => {
  it("should render as h5 element with correct font/color tokens", () => {
    render(<Typography variant="h5">Heading text</Typography>);

    const h5 = screen.getByRole("heading", { level: 5 });

    expect(h5).toHaveStyleRule(
      "font",
      "var(--global-font-static-subheading-m)",
    );
    expect(h5).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="h5" fluid>
        Heading text
      </Typography>,
    );

    const h5 = screen.getByRole("heading", { level: 5 });

    expect(h5).toHaveStyleRule("font", "var(--global-font-fluid-subheading-m)");
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="h5" inverse>
        Heading text
      </Typography>,
    );

    const h5 = screen.getByRole("heading", { level: 5 });

    expect(h5).toHaveStyleRule(
      "color",
      "var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="h5" as="h4">
        Heading text
      </Typography>,
    );

    const h5 = screen.getByRole("heading", { level: 4 });

    expect(h5).toBeVisible();
  });
});

describe("'section-heading' variant", () => {
  it("should render as h2 element with correct font/color tokens", () => {
    render(<Typography variant="section-heading">Section text</Typography>);

    const sectionHeading = screen.getByRole("heading", { level: 2 });

    expect(sectionHeading).toHaveStyleRule(
      "font",
      "var(--global-font-static-section-heading-m)",
    );
    expect(sectionHeading).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="section-heading" fluid>
        Section text
      </Typography>,
    );

    const sectionHeading = screen.getByRole("heading", { level: 2 });

    expect(sectionHeading).toHaveStyleRule(
      "font",
      "var(--global-font-fluid-section-heading-m)",
    );
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="section-heading" inverse>
        Section text
      </Typography>,
    );

    const sectionHeading = screen.getByRole("heading", { level: 2 });

    expect(sectionHeading).toHaveStyleRule(
      "color",
      "var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="section-heading" as="h3">
        Section text
      </Typography>,
    );

    const sectionHeading = screen.getByRole("heading", { level: 3 });

    expect(sectionHeading).toBeVisible();
  });
});

describe("'section-subheading' variant", () => {
  it("should render as h3 element with correct font/color tokens", () => {
    render(<Typography variant="section-subheading">Section text</Typography>);

    const sectionSubheading = screen.getByRole("heading", { level: 3 });

    expect(sectionSubheading).toHaveStyleRule(
      "font",
      "var(--global-font-static-section-heading-s)",
    );
    expect(sectionSubheading).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="section-subheading" fluid>
        Section text
      </Typography>,
    );

    const sectionSubheading = screen.getByRole("heading", { level: 3 });

    expect(sectionSubheading).toHaveStyleRule(
      "font",
      "var(--global-font-fluid-section-heading-s)",
    );
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="section-subheading" inverse>
        Section text
      </Typography>,
    );

    const sectionSubheading = screen.getByRole("heading", { level: 3 });

    expect(sectionSubheading).toHaveStyleRule(
      "color",
      "var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="section-subheading" as="h4">
        Section text
      </Typography>,
    );

    const sectionSubheading = screen.getByRole("heading", { level: 4 });

    expect(sectionSubheading).toBeVisible();
  });
});

describe("'strong' variant", () => {
  it("should render as strong element with correct font/color tokens", () => {
    render(<Typography variant="strong">Strong text</Typography>);

    const strong = screen.getByRole("strong");

    expect(strong).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-medium-m)",
    );
    expect(strong).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply M size by default", () => {
    render(<Typography variant="strong">Strong text</Typography>);

    const strong = screen.getByRole("strong");

    expect(strong).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-medium-m)",
    );
  });

  it("should apply large size font token when `size` is L", () => {
    render(
      <Typography variant="strong" size="L">
        Strong text
      </Typography>,
    );

    const strong = screen.getByRole("strong");

    expect(strong).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-medium-l)",
    );
  });

  it("should still apply medium weight font token when `weight` is regular", () => {
    render(
      <Typography variant="strong" weight="regular">
        Strong text
      </Typography>,
    );

    const strong = screen.getByRole("strong");

    expect(strong).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-medium-m)",
    );
  });

  it("should apply default tint color token by default", () => {
    render(<Typography variant="strong">Strong text</Typography>);

    const strong = screen.getByRole("strong");

    expect(strong).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply alt tint color token when `tint` is alt", () => {
    render(
      <Typography variant="strong" tint="alt">
        Strong text
      </Typography>,
    );

    const strong = screen.getByRole("strong");

    expect(strong).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-alt)",
    );
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="strong" fluid>
        Strong text
      </Typography>,
    );

    const strong = screen.getByRole("strong");

    expect(strong).toHaveStyleRule(
      "font",
      "var(--global-font-fluid-body-medium-m)",
    );
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="strong" inverse>
        Strong text
      </Typography>,
    );

    const strong = screen.getByRole("strong");

    expect(strong).toHaveStyleRule(
      "color",
      "var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="strong" as="h1">
        Strong text
      </Typography>,
    );

    const strong = screen.getByRole("heading", { level: 1 });

    expect(strong).toBeVisible();
  });
});

describe("'b' variant", () => {
  it("should render as b element with correct font/color tokens", () => {
    render(<Typography variant="b">Bold text</Typography>);

    const bold = screen.getByText("Bold text");

    expect(bold.tagName).toBe("B");

    expect(bold).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-medium-m)",
    );
    expect(bold).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply M size by default", () => {
    render(<Typography variant="b">Bold text</Typography>);

    const bold = screen.getByText("Bold text");

    expect(bold).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-medium-m)",
    );
  });

  it("should apply large size font token when `size` is L", () => {
    render(
      <Typography variant="b" size="L">
        Bold text
      </Typography>,
    );

    const bold = screen.getByText("Bold text");

    expect(bold).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-medium-l)",
    );
  });

  it("should still apply medium weight font token when `weight` is regular", () => {
    render(
      <Typography variant="b" weight="regular">
        Bold text
      </Typography>,
    );

    const bold = screen.getByText("Bold text");

    expect(bold).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-medium-m)",
    );
  });

  it("should apply default tint color token by default", () => {
    render(<Typography variant="b">Bold text</Typography>);

    const bold = screen.getByText("Bold text");

    expect(bold).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply alt tint color token when `tint` is alt", () => {
    render(
      <Typography variant="b" tint="alt">
        Bold text
      </Typography>,
    );

    const bold = screen.getByText("Bold text");

    expect(bold).toHaveStyleRule("color", "var(--container-standard-txt-alt)");
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="b" fluid>
        Bold text
      </Typography>,
    );

    const bold = screen.getByText("Bold text");

    expect(bold).toHaveStyleRule(
      "font",
      "var(--global-font-fluid-body-medium-m)",
    );
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="b" inverse>
        Bold text
      </Typography>,
    );

    const bold = screen.getByText("Bold text");

    expect(bold).toHaveStyleRule(
      "color",
      "var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="b" as="h1">
        Bold text
      </Typography>,
    );

    const bold = screen.getByRole("heading", { level: 1 });

    expect(bold).toBeVisible();
  });
});

describe("'sup' variant", () => {
  it("should render as sup element with correct font/color tokens and specific overrides", () => {
    render(<Typography variant="sup">Superscript text</Typography>);

    const sup = screen.getByRole("superscript");

    expect(sup).toHaveStyleRule("font-size", "0.75em");
    expect(sup).toHaveStyleRule("vertical-align", "super");

    expect(sup).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
    expect(sup).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply M size by default", () => {
    render(<Typography variant="sup"> Superscript text</Typography>);

    const sup = screen.getByRole("superscript");

    expect(sup).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
  });

  it("should apply large size font token when `size` is L", () => {
    render(
      <Typography variant="sup" size="L">
        Superscript text
      </Typography>,
    );

    const sup = screen.getByRole("superscript");

    expect(sup).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-l)",
    );
  });

  it("should apply regular weight by default", () => {
    render(<Typography variant="sup">Superscript text</Typography>);

    const sup = screen.getByRole("superscript");

    expect(sup).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
  });

  it("should apply medium weight font token when `weight` is medium", () => {
    render(
      <Typography variant="sup" weight="medium">
        Superscript text
      </Typography>,
    );

    const sup = screen.getByRole("superscript");

    expect(sup).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-medium-m)",
    );
  });

  it("should apply default tint color token by default", () => {
    render(<Typography variant="sup">Superscript text</Typography>);

    const sup = screen.getByRole("superscript");

    expect(sup).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply alt tint color token when `tint` is alt", () => {
    render(
      <Typography variant="sup" tint="alt">
        Superscript text
      </Typography>,
    );

    const sup = screen.getByRole("superscript");

    expect(sup).toHaveStyleRule("color", "var(--container-standard-txt-alt)");
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="sup" fluid>
        Superscript text
      </Typography>,
    );

    const sup = screen.getByRole("superscript");

    expect(sup).toHaveStyleRule(
      "font",
      "var(--global-font-fluid-body-regular-m)",
    );
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="sup" inverse>
        Superscript text
      </Typography>,
    );

    const sup = screen.getByRole("superscript");

    expect(sup).toHaveStyleRule(
      "color",
      "var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="sup" as="h1">
        Superscript text
      </Typography>,
    );

    const sup = screen.getByRole("heading", { level: 1 });

    expect(sup).toBeVisible();
  });
});

describe("'sub' variant", () => {
  it("should render as sub element with correct font/color tokens and specific overrides", () => {
    render(<Typography variant="sub">Subscript text</Typography>);

    const sub = screen.getByRole("subscript");

    expect(sub).toHaveStyleRule("font-size", "0.75em");
    expect(sub).toHaveStyleRule("vertical-align", "sub");

    expect(sub).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
    expect(sub).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply M size by default", () => {
    render(<Typography variant="sub"> Subscript text</Typography>);

    const sub = screen.getByRole("subscript");

    expect(sub).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
  });

  it("should apply large size font token when `size` is L", () => {
    render(
      <Typography variant="sub" size="L">
        Subscript text
      </Typography>,
    );

    const sub = screen.getByRole("subscript");

    expect(sub).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-l)",
    );
  });

  it("should apply regular weight by default", () => {
    render(<Typography variant="sub">Subscript text</Typography>);

    const sub = screen.getByRole("subscript");

    expect(sub).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
  });

  it("should apply medium weight font token when `weight` is medium", () => {
    render(
      <Typography variant="sub" weight="medium">
        Subscript text
      </Typography>,
    );

    const sub = screen.getByRole("subscript");

    expect(sub).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-medium-m)",
    );
  });

  it("should apply default tint color token by default", () => {
    render(<Typography variant="sub">Subscript text</Typography>);

    const sub = screen.getByRole("subscript");

    expect(sub).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply alt tint color token when `tint` is alt", () => {
    render(
      <Typography variant="sub" tint="alt">
        Subscript text
      </Typography>,
    );

    const sub = screen.getByRole("subscript");

    expect(sub).toHaveStyleRule("color", "var(--container-standard-txt-alt)");
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="sub" fluid>
        Subscript text
      </Typography>,
    );

    const sub = screen.getByRole("subscript");

    expect(sub).toHaveStyleRule(
      "font",
      "var(--global-font-fluid-body-regular-m)",
    );
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="sub" inverse>
        Subscript text
      </Typography>,
    );

    const sub = screen.getByRole("subscript");

    expect(sub).toHaveStyleRule(
      "color",
      "var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="sub" as="h1">
        Subscript text
      </Typography>,
    );

    const sub = screen.getByRole("heading", { level: 1 });

    expect(sub).toBeVisible();
  });
});

describe("'ul' variant", () => {
  it("should render as ul element with correct font/color tokens", () => {
    render(
      <Typography variant="ul">
        <li>Unordered list</li>
      </Typography>,
    );

    const ul = screen.getByRole("list");
    expect(ul.tagName).toBe("UL");

    expect(ul).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
    expect(ul).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply M size by default", () => {
    render(
      <Typography variant="ul">
        <li>Unordered list</li>
      </Typography>,
    );

    const ul = screen.getByRole("list");

    expect(ul).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
  });

  it("should apply large size font token when `size` is L", () => {
    render(
      <Typography variant="ul" size="L">
        <li>Unordered list</li>
      </Typography>,
    );

    const ul = screen.getByRole("list");

    expect(ul).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-l)",
    );
  });

  it("should apply regular weight by default", () => {
    render(
      <Typography variant="ul">
        <li>Unordered list</li>
      </Typography>,
    );

    const ul = screen.getByRole("list");

    expect(ul).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
  });

  it("should apply medium weight font token when `weight` is medium", () => {
    render(
      <Typography variant="ul" weight="medium">
        <li>Unordered list</li>
      </Typography>,
    );

    const ul = screen.getByRole("list");

    expect(ul).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-medium-m)",
    );
  });

  it("should apply default tint color token by default", () => {
    render(
      <Typography variant="ul">
        <li>Unordered list</li>
      </Typography>,
    );

    const ul = screen.getByRole("list");

    expect(ul).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply alt tint color token when `tint` is alt", () => {
    render(
      <Typography variant="ul" tint="alt">
        <li>Unordered list</li>
      </Typography>,
    );

    const ul = screen.getByRole("list");

    expect(ul).toHaveStyleRule("color", "var(--container-standard-txt-alt)");
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="ul" fluid>
        <li>Unordered list</li>
      </Typography>,
    );

    const ul = screen.getByRole("list");

    expect(ul).toHaveStyleRule(
      "font",
      "var(--global-font-fluid-body-regular-m)",
    );
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="ul" inverse>
        <li>Unordered list</li>
      </Typography>,
    );

    const ul = screen.getByRole("list");

    expect(ul).toHaveStyleRule(
      "color",
      "var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="ul" as="h1">
        <li>Unordered list</li>
      </Typography>,
    );

    const ul = screen.getByRole("heading", { level: 1 });

    expect(ul).toBeVisible();
  });
});

describe("'ol' variant", () => {
  it("should render as ol element with correct font/color tokens", () => {
    render(
      <Typography variant="ol">
        <li>Ordered list</li>
      </Typography>,
    );

    const ol = screen.getByRole("list");
    expect(ol.tagName).toBe("OL");

    expect(ol).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
    expect(ol).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply M size by default", () => {
    render(
      <Typography variant="ol">
        <li>Ordered list</li>
      </Typography>,
    );

    const ol = screen.getByRole("list");

    expect(ol).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
  });

  it("should apply large size font token when `size` is L", () => {
    render(
      <Typography variant="ol" size="L">
        <li>Ordered list</li>
      </Typography>,
    );

    const ol = screen.getByRole("list");

    expect(ol).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-l)",
    );
  });

  it("should apply regular weight by default", () => {
    render(
      <Typography variant="ol">
        <li>Ordered list</li>
      </Typography>,
    );

    const ol = screen.getByRole("list");

    expect(ol).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
  });

  it("should apply medium weight font token when `weight` is medium", () => {
    render(
      <Typography variant="ol" weight="medium">
        <li>Ordered list</li>
      </Typography>,
    );

    const ol = screen.getByRole("list");

    expect(ol).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-medium-m)",
    );
  });

  it("should apply default tint color token by default", () => {
    render(
      <Typography variant="ol">
        <li>Ordered list</li>
      </Typography>,
    );

    const ol = screen.getByRole("list");

    expect(ol).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should apply alt tint color token when `tint` is alt", () => {
    render(
      <Typography variant="ol" tint="alt">
        <li>Ordered list</li>
      </Typography>,
    );

    const ol = screen.getByRole("list");

    expect(ol).toHaveStyleRule("color", "var(--container-standard-txt-alt)");
  });

  it("should apply fluid font token when `fluid` is true", () => {
    render(
      <Typography variant="ol" fluid>
        <li>Ordered list</li>
      </Typography>,
    );

    const ol = screen.getByRole("list");

    expect(ol).toHaveStyleRule(
      "font",
      "var(--global-font-fluid-body-regular-m)",
    );
  });

  it("should apply inverse color token when `inverse` is true", () => {
    render(
      <Typography variant="ol" inverse>
        <li>Ordered list</li>
      </Typography>,
    );

    const ol = screen.getByRole("list");

    expect(ol).toHaveStyleRule(
      "color",
      "var(--container-standard-inverse-txt-default)",
    );
  });

  it("should override element with `as` prop", () => {
    render(
      <Typography variant="ol" as="h1">
        <li>Ordered list</li>
      </Typography>,
    );

    const ol = screen.getByRole("heading", { level: 1 });

    expect(ol).toBeVisible();
  });
});

it("should apply screenReaderOnly styles when `screenReaderOnly` is true", () => {
  render(<Typography screenReaderOnly>Hidden text</Typography>);

  const element = screen.getByRole("paragraph");

  expect(element).toHaveStyleRule("border", "0");
  expect(element).toHaveStyleRule("height", "1px");
  expect(element).toHaveStyleRule("margin", "-1px");
  expect(element).toHaveStyleRule("overflow", "hidden");
  expect(element).toHaveStyleRule("padding", "0");
  expect(element).toHaveStyleRule("position", "absolute");
  expect(element).toHaveStyleRule("width", "1px");
  expect(element).toHaveStyleRule("white-space", "nowrap");
});

it.each([
  { prop: "display", value: "flex" },
  { prop: "textAlign", value: "center" },
  { prop: "textTransform", value: "uppercase" },
  { prop: "textDecoration", value: "underline" },
  { prop: "whiteSpace", value: "nowrap" },
  { prop: "wordBreak", value: "break-all" },
  { prop: "wordWrap", value: "break-word" },
  { prop: "textOverflow", value: "ellipsis" },
  { prop: "overflow", value: "hidden" },
])("should apply CSS override `$prop`=$value", ({ prop, value }) => {
  const props = { [prop]: value };
  render(<Typography {...props}>Text</Typography>);

  const element = screen.getByRole("paragraph");

  expect(element).toHaveStyleRule(
    `${prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`,
    value,
  );
});

describe("Attributes (id, aria-hidden, aria-live, role)", () => {
  it("should set id attribute when provided", () => {
    render(<Typography id="test-id">Text with ID</Typography>);

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveAttribute("id", "test-id");
  });

  it("should set aria-hidden attribute when provided", () => {
    render(<Typography aria-hidden="true">Hidden text</Typography>);

    const paragraph = screen.getByText("Hidden text");

    expect(paragraph).toHaveAttribute("aria-hidden", "true");
  });

  it("should set aria-live attribute to polite when provided", () => {
    render(<Typography aria-live="polite">Live region text</Typography>);

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveAttribute("aria-live", "polite");
  });

  it("should set aria-live attribute to assertive when provided", () => {
    render(
      <Typography aria-live="assertive">Assertive live region</Typography>,
    );

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveAttribute("aria-live", "assertive");
  });

  it("should set aria-live attribute to off when provided", () => {
    render(<Typography aria-live="off">Non-live region</Typography>);

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveAttribute("aria-live", "off");
  });

  it("should set role attribute to status when provided", () => {
    render(<Typography role="status">Status message</Typography>);

    const paragraph = screen.getByRole("status");

    expect(paragraph).toHaveAttribute("role", "status");
  });

  it("should set role attribute to alert when provided", () => {
    render(<Typography role="alert">Alert message</Typography>);

    const paragraph = screen.getByRole("alert");

    expect(paragraph).toHaveAttribute("role", "alert");
  });
});

describe("default variant behavior", () => {
  it("should render as a p element with default styling when no variant is provided", () => {
    render(<Typography>Default text</Typography>);

    const element = screen.getByRole("paragraph");

    expect(element).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
    expect(element).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });

  it("should fall back to default p element when an invalid variant is provided", () => {
    render(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Typography variant={"banana-split-supreme" as any}>
        Fallback text
      </Typography>,
    );

    const paragraph = screen.getByRole("paragraph");

    expect(paragraph).toHaveStyleRule(
      "font",
      "var(--global-font-static-body-regular-m)",
    );
    expect(paragraph).toHaveStyleRule(
      "color",
      "var(--container-standard-txt-default)",
    );
  });
});
