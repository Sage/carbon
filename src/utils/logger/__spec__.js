import Logger from './';

describe('Logger', () => {
  it('displays the message to the console', () => {
    spyOn(console, 'warn');
    Logger('Hello World!', 'warn', 'development')
    expect(console.warn).toHaveBeenCalledWith('Hello World!');
  });

  describe('when env is production', () => {
    it('does not output a message', () => {
      spyOn(console, 'warn');
      Logger('Hello World!', 'warn', 'production')
      expect(console.warn).not.toHaveBeenCalled();
    });
  });
});
