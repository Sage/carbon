import I18n from "i18n-js";
import DateHelper from './date';
import moment from 'moment';

describe('DateHelper', () => {
  beforeEach(() => {
    I18n.translations = {
      en: {
        date: { formats: { inputs: ['DD/MM/YYYY'] } }
      },

      us: {
        date: { formats: { inputs: ['MM/DD/YYYY'] } }
      }
    }
    moment.defineLocale('us', { parentLocale: 'en' });
  });

  describe('parseDate', () => {
    it('parses a given date returning a moment', () => {
      let momentValue = moment('10/10/2015', 'DD/MM/YYYY');
      let parsedDate = DateHelper.parseDate('10/10/2015');
      expect(parsedDate._d).toEqual(momentValue._d);
      expect(parsedDate._isAMomentObject).toBeTruthy();
    });

    describe('options', () => {
      describe('sanitize', () => {
        it('when does not santize the input when false is passed', () => {
          let parsedDate = DateHelper.parseDate('10-10-2015', { sanitize: false });
          expect(parsedDate.isValid()).toBeFalsy()
        });
      });

      describe('locale', () => {
        beforeAll(() => { I18n.locale = 'us' });
        afterAll(() => { I18n.locale = 'en' });

        it('overrides the default i18n locale', () => {
          I18n.locale = 'us'
          let parsedDate = DateHelper.parseDate('01/31/2015', { locale: 'us' });
          expect(parsedDate.isValid()).toBeTruthy();
          expect(parsedDate._f).toEqual('MM/DD/YYYY');
        });
      });

      describe('strict', () => {
        it('overrides the default strict bool', () => {
          let parsedDate = DateHelper.parseDate('01/31/2015', { strict: false });
          expect(parsedDate._strict).toBeFalsy();
        });
      });

      describe('formats', () => {
        it('overrides the i18n formats when passed', () => {
          let parsedDate = DateHelper.parseDate('2016/01/01', { formats: ['YYYY/MM/DD'] });
          expect(parsedDate.isValid()).toBeTruthy();
          expect(parsedDate._f).toEqual('YYYY/MM/DD');
        });
      });
    });
  });

  describe('sanitizeDateInput', () => {
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
});
