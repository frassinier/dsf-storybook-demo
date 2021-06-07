import { ThemeProvider } from "@talend/design-system";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    source: {
      state: "open",
    },
  },
};

export const decorators = [
  (Story, context) => {
    return (
      <ThemeProvider>
        <ThemeProvider.GlobalStyle />
        <Story {...context} />
      </ThemeProvider>
    );
  },
];
