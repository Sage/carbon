import buildPalette from './palette';
import palette from './palette';
import mix from './utils/mix';
import config from './color-config';



const assertCorrectColorMix = (config, paletteObject) => {
  Object.keys(config).forEach(col => {
    const match = /([A-Za-z]+)([\d]?[\d]?)/.exec(col);

    const func = match[1], weight = Number(match[2]);

    if (!paletteObject[func]) return 

    expect(paletteObject[func](weight)).toEqual(config[col]);
  })
}


describe('functional palette', () => {
  let colorConfig = {
    brilliantGreenBase: '00DC00',
    brilliantGreenShade20: '00B000',
    brilliantGreenTint50: '7FED7F',
    goldBase: 'FFB500',
    goldTint50: 'FFDA7F',
    errorRedBase: 'C7384F',
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
    amethystBase: '582C83',
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

  it('produces the correct color mix', () => {
    assertCorrectColorMix(colorConfig, palette(config))
  })
})
