import React from "react";
import { shallow, mount } from "enzyme";
import Icon from "../icon";
import {
  ButtonProps,
  ButtonTypes,
  SizeOptions,
} from "../button/button.component";
import StyledIcon from "../icon/icon.style";
import ButtonMinor from "./button-minor.component";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";

const render = (props: ButtonProps, renderer: typeof shallow = shallow) => {
  return renderer(<ButtonMinor {...props} />);
};

describe("when no props other than children are passed into the component", () => {
  it("renders the default props and children", () => {
    const wrapper = render({ children: "foo" });
    expect(wrapper.contains(<Icon type="filter" />)).toBeFalsy();
    expect(wrapper.props().buttonType).toEqual("secondary");
  });
});

const minorSizesPadding: [SizeOptions, string][] = [
  [
    "small",
    "var(--spacing000) var(--spacing100) var(--spacing000) var(--spacing100)",
  ],
  ["medium", "var(--spacing100)"],
  ["large", "var(--spacing100)"],
];

interface VariantColorProperties {
  background?: string;
  borderColor?: string;
  color?: string;
}

const minorColors: [ButtonTypes, VariantColorProperties][] = [
  [
    "primary",
    {
      background: "var(--colorsActionMinor500)",
      borderColor: "var(--colorsActionMinorTransparent)",
      color: "var(--colorsActionMinorYang100)",
    },
  ],
  [
    "secondary",
    {
      background: "transparent",
      borderColor: "var(--colorsActionMinor500)",
      color: "var(--colorsActionMinor500)",
    },
  ],
  [
    "tertiary",
    {
      background: "transparent",
      borderColor: "transparent",
      color: "var(--colorsActionMinor500)",
    },
  ],
  [
    "darkBackground",
    {
      borderColor: "transparent",
    },
  ],
];

describe("Button Minor", () => {
  it.each(minorSizesPadding)(
    "renders with correct spacing when size is %s the padding is %s",
    (size, padding) => {
      const wrapper = mount(<ButtonMinor size={size}>Foo</ButtonMinor>);
      assertStyleMatch({ padding }, wrapper);
    }
  );

  it.each(minorColors)(
    "renders with correct styling when buttonType is %s",
    (buttonType, styles) => {
      const wrapper = mount(
        <ButtonMinor buttonType={buttonType}>Foo</ButtonMinor>
      );
      assertStyleMatch({ ...styles }, wrapper);
    }
  );

  it("with icon and text children, icon's position is undefined", () => {
    const wrapper = mount(<ButtonMinor iconType="bin">Foo </ButtonMinor>);
    assertStyleMatch(
      {
        position: undefined,
      },
      wrapper,
      { modifier: `${StyledIcon}` }
    );
  });

  it("when icon only, icon's position is absolute", () => {
    const wrapper = mount(<ButtonMinor iconType="bin" />);
    assertStyleMatch(
      {
        position: "absolute",
      },
      wrapper,
      { modifier: `${StyledIcon}` }
    );
  });

  it("renders with destructive styling when destructive prop is passed", () => {
    const wrapper = mount(<ButtonMinor destructive>foo</ButtonMinor>);
    assertStyleMatch(
      {
        background: "transparent",
        color: "var(--colorsSemanticNegative500)",
      },
      wrapper
    );
  });

  it("renders with disabled styling when disabled prop is passed", () => {
    const wrapper = mount(<ButtonMinor disabled>foo</ButtonMinor>);
    assertStyleMatch(
      {
        background: "transparent",
        color: "var(--colorsActionMajorYin030)",
      },
      wrapper
    );
  });

  it("renders with expected border radius", () => {
    assertStyleMatch(
      {
        borderRadius: "var(--borderRadius050)",
      },
      mount(<ButtonMinor>foo</ButtonMinor>)
    );
  });
});

describe("when the fullWidth prop is provided for Button Minor component", () => {
  it.each(minorSizesPadding)(
    'applies the expected style to the "%s" button',
    () => {
      const buttonMinorComp = mount(<ButtonMinor fullWidth>foo</ButtonMinor>);
      expect(buttonMinorComp.props().fullWidth).toBeDefined();
    }
  );
});

describe("when the iconPosition prop and iconType are being passed to Button Minor component", () => {
  it.each(minorSizesPadding)(
    "renders the default props and children with the iconPosition prop set to before",
    (size, ...expectedPadding) => {
      const wrapper = mount(
        <ButtonMinor size={size} iconPosition="before" iconType="bin" />
      );
      assertStyleMatch(
        {
          padding: expectedPadding.join(" "),
        },
        wrapper
      );
    }
  );

  it.each(minorSizesPadding)(
    "renders the default props and children with the iconPosition prop set to after",
    (size, ...expectedPadding) => {
      const wrapper = mount(
        <ButtonMinor size={size} iconPosition="after" iconType="bin" />
      );
      assertStyleMatch(
        {
          padding: expectedPadding.join(" "),
        },
        wrapper
      );
    }
  );

  it.each(minorSizesPadding)(
    'applies the expected style to the "%s" button',
    () => {
      const buttonMinorComp = mount(<ButtonMinor fullWidth iconType="bin" />);
      assertStyleMatch(
        {
          width: "100%",
        },
        buttonMinorComp
      );
    }
  );
});

