import I18n from "i18n-js";
import DateHelper from './date';
import moment from 'moment';

describe('DateHelper', () => {
  let momentValue = moment('10/10/2015', 'DD/MM/YYYY');

  beforeEach(() => {
    I18n.translations = {
      en: {
        date: { formats: { inputs: ['DD/MM/YYYY'] } }
      },

      us: {
        date: { formats: { inputs: ['MM/DD/YYYY'] } }
      }
    }
  });

  describe('parseDate', () => {
    it('parses a given date returning a moment', () => {
      let parsedDate = DateHelper.parseDate('10/10/2015');
      expect(parsedDate._d).toEqual(momentValue._d);
      expect(parsedDate._isAMomentObject).toBeTruthy();
    });

    describe('options', () => {
      let momentSpy;

      beforeEach(() => {
        momentSpy = jasmine.createSpy('moment spy');
        spyOn(DateHelper, '_moment').and.returnValue(momentSpy);
      });

      describe('sanitize', () => {
        it('when does not santize the input when false is passed', () => {
          DateHelper.parseDate('10-10-2015', { sanitize: false });
          expect(momentSpy).toHaveBeenCalledWith('10-10-2015', ['DD/MM/YYYY'], 'en', true);
        });
      });

      describe('locale', () => {
        it('overrides the default i18n locale', () => {
          DateHelper.parseDate('01/31/2015', { locale: 'us' });
          expect(momentSpy).toHaveBeenCalledWith('01/31/2015', ['DD/MM/YYYY'], 'us', true);
        });
      });

      describe('strict', () => {
        it('overrides the default strict bool', () => {
          DateHelper.parseDate('01/31/2015', { strict: false });
          expect(momentSpy).toHaveBeenCalledWith('01/31/2015', ['DD/MM/YYYY'], 'en', false);
        });
      });

      describe('formats', () => {
        it('overrides the i18n formats when passed', () => {
          DateHelper.parseDate('2016/01/01', { formats: ['YYYY/MM/DD'] });
          expect(momentSpy).toHaveBeenCalledWith('2016/01/01', ['YYYY/MM/DD'], 'en', true);
        });
      });
    });
  });

  describe('sanitizeDateInput', () => {
    it('removes all non alphanumeric characters and non separators', () => {
      expect(DateHelper.sanitizeDateInput('Te¢s$T123*')).toEqual('test123');
      expect(DateHelper.sanitizeDateInput('Te¢s$T/123*')).toEqual('test/123');
    });

    it('replaces all common separators with forward slashes', () => {
      expect(DateHelper.sanitizeDateInput('-')).toEqual('/');
      expect(DateHelper.sanitizeDateInput('.')).toEqual('/');
      expect(DateHelper.sanitizeDateInput(' ')).toEqual('/');
    });
  });

  describe('dateFormats', () => {
    it('returns the i18n date formats', () => {
      expect(DateHelper.dateFormats()).toEqual(['DD/MM/YYYY']);
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
  });

  describe('todayFormatted', () => {
    it('returns todays date in a in a set format', () => {
      expect(DateHelper.todayFormatted('DD-MM-YYYY')).toEqual(moment().format('DD-MM-YYYY'));
    });
  });

  describe('weekdaysMinified', () => {
    it('returns the days of week by locale minfied', () => {
      expect(DateHelper.weekdaysMinified()).toEqual([ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ]);
    });
  });

  fdescribe('withinRange', () => {
    let momentSpy = jasmine.createSpyObj('moment', ['format', 'add', 'subtract']);

    beforeEach(() => {
      spyOn(DateHelper, 'isValidDate').and.returnValue(true);
      momentSpy.format.and.returnValue(momentValue);
    });

    it('returns true if the date is within the given range', () => {
      let testDate = moment('15/10/2015', 'DD/MM/YYYY');
      momentSpy.add.and.returnValue(moment(momentValue).add(30, 'days').format());
      momentSpy.subtract.and.returnValue(moment(momentValue).subtract(30, 'days').format());
      expect(DateHelper.withinRange(testDate, 30, 'days')).toBeTruthy();
    });

    it('returns false if the date is outside the given range', () => {
      let testDate = moment('29/10/2015', 'DD/MM/YYYY');
      momentSpy.add.and.returnValue(moment(momentValue).add(10, 'days').format());
      momentSpy.subtract.and.returnValue(moment(momentValue).subtract(10, 'days').format());
      expect(DateHelper.withinRange(testDate, 10, 'days')).toBeFalsy();
    });
  });
});
