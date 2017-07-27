import Logger from './';

describe('Logger', () => {
  it('Outputs to the console', () => {
    Logger.setEnabledState(true);
    spyOn(console, 'warn');
    Logger.warn('Hello World!');
    expect(console.warn).toHaveBeenCalledWith('Hello World!');
  });

  describe('Disabled', () => {
    it('does not output to the console', () => {
      Logger.setEnabledState(false);
      spyOn(console, 'warn');
      Logger.warn('Hello World!');
      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  describe('Logger Levels', () => {
    beforeEach(() => {
      Logger.setEnabledState(true);
    });

    describe('error', () => {
      it('ouputs an error to the console', () => {
        spyOn(console, 'error');
        Logger.error('Hello World!');
        expect(console.error).toHaveBeenCalledWith('Hello World!');
      });
    });

    describe('info', () => {
      it('ouputs an info to the console', () => {
        spyOn(console, 'info');
        Logger.info('Hello World!');
        expect(console.info).toHaveBeenCalledWith('Hello World!');
      });
    });

    describe('log', () => {
      it('ouputs an log to the console', () => {
        spyOn(console, 'log');
        Logger.log('Hello World!');
        expect(console.log).toHaveBeenCalledWith('Hello World!');
      });
    });

    describe('warn', () => {
      it('ouputs an warn to the console', () => {
        spyOn(console, 'warn');
        Logger.warn('Hello World!');
        expect(console.warn).toHaveBeenCalledWith('Hello World!');
      });
    });

    describe('deprecate', () => {
      it('ouputs an warn to the console with a deprecation prefix', () => {
        spyOn(console, 'warn');
        Logger.deprecate('Hello World!');
        expect(console.warn).toHaveBeenCalledWith('[Deprecation] Hello World!');
      });
    });
  });

  describe('groups', () => {
    beforeEach(() => {
      spyOn(console, 'warn');
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('creates a group and console logs after a delay', () => {
      Logger.deprecate('One', { group: 'test' });
      Logger.deprecate('Two', { group: 'test' });
      Logger.deprecate('Three', { group: 'test' });
      Logger.deprecate('Four', { group: 'different group' });
      expect(console.warn).not.toHaveBeenCalled();
      jasmine.clock().tick(500);
      expect(console.warn).toHaveBeenCalledWith('[Deprecation] One', {
        all: ['[Deprecation] One', '[Deprecation] Two', '[Deprecation] Three']
      });
    });
  });
});
