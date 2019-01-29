import buildPalette from './palette';
import functionalPalette from './palette/functional';
import mix from './utils/mix';
import config from './color-config';



describe('mix', () => {

  // it('mixes two colors', () => {
 
  // })

  // it('adds the correct tint when mixed with white', () => {
  //   const brilliantGreenBase = '00DC00';
  //   const brilliantGreen50 = mix(brilliantGreenBase, 'FFFFFF', 50);
  //   expect(brilliantGreen50).toEqual('7FED7F')
  // })

  // it('adds the correct shade when mixed with black', () => {
  //   const errorRedBase = 'C7384F';
  //   console.log(20)
  //   const errorRedShade20 = mix(errorRedBase, '000000', 20);
  //   console.log('errorRedShade20', errorRedShade20)
  //   console.log(30)
  //   const errorRedShade30 = mix(errorRedBase, '000000', 30);
  //   console.log('errorRedShade30', errorRedShade30)
  //   expect(errorRedShade20).toEqual('9F2C3F')
  // })
})

// describe('buildPalette', () => {
//   it('builds a palette of colors which matches the DSL spec', () => {
//     const palette = buildPalette(config);
//     console.log(palette)
//     expect(palette.goldTint50).toEqual('FFDA7F');
//     expect(palette.errorRedShade20).toEqual('9F2C3F');
//     expect(palette.genericGreenShade15).toEqual('008200');
//     expect(palette.genericGreenShade55).toEqual('004500');
//   })
// })

describe('functional palette', () => {
  // it('builds a functional object', () => {
  //   const p = functionalPalette(config)
  //   const color = p.genericGreenShade(15);
  //   console.log('functional: ',p)
  //   expect(color).toEqual()
  // })

  it('caches colors', () => {
    const p = functionalPalette(config)
    p.genericGreenShade(15);
    p.genericGreenShade(15);
    expect()
  })
})