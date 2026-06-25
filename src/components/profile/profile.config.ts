import { TypographyProps } from "../typography";

export const PROFILE_SIZES = ["XS", "S", "M", "ML", "L", "XL", "XXL"] as const;
type AllProfileSizes = typeof PROFILE_SIZES;
export type ProfileSize = AllProfileSizes[number];

type ProfileTypographyProps = Pick<TypographyProps, "variant" | "size">;
type ProfileNameTypographyProps = {
  font: string;
};

type ProfileConfig = Record<
  ProfileSize,
  {
    nameTypography: ProfileNameTypographyProps;
    emailLinkSize: "medium" | "large";
    textTypography: ProfileTypographyProps;
    detailsMarginLeft: string;
  }
>;

const profileConfigSizes = {
  XS: {
    nameTypography: {
      font: "var(--profile-font-heading-xs)",
    },
    emailLinkSize: "medium",
    textTypography: {
      variant: "p",
      size: "M",
    },
    detailsMarginLeft: "var(--global-space-comp-s)",
  },
  S: {
    nameTypography: {
      font: "var(--profile-font-heading-s)",
    },
    emailLinkSize: "medium",
    textTypography: {
      variant: "p",
      size: "M",
    },
    detailsMarginLeft: "var(--global-space-comp-m)",
  },
  M: {
    nameTypography: {
      font: "var(--profile-font-heading-m)",
    },
    emailLinkSize: "medium",
    textTypography: {
      variant: "p",
      size: "M",
    },
    detailsMarginLeft: "var(--global-space-comp-l)",
  },
  ML: {
    nameTypography: {
      font: "var(--profile-font-heading-ml)",
    },
    emailLinkSize: "medium",
    textTypography: {
      variant: "p",
      size: "M",
    },
    detailsMarginLeft: "var(--global-space-comp-l)",
  },
  L: {
    nameTypography: {
      font: "var(--profile-font-heading-l)",
    },
    emailLinkSize: "large",
    textTypography: {
      variant: "p",
      size: "L",
    },
    detailsMarginLeft: "var(--global-space-comp-l)",
  },
  XL: {
    nameTypography: {
      font: "var(--profile-font-heading-xl)",
    },
    emailLinkSize: "large",
    textTypography: {
      variant: "p",
      size: "L",
    },
    detailsMarginLeft: "var(--global-space-comp-xl)",
  },
  XXL: {
    nameTypography: {
      font: "var(--profile-font-heading-xxl)",
    },
    emailLinkSize: "large",
    textTypography: {
      variant: "p",
      size: "L",
    },
    detailsMarginLeft: "var(--global-space-comp-2-xl)",
  },
} as const satisfies ProfileConfig;

export default profileConfigSizes;
