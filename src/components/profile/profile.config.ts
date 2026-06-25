export const PROFILE_SIZES = ["XS", "S", "M", "ML", "L", "XL", "XXL"] as const;
type AllProfileSizes = typeof PROFILE_SIZES;
export type ProfileSize = AllProfileSizes[number];

export default {
  XS: {
    nameFont: "var(--profile-font-heading-xs)",
    emailFontSize: "var(--fontSizes025)",
    emailLineHeight: "21px",
    textFont: "var(--global-font-static-body-regular-m)",
    detailsMarginLeft: "8px",
  },
  S: {
    nameFont: "var(--profile-font-heading-s)",
    emailFontSize: "var(--fontSizes100)",
    emailLineHeight: "21px",
    textFont: "var(--global-font-static-body-regular-m)",
    detailsMarginLeft: "8px",
  },
  M: {
    nameFont: "var(--profile-font-heading-m)",
    emailFontSize: "var(--fontSizes100)",
    emailLineHeight: "21px",
    textFont: "var(--global-font-static-body-regular-m)",
    detailsMarginLeft: "16px",
  },
  ML: {
    nameFont: "var(--profile-font-heading-ml)",
    emailFontSize: "var(--fontSizes100)",
    emailLineHeight: "21px",
    textFont: "var(--global-font-static-body-regular-m)",
    detailsMarginLeft: "24px",
  },
  L: {
    nameFont: "var(--profile-font-heading-l)",
    emailFontSize: "var(--fontSizes100)",
    emailLineHeight: "24px",
    textFont: "var(--global-font-static-body-regular-l)",
    detailsMarginLeft: "24px",
  },
  XL: {
    nameFont: "var(--profile-font-heading-xl)",
    emailFontSize: "var(--fontSizes300)",
    emailLineHeight: "24px",
    textFont: "var(--global-font-static-body-regular-l)",
    detailsMarginLeft: "32px",
  },
  XXL: {
    nameFont: "var(--profile-font-heading-xxl)",
    emailFontSize: "var(--fontSizes600)",
    emailLineHeight: "24px",
    textFont: "var(--global-font-static-body-regular-l)",
    detailsMarginLeft: "40px",
  },
};
