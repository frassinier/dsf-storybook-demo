import { IconsProvider, ThemeProvider } from "@talend/design-system";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story, context) => {
    return (
      <>
        <IconsProvider
          bundles={["https://unpkg.com/@talend/icons/dist/svg-bundle/all.svg"]}
        />
        <ThemeProvider>
          <ThemeProvider.GlobalStyle />
          <Story {...context} />
        </ThemeProvider>
      </>
    );
  },
];
