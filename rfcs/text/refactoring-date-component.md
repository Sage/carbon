- Start Date: (2021-07-28)

# Table of contents

- [Summary](#summary)
- [Basic example](#basic-example)
- [Motivation](#motivation)
- [Detailed design](#detailed-design)
  - [Replacing Momentjs](#replacing-momentjs)
  - [Continuing to use React DayPicker](#continuing-to-use-react-daypicker)
  - [Locales](#locales)
  - [Event handling](#event-handling)
  - [Support for hidden input](#support-for-hidden-input)
  - [DatePicker component](#datepicker-component)
- [Drawbacks](#drawbacks)
- [Alternatives](#alternatives)
- [Adoption strategy](#adoption-strategy)
- [How we teach this](#how-we-teach-this)

# Summary

The purpose of this document is to outline a new simplified `Date` component implementation, removing any technical debt or logic that is specifically tied to any consuming project whilst supporting consumers in being able to implement their requirements in their own codebases.

# Basic example

The new implementation will be written as a functional component and only support being used as a controlled input: it will require the implementing developer to provide `value` and `onChange` props. When the component is blurred the input value will reformat the string based on the locale supplied via an `I18nProvider`. This will allow implementation teams to implement the component as follows:

```jsx
  // my-component.component.js
  const MyComponent = () => {
    const [value, setValue] = useState("28/07/1987");

    const handleChange = (event) => {
      const { formattedValue } = event.target.value;
      setValue(formattedValue);
    };

    const handleBlur = (event) => {...}

    return (
      <I18nProvider>
        <Date
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </I18nProvider>
    );
  };
```

The remaining props intended for the input will be opt-in or have a default value. The component will also continue to support the styling props (such as `size` and spacing props) that the existing one does. Furthermore, it will continue to support the same validation interface to ensure that it can still be integrated with `formik` or whatever form library implementation teams choose to use.

```js
  inputProps = {
    onFocus,
    disabled = false,
    readOnly = false,
    autoFocus = false,
    size = "medium",
    labelHelp,
    labelAlign,
    labelInline,
    labelSpacing,
    labelWidth,
    inputWidth,
    fieldHelp,
    error,
    warning,
    info,
    placeholder,
    required,
    allowEmptyValue = false,
    ...marginSpacingProps,
  }
```

# Motivation

The current component within `carbon-react` has a significant amount of technical debt and has a lot of logic specific to a project that was previously its main consumer. For example, the component supports being used as both as a controlled and uncontrolled component which again adds to the complexity. The current implementation is also tied to using `moment` to manage the parsing and formatting of date values. However, the maintainers of the [project](https://momentjs.com/docs/#/-project-status/) have previously labelled it as a legacy project and as such will no longer be releasing new features and it will only be maintained up to the point of addressing critical security concerns. Whilst this is not necessarily something that will have a significant impact on all our consumers, we should look to implement a `Date` component that does not rely on a legacy solution as there are several lightweight alternatives. Carbon currently exports an extensive set of [date utils](https://github.com/Sage/carbon/blob/master/src/utils/helpers/date/date.js) all of which use `moment` and support a large amount of date formats for all locales which adds to the complexity of the component.  

As the number of consumers of the library has grown this has led to a lot of [issues](https://github.com/Sage/carbon/issues?q=is%3Aissue+is%3Aopen+date) being raised against the component. Some of the code was written over four years ago, and the addition of some newer features during this time have led to the code for the component being significantly bloated and therefore difficult to maintain.

# Detailed design

The date passed to the picker component can be updated through a `useEffect` hook that checks the current value in the input is both a valid format (based on the value recieved from the locale context) and parses to a valid Date. As such the component will be able to maintain a significantly reduced amount of internal state for the `selectedDate` and the `open` state for the picker component. The `DatePicker` will be baked into the `Date` component and we will surface the interface defined in the [react-day-picker](https://react-day-picker.js.org/api/DayPicker) docs via a `pickerProps` object and as such it can be moved to an `__internal__` directory: we will also include a link to `react-day-picker` documentations in our prop tables.

```jsx
  // src/components/date/date.component.js
  import {
    formatToString,
    isValidFormat,
    parseToDate,
    isValidDate,
    formatISOString,
    localeMap,
  } from "./__internal__/date-utils"

  const DateInput = ({ value, onChange, onBlur, onFocus, inputProps, pickerProps, ...rest }) => {
    const locale = useContext(LocaleContext);
    const { locale } = locale;
    const { localize, options, formats } = localeMap[locale()];
    const format = formats.javascript();
    const formats = formats.input();
    const [selectedDate, setSelectedDate] = useState(parseToDate(format));
    const [open, setOpen] = useState(false));

    useEffect(() => {
      // if value string is valid format and parses to valid date setSelectedDate to parsed value
    }, [value]);

    return (
      <div {...rest}>
        <Textbox
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          inputIcon="calendar"
          iconOnClick={handleIconClick}
          onClick={handleOnClickHandler}
          {...inputProps}
        />
        <DatePicker
          {...pickerProps}
          value={value}
          selectedDate={selectedDate}
          open={open}
          onDayClick={onDayClick}
        />
      </div>
    );
  };

  DateInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    ...inputPropsTypes,
    ...pickerPropsTypes,
  };
```

## Replacing Momentjs

As mentioned previously the `moment` project has been marked as legacy. The maintainers have documented several alternatives of which `date-fns` seems best suited for our implementation needs. It is fast, lightweight and modular, allowing us to only import the functions we need rather than the whole package of functions. It uses the existing native JavaScript date API and the functions it provides for parsing and formatting dates are immutable and pure: returning new instances rather than modifying existing parsed dates (limiting any bugs that could arise). The adoption of `date-fns` is widespread, many component libraries either use it directly or provide an abstraction with it as the default option. We will deprecate the utils that we currently export for date formatting and parsing at the same time as rewriting the component after ensuring an appropriate warning has been added in advance. Removing the utils will help streamline the codebase and move Carbon closer to being a pure UI component library.

## Continuing to use React DayPicker

Research into whether we should migrate to a new solution or continue to use `react-day-picker` revealed that the library is still widely adopted and actively maintained when [comparing](https://react.libhunt.com/react-day-picker-alternatives) it to alternatives. Furthermore, `react-day-picker` has moved away from using `moment` in `v7` in favour of `date-fns` which would mean there will be consistency between the library Carbon uses and the one the calendar picker uses. Therefore, it is reasonable to continue to use this library and look to update it to at least `v7` at the same time as rewriting the date component.

## Locales

We will remove the `date` property from the locale object passed to the `I18nProvider` component: instead we will store the formats internally and use the `locale.locale()` string to map to the formats for that given locale. The rest of the locale object must match the interface detailed in the [i18n RFC](https://github.com/Sage/carbon/blob/master/rfcs/text/i18n.md) documenting the approach. Storing the formats internally and separating valid formats by locale will lessen the amount of maintenance the component will require.

To implement translations in the new component we will leverage the locales already provided by [date-fns/locale](https://github.com/date-fns/date-fns/tree/master/src/locale), whereby the locale string can be used to map to the relevant file. The [localize](https://date-fns.org/v4.1.0/docs/I18n-Contribution-Guide#localize) properties surfaced from `date-fns` support translations for weekdays, months and so on out of the box. Whilst this would couple our implementation closely to `date-fns` if we decided later we needed to move away from it implementing a different mechanism would not be too complex.

## Event handling

The event emitted `onBlur` and `onChange` should meet the specification defined in the [onChange interface RFC](https://github.com/Sage/carbon/blob/master/rfcs/text/onChange.md) and that is also found in the current component. This will mean implementation teams will have access to both a `formattedValue` and `rawValue`: if the `event.type` is blur the `formattedValue` should be set to the reformatted value based on the selected date of the `DatePicker` which will be stored in state. If the `event.type` is anything else the `formattedValue` should be the `event.target.value`. The `rawValue` will be the ISO formatted date string or null if the input value does not parse to a valid date. This will allow the value to be stored in the backend database.

```js
  const buildEventObject = (event) => {
    const { id, name, value } = event.target;

    const parsedInputValue = parse(new Date(), format, value);

    const formattedValueString = event.type === "blur" ? formatToString(selectedDate, format) : value;
    const rawValueString = isDateValid(parseInputValue) ? formatISO(parsedInputValue) : null;

    event.target = {
      ...(name && { name }),
      ...(id && { id }),
      value: {
        formattedValue: formattedValueString,
        rawValue: rawValueString,
      },
    };

    return event;
  };
```

The `handleDayClick` callback which is used by `react-day-picker` to update the `selectedDate` should also create the same custom event object and trigger the `onChange` handler to update the input value. The event type is `click` so we will need to ensure we provide the value for `event.target.value`. 

```jsx
  const handleDayClick = (date, { disabled }, event) => {
    if (disabled) {
      return;
    }

    setSelectedDate(date);
    onChange(buildEventObject({...event, target: {...event.target, value: formatToString(date, format)}}));
  };
```

## Support for hidden input

Whilst we will continue to support the same custom event object, we will remove the `hidden` input that the current component renders. It is unlikely that many of our consumers will require it so it is acceptable to push the requirement to implement one onto those that do. This will mean we no longer have to maintain any state relating to either the `formattedValue` or `rawValue` as is done in the current component. Below is an example of how a hidden input can be implemented with the proposed new component:

```jsx
  // my-component-with-hidden-input.component.js
  const MyComponent = () => {
    const [value, setValue] = useState("28/07/1987");
    const [hiddenValue, setHiddenValue] = useState("1987-07-28");

    const handleChange = (event) => {
      const { formattedValue, rawValue } = event.target.value;
      setValue(formattedValue);
      setHiddenValue(formatToIso(rawValue));
    };

    const handleBlur = (event) => { 
      // validation can be run here
     }

    return (
      <>
        <Date
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          name="date-input"
          picker={(pickerProps) => <Picker {...pickerProps}/>}
        />
        <input
          type="hidden"
          name="date-input"
          data-element="hidden-input"
          value={hiddenValue}
        />
      </>
    );
  };
```

## DatePicker component

We will continue to use the same sub-components such as `Navbar` and `Weekday`, although they should be moved to an `__internal__` directory of the `DatePicker` component as they will never need to be directly imported by consuming projects. The [`containerProps` prop](https://react-day-picker.js.org/api/DayPicker/#containerProps) provides an interface for implementing keyboard accessibility within the picker (`tabIndex`, `onKeyDown` and so on). The [locale interface](https://react-day-picker.js.org/docs/localization) surfaced by `react-day-picker` will be integrated with `date-fns/locale` to override the translations strings. Below is an example of how translating weekdays can be achieved using the locales surfaced from `date-fns/locale`. It is also possible to generate an array of `months` based on the locale string.

```js
  const renderWeekdayElement = (weekdayElementProps) => {
    const { className, weekday } = weekdayElementProps;
    const weekdayLong = localize.day(weekday);     
    const weekdayShort = localize.day(weekday, { width: "abbreviated" });
    
    return (
      <Weekday className={className} title={weekdayLong}>
        <abbr title={weekdayLong}>{weekdayShort}</abbr>
      </Weekday>
    );
  }}
```

```js
  const months = Array.from({ length: 12 }).map((_, i) => localize.month(i))
```

We will no longer maintain the last valid value in the `DatePicker`, if a user inputs a value that cannot be parsed to a valid date, the `selectedDate` prop will be set to `undefined`.  We will also keep the same implementation the current component has with regards to rendering the `DatePicker` in a `portal` using the existing `Popover` component. To support additional features we will expose the `react-day-picker` interface via the `pickerProps`. For example, the following [feature request](https://github.com/Sage/carbon/issues/4275) can be supported this by utilising the [captionElement](https://react-day-picker.js.org/examples/elements-year-navigation) render prop, although we would implement this via a boolean prop and handle the the composition internally ustilising Carbon's existing `Select` component: below is an example of how this can be achieved.

```js
const YearMonthForm = ({
  date = new Date(),
  months,
  onChange,
  minDate,
  maxDate,
}) => {
  const currentYear = date.getFullYear();
  const toMonth = maxDate || new Date(currentYear + 10, 11);
  const fromMonth = minDate || new Date(currentYear, 0);
  const years = [];
  
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = (ev) => {
    const { year, month } = ev.target.form;

    const yearValue = year?.value || date.getFullYear();
    const monthValue = month?.value || date.getMonth();
    const dayValue = date.getDate();

    onChange(new Date(yearValue, monthValue, dayValue));
  };

  return (
    <form>
      <Select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <Option key={month} value={i}>
            {month}
          </Option>
        ))}
      </select>
      <Select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map((year) => (
          <Option key={year} value={year}>
            {year}
          </Option>
        ))}
      </select>
    </form>
  );
}
```

```jsx
  // date/__internal__/date-picker/date-picker.component.js
  import {
    localeMap,
    isValidDate,
    parseToDate
  } from "./__internal__/date-utils";

  const DatePicker = ({
    inputValue,
    selectedDate,
    setSelectedDate,
    onDayClick,
    isOpen,
    disablePortal,
    displaySelectControls,
    pickerProps
  }) => {
    const { locale } = useContext(LocaleContext);
    const { localize, options, formats } = localeMap[locale()];
    const format = formats.javascript();
    const { weekStartsOn } = options;

    if (!isOpen) return null;

    const renderCaptionElement = () => {
      const { minDate, maxDate } = pickerProps;
      return (
        <YearMonthForm
          date={selectedDate}
          months={months}
          onChange={setSelectedDate}
          minDate={minDate}
          maxDate={maxDate}
        />
      );
    };

    const captionElement = displaySelectControls ? renderCaptionElement() : undefined;

    return (
      <Popover
        ...
      >
      <StyledDatePicker>
        <DayPicker
          firstDayOfWeek={weekStartsOn}
          onDayClick={onDayClick}
          selectedDays={selectedDate}
          month={parseToDate(lastValidValue, format)}
          weekdayElement={renderWeekdayElement}
          months={months}
          captionElement={captionElement}
          {...pickerProps}
        />
      </StyledDatePicker>
    </Popover>
    );
  };
```

# Drawbacks

Carrying out this proposal will mean introducing several breaking changes. Writing the new component as a functional component will mean that any consuming project that has extended the previous class-based component will now need to update to use composition instead. By moving the `Weekday` and `Navbar` components to an `__internal__` directory we will also be making a breaking change, but this will be for the better in the long run as these components should not be directly imported by consuming projects and we can then make changes to their interfaces without needing to have them be breaking. The `Date` component is used extensively by our consumers so these breaking changes are likely to have widespread impact. Although it is certainly arguable that the current implementation has enough issues with it that this too is having significant impact.

The new proposed component will be tightly coupled to `date-fns` meaning if a better alternative becomes available, we will have a harder job migrating to it. However, writing our own internal utils that use the underlying `date-fns` interface should mitigate some of this work. Furthermore, if any issues arise with it we are reliant on support from the maintainers of `date-fns`, although it is widely adopted and maintained at present.

Currently `react-day-picker` does not support styled-components or any other CSS-in-JS so we will have to continue to apply the styles as is currently implemented in the existing component. This has the potential to create potential pain points when we do upgrade. However, the CSS classes we would be hooking into are part of the defined interface the package exposes to support customising styles and has not changed from the version we are currently using `v6.1.1` to the latest available one `v7.10.0` so we will likely have advanced warning of any changes to them.

# Alternatives

One alternative to carrying out the proposed in this document is that we do not do it at all. We continue to maintain the existing component as is, fix the bugs and look to introduce the feature requests raised. This is an option in the short-term, but the code is already bloated significantly and there are a number of regressions some of which have not been picked up by our Playwright or Chromatic tests. Therefore, it is likely that we will be revisiting the need to rewrite the component sooner rather than later.

Another option is that we refactor the existing component to simplify the code and fix the issues already raised. However, we would still need to introduce breaking changes as we plan to refactor all class-based input components to be functional anyway. As well as this, refactoring could likely prove more complex than rewriting the component: some of the legacy code outdates any of the current Carbon team and is tightly coupled with older projects.

In terms of alternate designs, we could look to alter the value emitted on event handling, other UI libraries emit a Date object for example. This was rejected as it would mean we would make migrating from the old implementation to the new component more difficult and may mean move away from what was defined in previous RFC documents. Currently our consuming projects expect to pass a string value and to receive one back, if we keep this pattern then we are not putting additional load on to them with respect to formatting the value from Date to string.

There are several date management solutions available as an alternative to `date-fns`: [Luxon](https://moment.github.io/luxon/); [Dayjs](https://day.js.org/); [js-Joda](https://js-joda.github.io/js-joda/); or using the Date object directly instead of a library. An additional option would be to integrate an abstraction for any of these potential solutions, for example [date-io](https://github.com/dmtrKovalenko/date-io) would support this. Of these options, `date-fns` is the most lightweight and will require the least integration into the new component. It is either the chosen or default option for many other UI libraries. For our requirements, it is unlikely we will need to surface an abstraction at this point as we will not be requiring implementation teams to do any configuration past what is defined in the interface and what they will need to pass in via the locale. If the need to introduce an abstraction arose it would not be too complex to refactor it to support this without introducing a breaking change.

Similarly there are a number of other options for integrating within the `DatePicker`, for example [react-datepicker](https://reactdatepicker.com/) and [react-flatpickr](https://github.com/haoxins/react-flatpickr). However, they all come with limitations: a lack of documentation, no support for CSS-in-JS and more configuration requirements with respect to locale support.

# Adoption strategy

As mentioned, this proposal will be implemented as a breaking change for the significant technical debt to be removed and to fix the existing bugs we have raised against the current implementation. In terms of how consuming projects will migrate to it, the majority of the interface should remain the same so any significant changes will be to leverage the new functionality and features.

If a project has extended the component, they will need to update their codebase to adopt composition instead: it may require additional support in this scenario to provide examples of how they can achieve the same functionality using this approach. If any of the utils have been imported and used directly, those projects that need to can include it in their own codebases.

# How we teach this

For consumers of the Carbon library there are RFCs for `onChange` and `I18nProvider` available that document some aspects of the approach proposed for the new component. The existing storybook demos and their code snippets will also be useful examples of implementing the new interface, as mentioned some additional ones demonstrating the locale support will also be worthwhile.

For Carbon developers the `date-fns` and `react-day-picker` documentation is very detailed and the adoption for both projects is widespread. By continuing to use `react-day-picker` we are limiting the amount of new technology introduced in this rewrite so for existing developers at least it should not be a steep learning curve.
