import { TypographyProps } from "../typography";

export const PROFILE_SIZES = ["XS", "S", "M", "ML", "L", "XL", "XXL"] as const;
type AllProfileSizes = typeof PROFILE_SIZES;
export type ProfileSize = AllProfileSizes[number];

type ProfileTypographyProps = Pick<TypographyProps, "variant" | "size">;

type ProfileConfig = Record<
  ProfileSize,
  {
    nameTypography: ProfileTypographyProps;
    emailLinkSize: "medium" | "large";
    textTypography: ProfileTypographyProps;
    detailsMarginLeft: string;
  }
>;

const profileConfigSizes = {
  XS: {
    nameTypography: {
      variant: "strong",
      size: "M",
    },
    emailLinkSize: "medium",
    textTypography: {
      variant: "p",
      size: "M",
    },
    detailsMarginLeft: "var(--spacing100)",
  },
  S: {
    nameTypography: {
      variant: "strong",
      size: "M",
    },
    emailLinkSize: "medium",
    textTypography: {
      variant: "p",
      size: "M",
    },
    detailsMarginLeft: "var(--spacing100)",
  },
  M: {
    nameTypography: {
      variant: "h4",
    },
    emailLinkSize: "medium",
    textTypography: {
      variant: "p",
      size: "M",
    },
    detailsMarginLeft: "var(--spacing200)",
  },
  ML: {
    nameTypography: {
      variant: "h4",
    },
    emailLinkSize: "medium",
    textTypography: {
      variant: "p",
      size: "M",
    },
    detailsMarginLeft: "var(--spacing300)",
  },
  L: {
    nameTypography: {
      variant: "h4",
    },
    emailLinkSize: "large",
    textTypography: {
      variant: "p",
      size: "L",
    },
    detailsMarginLeft: "var(--spacing300)",
  },
  XL: {
    nameTypography: {
      variant: "h2",
    },
    emailLinkSize: "large",
    textTypography: {
      variant: "p",
      size: "L",
    },
    detailsMarginLeft: "var(--spacing400)",
  },
  XXL: {
    nameTypography: {
      variant: "h1",
    },
    emailLinkSize: "large",
    textTypography: {
      variant: "p",
      size: "L",
    },
    detailsMarginLeft: "var(--spacing500)",
  },
} as const satisfies ProfileConfig;

export default profileConfigSizes;
