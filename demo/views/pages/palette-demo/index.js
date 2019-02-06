import React from 'react';
import styled from 'styled-components';
import { generatePalette, blackAtOpacity } from '../../../../src/style';
import styleConfig, { css } from '../../../../src/style/color-config';


const colorMix = (config, paletteObject) => {
  return Object.keys(config).map(col => {
    const match = /([A-Za-z]+)([\d]?[\d]?)/.exec(col);

    const func = match[1], weight = Number(match[2]);

    return paletteObject[func](weight)
  })
}

const makeArray = (num) => [...Array(num).keys()]

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

const ColorGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 10px;
  width: 250px;
  height: 100px;
`;

const ColorBox = styled.div`
  background: ${({ background }) => background};
  opacity: ${({ dimmed }) => dimmed && 0.5};
  border: ${({ dimmed }) => !dimmed && `4px solid black`};
  color: white;
  font-size: 14px;
  height: 60px;
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: 1s;
  text-shadow: 2px 2px 10px black;
  :hover {
    opacity: 1;
  }
`;

const ColorDiscriptor = styled.p`
  color: rgba(20, 20, 20, 0.9);
  opacity: ${({ dimmed }) => dimmed && 0.3};
  font-weight: bold;
`;

const PaletteContainer = styled.div`
  display: flex;

`;

const ColorColumn = styled.div`
  height: 100%;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;


class PaletteDemo extends React.Component {
  state = {
    palette: generatePalette(styleConfig),
    bases: styleConfig,
    colorConfig,
    dimUnused: true
  }

  isInConfig = (name) => {
    const { colorConfig } = this.state;

    return Object.keys(colorConfig).includes(name)
  }

  renderRows = (type) => (step) =>  base => {
    const { palette, dimUnused } = this.state;

    return makeArray(100/step).slice(1,)
      .map(i => i * 10)
      .map(degree => {
        const name = `${base}${type}${degree}`;
        const isInConfig = this.isInConfig(name);


        return { hex: palette[`${base}${type}`](degree), name, dimmed: !isInConfig }
      })
      .map(({ hex, name, dimmed } )=> (
        <ColorGroup>
        <ColorBox 
          background={ hex }
          dimmed={dimUnused && dimmed}
        ></ColorBox>
        <ColorDiscriptor
          dimmed={dimUnused && dimmed}
        >{name}</ColorDiscriptor>
        </ColorGroup>
        ));
  }


  renderColumns = () => {
    const { palette, bases } = this.state;
    const step = 10;

    const makeTintRows = this.renderRows('Tint')(step);
    const makeShadeRows = this.renderRows('Shade')(step);

    console.log(palette);



    return Object.keys(bases).map(base => {
      const tintBlocks = makeTintRows(base);
      
      const shadeBlocks = makeShadeRows(base);

      return (
        <ColorColumn>
          {[
            ...tintBlocks.reverse(),
            <ColorGroup>
              <ColorBox background={ '#' + bases[base] }></ColorBox>
              <ColorDiscriptor>{base}</ColorDiscriptor>
            </ColorGroup>,
            ...shadeBlocks
          ]}
        </ColorColumn>
      )
    })
    // return colorMix(colorConfig, palette).map(mix => <ColorBox background={ mix } />);
  }


  render() {
    return (
      <PaletteContainer>
        {this.renderColumns()}
      </PaletteContainer>
    )
  }
};

export default PaletteDemo;