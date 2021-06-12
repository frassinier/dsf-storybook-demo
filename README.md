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
```

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

### Create a new Component Alias

Add stories/ButtonAsLink.js

```jsx
import React from "react";
import styled from "styled-components";

import { tokens, Button } from "@talend/design-system";

const A = styled.a`
  margin-block: ${tokens.space.m};

  & + & {
    margin-left: ${tokens.space.m};
  }
`;

export const ButtonAsLink = ({ variant, ...rest }) => {
  let Component;
  switch (variant) {
    case "primary":
      Component = Button.Primary;
      break;
    case "secondary":
      Component = Button.Secondary;
      break;
    default:
      Component = Button;
      break;
  }
  return <Component as={A} {...rest} />;
};
```

### Add new Docs block

Add stories/blocks/Content.js

```jsx
import React from "react";
import styled from "styled-components";

const Content = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(100px, auto);
`;

const Usage = styled.ul.attrs({
  role: "list",
})`
  padding: 1rem;
  border-radius: 0.4rem;
  background: #e9f5fb;
  box-shadow: 0px -5px 0px 0px currentColor;

  li {
    color: black;

    &:before {
      content: "—";
      padding: 1ch;
    }
  }
`;

const Do = styled(Usage)`
  color: #9bca67;
`;

const Dont = styled(Usage)`
  color: #ff8a8c;
`;

const Block = (props) => (
  <Content>
    <Do>
      {props.do.map((item, key) => (
        <li key={key}>{item}</li>
      ))}
    </Do>
    <Dont>
      {props.dont.map((item, key) => (
        <li key={key}>{item}</li>
      ))}
    </Dont>
  </Content>
);

export default Block;
```

Add stories/blocks/index.js

```jsx
import Content from "./Content.js";

export { Content };
```

Edit stories/Hero.stories.mdx

```diff
import { ArgsTable, Canvas, Meta, Story } from "@storybook/addon-docs/blocks";
import { Figma } from "storybook-addon-designs/blocks";
+ import { Content } from "./blocks";

[...]

## Content

-* Use a compelling header that is in-brand and relevant to your most important content/action item.
-* Have clear call to action.
-* We recommend hero images at least 800px by 600px. A 16:9 aspect ratio works well though more of it can be hidden when the hero section is tall.
-* Choose your image wisely.
-* Don’t just repeat the site title in the header
+<Content
+  do={[
+    "Use a compelling header that is in-brand and relevant to your most important content/action item.",
+    "Have clear call to action.",
+    "We recommend hero images at least 800px by 600px. A 16:9 aspect ratio works well though more of it can be hidden when the hero section is tall.",
+    "Choose your image wisely.",
+  ]}
+  dont={["Don’t just repeat the site title in the header"]}
+/>

```
