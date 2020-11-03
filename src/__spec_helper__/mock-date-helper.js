import moment from "moment";

/**
 * Replaces today date with specified in the argument of the "set" method.
 * Ensures that the UTC time is returned regardless of the local time.
 */
jest.mock("../utils/helpers/date", () => {
  const _DateHelper = jest.requireActual("../utils/helpers/date");

  return {
    __esModule: true,
    default: (() => {
      const mockTodayDate = "1-1-2019";
      const isoDateFormat = "YYYY-MM-DD";
      const MockedDateHelper = Object.assign({}, _DateHelper.default);

      MockedDateHelper._parseDate = (value, options) =>
        _DateHelper.default._parseDate(value, options).utc();
      MockedDateHelper.stringToDate = (value) => moment(value).utc().toDate();
      MockedDateHelper.todayFormatted = (format = isoDateFormat) => {
        return moment(mockTodayDate).utc().format(format);
      };
      MockedDateHelper.formatDateString = (value, formatTo = isoDateFormat) => {
        return moment(new Date(value).getTime()).utc().format(formatTo);
      };

      return MockedDateHelper;
    })(),
  };
});