describe("when the fullWidth prop is provided for Button Minor component", () => {
  it.each(minorSizesPadding)(
    'applies the expected style to the "%s" button',
    () => {
      const buttonMinorComp = mount(<ButtonMinor fullWidth>foo</ButtonMinor>);
      expect(buttonMinorComp.props().fullWidth).toBeDefined();
    }
  );
});

describe("when the iconPosition prop and iconType are being passed to Button Minor component", () => {
  it.each(minorSizesPadding)(
    "renders the default props and children with the iconPosition prop set to before",
    (size, ...expectedPadding) => {
      const wrapper = mount(
        <ButtonMinor size={size} iconPosition="before" iconType="bin" />
      );
      assertStyleMatch(
        {
          padding: expectedPadding.join(" "),
        },
        wrapper
      );
    }
  );

  it.each(minorSizesPadding)(
    "renders the default props and children with the iconPosition prop set to after",
    (size, ...expectedPadding) => {
      const wrapper = mount(
        <ButtonMinor size={size} iconPosition="after" iconType="bin" />
      );
      assertStyleMatch(
        {
          padding: expectedPadding.join(" "),
        },
        wrapper
      );
    }
  );

  it.each(minorSizesPadding)(
    'applies the expected style to the "%s" button',
    () => {
      const buttonMinorComp = mount(<ButtonMinor fullWidth iconType="bin" />);
      assertStyleMatch(
        {
          width: "100%",
        },
        buttonMinorComp
      );
    }
  );
});

describe("when the fullWidth prop is provided for Button Minor component", () => {
  it.each(minorSizesPadding)(
    'applies the expected style to the "%s" button',
    () => {
      const buttonMinorComp = mount(<ButtonMinor fullWidth>foo</ButtonMinor>);
      expect(buttonMinorComp.props().fullWidth).toBeDefined();
    }
  );
});

describe("when the iconPosition prop and iconType are being passed to Button Minor component", () => {
  it.each(minorSizesPadding)(
    "renders the default props and children with the iconPosition prop set to before",
    (size, ...expectedPadding) => {
      const wrapper = mount(
        <ButtonMinor size={size} iconPosition="before" iconType="bin" />
      );
      assertStyleMatch(
        {
          padding: expectedPadding.join(" "),
        },
        wrapper
      );
    }
  );

  it.each(minorSizesPadding)(
    "renders the default props and children with the iconPosition prop set to after",
    (size, ...expectedPadding) => {
      const wrapper = mount(
        <ButtonMinor size={size} iconPosition="after" iconType="bin" />
      );
      assertStyleMatch(
        {
          padding: expectedPadding.join(" "),
        },
        wrapper
      );
    }
  );

  it.each(minorSizesPadding)(
    'applies the expected style to the "%s" button',
    () => {
      const buttonMinorComp = mount(<ButtonMinor fullWidth iconType="bin" />);
      assertStyleMatch(
        {
          width: "100%",
        },
        buttonMinorComp
      );
    }
  );
});

describe("when the fullWidth prop is provided for Button Minor component", () => {
  it.each(minorSizesPadding)(
    'applies the expected style to the "%s" button',
    () => {
      const buttonMinorComp = mount(<ButtonMinor fullWidth>foo</ButtonMinor>);
      expect(buttonMinorComp.props().fullWidth).toBeDefined();
    }
  );
});

describe("when the iconPosition prop and iconType are being passed to Button Minor component", () => {
  it.each(minorSizesPadding)(
    "renders the default props and children with the iconPosition prop set to before",
    (size, ...expectedPadding) => {
      const wrapper = mount(
        <ButtonMinor size={size} iconPosition="before" iconType="bin" />
      );
      assertStyleMatch(
        {
          padding: expectedPadding.join(" "),
        },
        wrapper
      );
    }
  );

  it.each(minorSizesPadding)(
    "renders the default props and children with the iconPosition prop set to after",
    (size, ...expectedPadding) => {
      const wrapper = mount(
        <ButtonMinor size={size} iconPosition="after" iconType="bin" />
      );
      assertStyleMatch(
        {
          padding: expectedPadding.join(" "),
        },
        wrapper
      );
    }
  );

  it.each(minorSizesPadding)(
    'applies the expected style to the "%s" button',
    () => {
      const buttonMinorComp = mount(<ButtonMinor fullWidth iconType="bin" />);
      assertStyleMatch(
        {
          width: "100%",
        },
        buttonMinorComp
      );
    }
  );
});
