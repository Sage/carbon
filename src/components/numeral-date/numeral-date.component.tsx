import React, {
  useState,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import invariant from "invariant";
import { MarginProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

import { ValidationProps } from "../../__internal__/validations";
import { filterStyledSystemMarginProps } from "../../style/utils";
import Events from "../../__internal__/utils/helpers/events";
import StyledNumeralDate from "./numeral-date.style";
import TextInput from "../textbox/__internal__/__next__";
import guid from "../../__internal__/utils/helpers/guid";
import useLocale from "../../hooks/__internal__/useLocale";
import Locale from "../../locales/locale";
import Fieldset from "../../__internal__/fieldset/__next__/fieldset.component";

const ALLOWED_DATE_FORMATS = [
  ["dd", "mm", "yyyy"],
  ["mm", "dd", "yyyy"],
  ["yyyy", "mm", "dd"],
  ["dd", "mm"],
  ["mm", "dd"],
  ["mm", "yyyy"],
] as const;

export interface NumeralDateValue {
  dd?: string;
  mm?: string;
  yyyy?: string;
}

export interface NumeralDateEvent {
  target: {
    name?: string;
    id: string;
    value: NumeralDateValue;
  };
}

export interface DateInputIds {
  day?: string;
  month?: string;
  year?: string;
}

export interface NumeralDateProps
  extends Pick<ValidationProps, "error">,
    MarginProps,
    TagProps {
  /**
   * @deprecated `adaptiveLabelBreakpoint` has been deprecated.
   * It is recommended to use `useMediaQuery` hook to implement adaptive behaviour.
   * Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set
   **/
  adaptiveLabelBreakpoint?: number;
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** If true, the component will be read-only */
  readOnly?: boolean;
  /** Array of strings to define custom input layout. */
  dateFormat?: ValidDateFormat;
  /**  Value  */
  value: NumeralDateValue;
  /** When true, enables the internal errors to be displayed */
  enableInternalError?: boolean;
  /**
   * When true, enables the internal warnings to be displayed
   * @deprecated The `enableInternalWarning` prop is deprecated and will be removed in a future release.
   **/
  enableInternalWarning?: boolean;
  /**
   * [Legacy] Help content to be displayed under an input
   * @deprecated The `fieldHelp` prop is deprecated and will be removed in a future release. Please use the `legendHint` prop instead.
   * */
  fieldHelp?: React.ReactNode;
  /** Content for the hint text below the legend. */
  legendHint?: string;
  /** `id` for events */
  id?: string;
  /** `name` for events */
  name?: string;
  /**
   * [Legacy] The content for the component's label
   * @deprecated The `label` prop is deprecated and will be removed in a future release. Please use the `legend` prop instead.
   * */
  label?: string;
  /** The content for the component's legend */
  legend?: string;
  /**
   * [Legacy] Text alignment of label
   * @deprecated Custom label alignment is no longer supported on this component.
   * */
  labelAlign?: "left" | "right";
  /**
   * Field labels alignment
   * @deprecated Custom field help alignment is no longer supported on this component.
   * */
  fieldLabelsAlign?: "left" | "right";
  /**
   * [Legacy] Text applied to label help tooltip, will be rendered as hint text when `validationRedesignOptIn` is true.
   * @deprecated The `labelHelp` prop is deprecated and will be removed in a future release.
   */
  labelHelp?: React.ReactNode;
  /**
   * [Legacy] When true, label is placed in line with an input
   * @deprecated Inline labels are no longer supported on this component.
   * */
  labelInline?: boolean;
  /**
   * [Legacy] Label width
   * @deprecated Custom label widths are no longer supported on this component.
   * */
  labelWidth?: number;
  /**
   * [Legacy] Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8)
   * @deprecated Custom label spacing is no longer supported on this component
   * */
  labelSpacing?: 1 | 2;
  /** Blur event handler */
  onBlur?: (ev: NumeralDateEvent) => void;
  /** Change event handler */
  onChange: (ev: NumeralDateEvent) => void;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** Size of an input */
  size?: "small" | "medium" | "large";
  /**
   * [Legacy] When true, validation icons will be placed on labels instead of being placed on the inputs
   * @deprecated Custom validation icon placement is no longer supported on this component.
   * */
  validationOnLabel?: boolean;
  /**
   * [Legacy] Overrides the default tooltip position
   * @deprecated Tooltips are no longer supported on this component.
   * */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /**
   * [Legacy] Aria label for rendered help component
   * @deprecated Custom help component ARIA labelling is no longer supported on this component,
   * */
  helpAriaLabel?: string;
  /**
   * A React ref to pass to the input corresponding to the day
   */
  dayRef?: React.ForwardedRef<HTMLInputElement>;
  /**
   * A React ref to pass to the input corresponding to the month
   */
  monthRef?: React.ForwardedRef<HTMLInputElement>;
  /**
   * A React ref to pass to the input corresponding to the year
   */
  yearRef?: React.ForwardedRef<HTMLInputElement>;
  /** Render the ValidationMessage above the NumeralDate inputs. */
  validationMessagePositionTop?: boolean;
  /** Allow consumers to set IDs for each of the field inputs */
  inputIds?: DateInputIds;
  /**
   * [Legacy] Indicate additional information.
   * @deprecated Information validation is no longer supported on this component.
   */
  info?: string | boolean;
  /**
   * Indicate warning information.
   * @deprecated Warning validation is deprecated and will be removed in a future release.
   */
  warning?: string | boolean;
}

export type ValidDateFormat = (typeof ALLOWED_DATE_FORMATS)[number];

export type NumeralDateHandle = {
  /* Programmatically focus the first input box. */
  focus: () => void;
} | null;

const incorrectDateFormatMessage =
  "Forbidden prop dateFormat supplied to NumeralDate. " +
  "Only one of these date formats is allowed: " +
  "['dd', 'mm', 'yyyy'], " +
  "['mm', 'dd', 'yyyy'], " +
  "['yyyy', 'mm', 'dd'], " +
  "['dd', 'mm'], " +
  "['mm', 'dd'], " +
  "['mm', 'yyyy']";

const getMonthsForLocale = (localeName: string) => {
  const year = new Date().getFullYear();
  const { format } = new Intl.DateTimeFormat(localeName, { month: "long" });

  return [...Array(12).keys()].map((m) => format(new Date(Date.UTC(year, m))));
};

const validationMessages = (
  locale: Locale,
  month?: string,
  daysInMonth?: string,
) => ({
  dd: locale.numeralDate.validation.day(
    month ? getMonthsForLocale(locale.locale())[+month - 1] : undefined,
    daysInMonth,
  ),
  mm: locale.numeralDate.validation.month(),
  yyyy: locale.numeralDate.validation.year(),
});

const getDaysInMonth = (month?: string, year?: string) => {
  if (!month || +month > 12 || +month < 1) {
    return 31;
  }
  const currentDate = new Date();
  const computedYear = +(year || currentDate.getFullYear());

  // passing 0 as the third argument ensures we handle for months being 0 indexed
  return new Date(computedYear, +month, 0).getDate();
};

const validate = (locale: Locale, { dd, mm, yyyy }: NumeralDateValue) => {
  const failed = {
    dd: "",
    mm: "",
    yyyy: "",
  };
  const daysInMonth = getDaysInMonth(mm, yyyy);

  if (dd && (+dd > daysInMonth || +dd < 1)) {
    failed.dd = validationMessages(locale, mm, String(daysInMonth)).dd;
  }

  if (mm && (+mm > 12 || +mm < 1)) {
    failed.mm = validationMessages(locale).mm;
  }

  if (yyyy && (+yyyy < 1800 || +yyyy > 2200)) {
    failed.yyyy = validationMessages(locale).yyyy;
  }

  return failed;
};

const getDateLabel = (datePart: string, locale: Locale) => {
  switch (datePart) {
    case "mm":
      return locale.numeralDate.labels.month();
    case "yyyy":
      return locale.numeralDate.labels.year();
    default:
      return locale.numeralDate.labels.day();
  }
};

/**
 * The Figma designs still use hard-coded pixel values for the input widths so we do the same here
 */
const WIDTHS = {
  default: {
    small: "48px",
    medium: "56px",
    large: "64px",
  },
  year: {
    small: "64px",
    medium: "72px",
    large: "80px",
  },
};

export const NumeralDate = forwardRef<NumeralDateHandle, NumeralDateProps>(
  (
    {
      dateFormat = ["dd", "mm", "yyyy"],
      error = "",
      size = "medium",
      disabled,
      id,
      name,
      onBlur,
      onChange,
      value,
      legend,
      legendHint,
      required,
      readOnly,
      enableInternalError,
      enableInternalWarning,
      dayRef,
      monthRef,
      yearRef,
      validationMessagePositionTop = true,
      inputIds,
      /* Deprecated props */
      label,
      labelAlign,
      fieldLabelsAlign,
      warning = "",
      labelInline,
      labelWidth,
      labelHelp,
      labelSpacing,
      fieldHelp,
      adaptiveLabelBreakpoint,
      tooltipPosition,
      helpAriaLabel,
      ...rest
    },
    ref,
  ) => {
    const locale = useLocale();

    const { current: uniqueId } = useRef(id || guid());
    const defaultInputIds = useRef({ dd: guid(), mm: guid(), yyyy: guid() });

    const actualInputIds = {
      dd: inputIds?.day ?? defaultInputIds.current.dd,
      mm: inputIds?.month ?? defaultInputIds.current.mm,
      yyyy: inputIds?.year ?? defaultInputIds.current.yyyy,
    };

    const refs = useRef<(HTMLInputElement | null)[]>(
      dateFormat.map(() => null),
    );

    const mappedLabel = legend || label;

    useImperativeHandle(ref, () => ({
      focus: () => {
        refs.current[0]?.focus();
      },
    }));

    const [internalMessages, setInternalMessages] = useState<NumeralDateValue>({
      ...Object.fromEntries(dateFormat.map((datePart) => [datePart, ""])),
    });

    const hasCorrectDateFormat = useMemo(() => {
      const isAllowed =
        !dateFormat ||
        ALLOWED_DATE_FORMATS.find(
          (allowedDateFormat) =>
            JSON.stringify(allowedDateFormat) === JSON.stringify(dateFormat),
        );
      return isAllowed;
    }, [dateFormat]);

    invariant(hasCorrectDateFormat, incorrectDateFormatMessage);

    const createCustomEventObject = (
      newValue: NumeralDateValue,
    ): NumeralDateEvent => ({
      target: {
        name,
        id: uniqueId,
        value: newValue,
      },
    });

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const isValidKey =
        Events.isNumberKey(event) ||
        Events.isTabKey(event) ||
        Events.isEnterKey(event) ||
        event.key === "Delete" ||
        event.key === "Backspace";

      if (!isValidKey) {
        event.preventDefault();
      }
    };

    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      datePart: keyof NumeralDateValue,
    ) => {
      const { value: newValue } = event.target;

      if (newValue.length <= datePart.length) {
        const newDateValue = {
          ...value,
          [datePart]: newValue,
        };

        onChange(createCustomEventObject(newDateValue));
      }
    };

    const handleBlur = () => {
      const internalValidationEnabled =
        enableInternalError || enableInternalWarning;
      /* istanbul ignore else */
      if (internalValidationEnabled) {
        setInternalMessages((prev) => ({
          ...prev,
          ...validate(locale, value),
        }));
      }
      setTimeout(() => {
        const hasBlurred = !refs.current.find(
          (r) => r === document.activeElement,
        );
        /* istanbul ignore else */
        if (onBlur && hasBlurred) {
          onBlur(createCustomEventObject(value));
        }
      }, 5);
    };

    const internalMessage = (
      Object.keys(internalMessages) as (keyof NumeralDateValue)[]
    ).reduce(
      (combinedMessage, datePart) =>
        internalMessages[datePart]
          ? `${combinedMessage + internalMessages[datePart]}\n`
          : combinedMessage,
      "",
    );
    const internalError = enableInternalError ? internalMessage + error : error;

    const internalWarning = enableInternalWarning
      ? internalMessage + warning
      : warning;

    const handleRef = (
      element: HTMLInputElement | null,
      index: number,
      inputRef: React.ForwardedRef<HTMLInputElement> | undefined,
    ) => {
      refs.current[index] = element;
      if (!inputRef) {
        return;
      }
      if (typeof inputRef === "function") {
        inputRef(element);
      } else {
        inputRef.current = element;
      }
    };

    const renderInputs = () => {
      return (
        <StyledNumeralDate onKeyDown={onKeyDown} $size={size}>
          {dateFormat.map((datePart, index) => {
            let inputRef: React.ForwardedRef<HTMLInputElement> | undefined;

            switch (datePart.slice(0, 2)) {
              case "dd":
                inputRef = dayRef;
                break;
              case "mm":
                inputRef = monthRef;
                break;
              case "yy":
                inputRef = yearRef;
                break;
              /* istanbul ignore next */
              default:
                break;
            }

            const maxWidth =
              datePart === "yyyy" ? WIDTHS.year[size] : WIDTHS.default[size];

            return (
              <div
                className={`numeral-date-wrapper${required ? " fieldset-required-input" : ""}`}
                key={datePart}
              >
                <TextInput
                  id={actualInputIds[datePart]}
                  label={getDateLabel(datePart, locale)}
                  disabled={disabled}
                  readOnly={readOnly}
                  error={!!internalError}
                  warning={!!internalWarning}
                  size={size}
                  value={value[datePart] ?? ""}
                  onChange={(e) => handleChange(e, datePart)}
                  onBlur={handleBlur}
                  ref={(element) => handleRef(element, index, inputRef)}
                  maxWidth={maxWidth}
                  required={required}
                  my={0} // prevents any form spacing being applied
                />
              </div>
            );
          })}
        </StyledNumeralDate>
      );
    };

    return (
      <Fieldset
        id={uniqueId}
        legend={mappedLabel}
        legendHint={legendHint ?? fieldHelp ?? labelHelp}
        isDisabled={disabled}
        isRequired={required}
        error={typeof internalError === "string" ? internalError : undefined}
        warning={
          typeof internalWarning === "string" ? internalWarning : undefined
        }
        validationMessagePositionTop={validationMessagePositionTop}
        name={name}
        size={size}
        {...tagComponent("numeral-date", rest)}
        {...filterStyledSystemMarginProps(rest)}
      >
        {renderInputs()}
      </Fieldset>
    );
  },
);

export default NumeralDate;
