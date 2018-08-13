import I18n from 'i18n-js';
import moment from 'moment';
import DateHelper from './date';

describe('DateHelper', () => {
  beforeEach(() => {
    I18n.translations = {
      en: {
        date: { formats: { inputs: ['DD/MM/YYYY'] } }
      },

      us: {
        date: { formats: { inputs: ['MM/DD/YYYY'] } }
      }
    };
    moment.updateLocale('us', { parentLocale: 'en' });
  });

  describe('sanitizeDateInput', () => {
    it('replaces all common separators with forward slashes', () => {
      expect(DateHelper.sanitizeDateInput('-')).toEqual('/');
      expect(DateHelper.sanitizeDateInput('.')).toEqual('/');
      expect(DateHelper.sanitizeDateInput(' ')).toEqual('/');
    });
  });

  describe('isValidDate', () => {
    it('returns true when date is valid', () => {
      expect(DateHelper.isValidDate('10/12/2012')).toBeTruthy();
    });

    it('returns false whent he date is not valid', () => {
      expect(DateHelper.isValidDate('FOO')).toBeFalsy();
    });
  });

  describe('formatValue', () => {
    describe('when a valid date value', () => {
      it('returns the passed date value in the passed form', () => {
        expect(DateHelper.formatValue('10/12/2012', 'YYYY-MM-DD')).toEqual('2012-12-10');
      });
    });

    describe('when an invalid date value', () => {
      it('returns passed value', () => {
        expect(DateHelper.formatValue('FOO', 'YYYY-MM-DD')).toEqual('FOO');
      });
    });

    describe('options', () => {
      describe('sanitize', () => {
        it('does not santize the input before parsing', () => {
          expect(DateHelper.formatValue('10-10-2015', 'DD/MM/YYYY', { sanitize: false })).toEqual('10-10-2015');
        });
      });

      describe('locale', () => {
        beforeAll(() => { I18n.locale = 'us'; });
        afterAll(() => { I18n.locale = 'en'; });

        it('overrides the default i18n locale', () => {
          expect(DateHelper.formatValue('01/31/2015', 'DD/MM/YYYY', { locale: 'us' })).toEqual('31/01/2015');
        });
      });

      describe('strict', () => {
        it('overrides the default strict bool', () => {
          expect(DateHelper.formatValue('31-01-2015', 'DD/MM/YYYY', { strict: false })).toEqual('31/01/2015');
        });
      });

      describe('formats', () => {
        it('overrides the i18n formats when passed', () => {
          expect(DateHelper.formatValue('2016/01/01', 'DD/MM/YYYY', { formats: ['YYYY/MM/DD'] })).toEqual('01/01/2016');
        });
      });
    });
  });

  describe('stringToDate', () => {
    it('converts a value such as "2017-08-23" into a Javascript Date object', () => {
      const date = new Date(2017, 7, 23) // js Date month is zero indexed
      expect(DateHelper.stringToDate("2017-08-23")).toEqual(date);
    });
  });

  describe('formatDateString', () => {
    it('Formats the given date string to a specified format', () => {
      const dateString = 'Wed Aug 23 2017 12:00:00 GMT+0100 (BST)'
      expect(DateHelper.formatDateString(dateString, 'YYYY-MM-DD')).toEqual('2017-08-23')
    });
  });

  describe('todayFormatted', () => {
    it('returns todays date in a in a set format', () => {
      expect(DateHelper.todayFormatted('DD-MM-YYYY')).toEqual(moment().format('DD-MM-YYYY'));
    });
  });

  describe('weekdaysMinified', () => {
    it('returns the days of week by locale minfied', () => {
      expect(DateHelper.weekdaysMinified()).toEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
    });
  });

  describe('withinRange', () => {
    it('returns true if the date is today', () => {
      const testDate = moment().format('DD-MM-YYYY');
      expect(DateHelper.withinRange(testDate, 30, 'days')).toBeTruthy();
    });

    it('returns true if the date is within range', () => {
      const testDate = moment().add(29, 'days').format('DD-MM-YYYY');
      expect(DateHelper.withinRange(testDate, 30, 'days')).toBeTruthy();
    });

    it('returns true if the date is equal to the given range', () => {
      const testDate = moment().add(30, 'days').format('DD-MM-YYYY');
      expect(DateHelper.withinRange(testDate, 30, 'days')).toBeTruthy();
    });

    it('returns false if the date is beyond the given range', () => {
      const testDate = moment().add(31, 'days').format('DD-MM-YYYY');
      expect(DateHelper.withinRange(testDate, 30, 'days')).toBeFalsy();
    });

    it('returns false if the date is many years in the past', () => {
      const testDate = moment().add(100, 'years').format('DD-MM-YYYY');
      expect(DateHelper.withinRange(testDate, 1, 'years')).toBeFalsy();
    });
  });

  describe('withinDateRange', () => {
    it('returns true if given date is within the given range', () => {
      const candidate = "08/08/2010";
      const startDate = "08/08/2008";
      const endDate = "08/08/2012";
      expect(DateHelper.withinDateRange(candidate, startDate, endDate))
        .toBe(true);
    });

    it('returns false if given date is out of the given range', () => {
      const candidate = "02/09/1980";
      const startDate = "08/08/1990";
      const endDate = "04/09/2000";
      expect(DateHelper.withinDateRange(candidate, startDate, endDate))
        .toBe(false);
    });

    describe('invalid dates', () => {
      it('returns true for invalid value', () => {
        const candidate = "invalid date";
        const startDate = "08/08/1990";
        const endDate = "04/09/2000";
        expect(DateHelper.withinDateRange(candidate, startDate, endDate))
          .toBe(true);
      });

      describe('startDate', () => {
        it('returns true for invalid startDate', () => {
          const candidate = "02/20/2008"; 
          const startDate = "01/25/2008";
          const endDate = "02/11/2009";
          expect(DateHelper.withinDateRange(candidate, startDate, endDate))
            .toBe(true);
        });
      })

      describe('endDate', () => {
        it('returns true for invalid endDate', () => {
          const candidate = "28/11/2012"; 
          const startDate = "02/11/2009";
          const endDate = "some invalid data";
          expect(DateHelper.withinDateRange(candidate, startDate, endDate))
            .toBe(true);
        });
      });
    });

    describe('when endDate is undefined', () => {
      it('should return true', () => {
        const candidate = "17/10/1988";
        const startDate = "03/09/1963";
        console.log("****************");
        expect(DateHelper.withinDateRange(candidate, startDate, undefined))
          .toBe(true);
      });

      it('shold return false', () => {
        const candidate = "03/05/2018";
        const startDate = "04/05/2018";
        expect(DateHelper.withinDateRange(candidate, startDate, undefined))
          .toBe(false);
      });
    });

    describe('when startDate is undefined', () => {
      it('should return true', () => {
        const candidate = "10/02/2002";
        const endDate = "04/06/2008";
        expect(DateHelper.withinDateRange(candidate, undefined, endDate))
          .toBe(true);
      });
    })
  });
});
