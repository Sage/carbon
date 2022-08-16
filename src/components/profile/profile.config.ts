export const PROFILE_SIZES = ["XS", "S", "M", "ML", "L", "XL", "XXL"] as const;
type AllProfileSizes = typeof PROFILE_SIZES;
export type ProfileSize = AllProfileSizes[number];

export default {
  XS: {
    nameSize: "var(--fontSizes050)",
    emailSize: "var(--fontSizes025)",
    lineHeight: "12px",
    marginLeft: "16px",
    marginTop: "1px",
  },
  S: {
    nameSize: "var(--fontSizes100)",
    emailSize: "var(--fontSizes100)",
    lineHeight: "16px",
    marginLeft: "16px",
    marginTop: "1px",
  },
  M: {
    nameSize: "var(--fontSizes100)",
    emailSize: "var(--fontSizes100)",
    lineHeight: "16px",
    marginLeft: "16px",
    marginTop: "4px",
  },
  ML: {
    nameSize: "var(--fontSizes200)",
    emailSize: "var(--fontSizes100)",
    lineHeight: "20px",
    marginLeft: "24px",
    marginTop: "8px",
  },
  L: {
    nameSize: "var(--fontSizes400)",
    emailSize: "var(--fontSizes100)",
    lineHeight: "22px",
    marginLeft: "24px",
    marginTop: "14px",
  },
  XL: {
    nameSize: "var(--fontSizes600)",
    emailSize: "var(--fontSizes300)",
    lineHeight: "26px",
    marginLeft: "32px",
    marginTop: "24px",
  },
  XXL: {
    nameSize: "var(--fontSizes700)",
    emailSize: "var(--fontSizes600)",
    lineHeight: "30px",
    marginLeft: "40px",
    marginTop: "32px",
  },
};
