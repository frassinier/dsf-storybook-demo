# DSF-Storybook-demo

[Storybook](https://storybook.js.org/) demo for [Design System France](https://www.designsystems.fr/) using [Chromatic](https://www.chromatic.com/)

## CLI history

### Init the project

```bash
yarn init -y
yarn add react react-dom
npx sb init
npx sb@next upgrade --prerelease

git add .storybook stories package.json yarn.lock
git commit -am 'chore: init'
```

### Add dependencies

```
yarn add react react-dom react-is styled-components reakit classnames @talend/design-system
yarn add -D chromatic storybook-addon-designs
git commit -am 'chore: add dependencies'
git push
```

### Chromatic

#### GitHub Action

```yaml
name: Chromatic

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - name: Install dependencies
        run: yarn
      - name: Publish to Chromatic
        uses: chromaui/action@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

Check the initialization on [chromatic.com](https://www.chromatic.com/)

### Add storybook-addon-designs

Following the documentation here https://github.com/pocka/storybook-addon-designs

Edit .storybook/main.js

```diff
module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
+    "storybook-addon-designs",
  ],
};
```

### Add Design System Storybook

https://storybook.js.org/docs/react/workflows/storybook-composition

Edit .storybook/main.js

```diff
module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-designs",
  ],
+  refs: {
+    "design-system": {
+      title: "Talend Design System",
+      url: "https://design.talend.com/",
+    },
+  },
};
```

### Add Storybook Docs mode

Edit package.json

```diff  
  ...
  "scripts": {
    "storybook": "start-storybook -p 6006",
+    "storybook:docs": "yarn storybook --docs",
    "build-storybook": "build-storybook"
  }
}

### Show all stories by default

Edit .storybook/preview.js

```diff
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
+  docs: {
+    source: {
+      state: "open",
+    },
+  },
};
```

### Add Talend Design System Theme Provider

Edit .storybook/preview.js

```diff
+import { ThemeProvider } from "@talend/design-system";

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

+export const decorators = [
+  (Story, context) => {
+    return (
+      <ThemeProvider>
+        <ThemeProvider.GlobalStyle />
+        <Story {...context} />
+      </ThemeProvider>
+    );
+  },
+];
```
