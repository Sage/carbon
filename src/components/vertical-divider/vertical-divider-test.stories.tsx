import React from "react";
import VerticalDivider from "./vertical-divider.component";

export default {
  title: "Vertical Divider/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    h: {
      control: {
        type: "text",
      },
    },
    height: {
      control: {
        type: "text",
      },
    },
    tint: {
      control: {
        min: 0,
        max: 100,
        step: 1,
        type: "range",
      },
    },
    displayInline: {
      control: {
        type: "boolean",
      },
    },
  },
};

type TintRange =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63
  | 64
  | 65
  | 66
  | 67
  | 68
  | 69
  | 70
  | 71
  | 72
  | 73
  | 74
  | 75
  | 76
  | 77
  | 78
  | 79
  | 80
  | 81
  | 82
  | 83
  | 84
  | 85
  | 86
  | 87
  | 88
  | 89
  | 90
  | 91
  | 92
  | 93
  | 94
  | 95
  | 96
  | 97
  | 98
  | 99
  | 100;

interface VerticalDividerArgs {
  h: string | number;
  height: string | number;
  tint: TintRange;
  displayInline: boolean;
}

export const Default = (args: VerticalDividerArgs) => {
  return <VerticalDivider {...args} />;
};

Default.storyName = "default";
Default.args = {
  height: "80px",
  tint: 80,
  displayInline: false,
};

export const VerticalDividerComponent = (
  props: Partial<VerticalDividerArgs>
) => {
  return <VerticalDivider {...props} />;
};
