import config from './color-config';
import mix from './utils/mix';
import { addOpacity, generatePalette } from './'

const assertCorrectColorMix = (config, paletteObject) => {
  Object.keys(config).forEach(col => {
    const match = /([A-Za-z]+)([\d]?[\d]?)/.exec(col);

    const func = match[1], weight = Number(match[2]);

    expect(paletteObject[func](weight)).toEqual('#' + config[col]);
  })
}

describe('style', () => {
  let colorConfig = {
    brilliantGreenShade20: '00B000',
    brilliantGreenTint50: '7FED7F',
    goldTint50: 'FFDA7F',
    errorRedShade20: '9F2C3F',
    genericGreenTint50: '7FCC7F',
    genericGreenTint30: '4CB74C',
    genericGreenShade15: '008200',
    genericGreenShade35: '006300',
    genericGreenShade55: '004400',
    productGreenTint50: '7FD1BA',
    productGreenTint30: '4CBE9F',
    productGreenShade21: '00805D',
    productGreenShade41: '006045',
    productGreenShade61: '003F2E',
    productBlueTint50: '7FBBE3',
    productBlueTint30: '4C9FD8',
    productBlueShade3: '0073C2',
    productBlueShade23: '005B9A',
    productBlueShade43: '004372',
    amethystTint50: 'AB95C1',
    amethystTint30: '8A6BA8',
    amethystTint10: '68418F',
    amethystShade10: '4F2775',
    amethystShade30: '3D1E5B',
    slateTint95: 'F2F4F5',
    slateTint90: 'E5EAEC',
    slateTint80: 'CCD6DA',
    slateTint60: '99ADB6',
    slateTint40: '668491',
    slateTint20: '335B6D',
    slateShade60: '00141D'
  }

  describe('palette', () => {
    let palette;

    beforeEach(() => {
      palette = generatePalette(config)
    })

    it('produces the correct color mix', () => {
      assertCorrectColorMix(colorConfig, palette);
    });

    it('returns base colors', () => {
      const baseNames = Object.keys(config);
      const paletteNames = Object.keys(palette);
      baseNames.forEach(name => expect(paletteNames.includes(name)).toBeTruthy());
    });

    it('caches function calls', () => {
      palette.productBlueShade(20);
      palette.productBlueShade(20);
    });
  });

  describe('mix', () => {
    it('defaults to a weight of 50', () => {
      expect(mix(config.genericGreen, 'FFFFFF')).toEqual('#' + colorConfig.genericGreenTint50);
    });

    it('accepts colors without a hash symbol', () => {
      expect(mix(config.genericGreen, 'FFFFFF')).toEqual('#' + colorConfig.genericGreenTint50);
    });

    it('accepts colors with a hash symbol', () => {
      expect(mix('#' + config.genericGreen, '#FFFFFF')).toEqual('#' + colorConfig.genericGreenTint50);
    });

    it('accepts colors with combinations of with and without hash symbols', () => {
      expect(mix('#' + config.genericGreen, 'FFFFFF')).toEqual('#' + colorConfig.genericGreenTint50);
      expect(mix(config.genericGreen, '#FFFFFF')).toEqual('#' + colorConfig.genericGreenTint50);
    })
  })

  describe('addOpacity', () => {
    it('adds the correct opacity to an input color', () => {
      const blackAt50Opacity = addOpacity('#000000', 0.5);
      expect(blackAt50Opacity).toEqual('rgba(0,0,0,0.5)');
    })

    it('consistently adds the correct opacity to an input color', () => {
      [...Array(100).keys()].map(i => i / 100).forEach(degree => {
        expect(addOpacity('#000000', degree)).toEqual(`rgba(0,0,0,${degree})`);
      })
    })

    it('consistently adds the correct opacity to non-black input colors', () => {
      [...Array(100).keys()].map(i => i / 100).forEach(degree => {
        // #006e3a === rgb(0,110,58)
        expect(addOpacity('#006e3a', degree)).toEqual(`rgba(0,110,58,${degree})`);
      })
    })
  })
})
