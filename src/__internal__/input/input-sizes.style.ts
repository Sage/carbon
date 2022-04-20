interface SizesProps {
  height: string;
  horizontalPadding: string;
}

interface InputSizesInterface {
  [key: string]: SizesProps;
}

const InputSizes: InputSizesInterface = {
  small: {
    height: "var(--sizing400)",
    horizontalPadding: "var(--spacing100)",
  },
  medium: {
    height: "var(--sizing500)",
    horizontalPadding: "var(--spacing150)",
  },
  large: {
    height: "var(--sizing600)",
    horizontalPadding: "var(--spacing200)",
  },
};

export default InputSizes;
