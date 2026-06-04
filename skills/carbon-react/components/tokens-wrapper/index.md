# Tokens Wrapper

The `TokensWrapper` component provides a way to apply design tokens to your application. Doing so will ensure the tokens required by Carbon's components are available and in scope as CSS custom properties.

## Basic Usage

Wrap the root of your application or component tree with the `TokensWrapper` to apply design tokens:

<Source
  language="tsx"
  code={`
import TokensWrapper from "carbon-react/lib/components/tokens-wrapper";
import CarbonProvider from "carbon-react/lib/components/carbon-provider";

const App = () => {
  return (
    <TokensWrapper>
      <CarbonProvider>
        // content goes here
      </CarbonProvider>
    </TokensWrapper>
  );
}
  `}
/>

## Available Design Tokens

The wrapper provides hundreds of design tokens organized by category:

- **Global tokens**: `--global-*`
- **Mode tokens**: `--mode-*`
- **Component tokens**: `--button-*`, `--input-*`, etc.
