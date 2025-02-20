export const PROFILE_SIZES = ["XS", "S", "M", "ML", "L", "XL", "XXL"] as const;
type AllProfileSizes = typeof PROFILE_SIZES;
export type ProfileSize = AllProfileSizes[number];

export default {
  XS: {
    initialSize: "var(--fontSizes050)",
    nameSize: "var(--fontSizes050)",
    emailSize: "var(--fontSizes025)",
    lineHeight: "12px",
    marginLeft: "8px",
  },
  S: {
    initialSize: "var(--fontSizes100)",
    nameSize: "var(--fontSizes100)",
    emailSize: "var(--fontSizes100)",
    lineHeight: "16px",
    marginLeft: "8px",
  },
  M: {
    initialSize: "var(--fontSizes300)",
    nameSize: "var(--fontSizes100)",
    emailSize: "var(--fontSizes100)",
    lineHeight: "16px",
    marginLeft: "16px",
  },
  ML: {
    initialSize: "var(--fontSizes600)",
    nameSize: "var(--fontSizes200)",
    emailSize: "var(--fontSizes100)",
    lineHeight: "20px",
    marginLeft: "24px",
  },
  L: {
    initialSize: "var(--fontSizes700)",
    nameSize: "var(--fontSizes400)",
    emailSize: "var(--fontSizes100)",
    lineHeight: "22px",
    marginLeft: "24px",
  },
  XL: {
    initialSize: "var(--fontSizes900)",
    nameSize: "var(--fontSizes600)",
    emailSize: "var(--fontSizes300)",
    lineHeight: "26px",
    marginLeft: "32px",
  },
  XXL: {
    initialSize: "var(--fontSizes1000)",
    nameSize: "var(--fontSizes700)",
    emailSize: "var(--fontSizes600)",
    lineHeight: "30px",
    marginLeft: "40px",
  },
};
