# DSF Storybook Demo

[Storybook](https://storybook.js.org/) demo for [Design System France](https://www.designsystems.fr/) using [Chromatic](https://www.chromatic.com/)

## Demo timeline

### Getting Started

#### Init the project

```bash
yarn init -y
yarn add react react-dom
npx sb init
npx sb@next upgrade --prerelease

git add .storybook stories package.json yarn.lock
git commit -am 'chore: init'
```

#### Add dependencies

```
yarn add react react-dom react-is styled-components reakit classnames @talend/design-system
yarn add -D chromatic storybook-addon-designs
git commit -am 'chore: add dependencies'
git push
```

#### Chromatic setup

##### Create a project

Go to [chromatic.com](https://www.chromatic.com/) and follow the instructions

##### GitHub Action

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

Check the results on [chromatic.com](https://www.chromatic.com/)

#### Add storybook-addon-designs

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

#### Add Talend Design System Storybook ref

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

#### Add Storybook Docs mode

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

#### Show all stories source by default

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

#### Add Talend Design System Theme Provider

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

#### Create a new Component alias

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

### First round

#### Add a new Hero Component

Add stories/blocks/Hero.js

```jsx
import React from "react";
import styled from "styled-components";

import { tokens } from "@talend/design-system";

const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-block: ${tokens.space.xl};
  min-height: 40rem;
  width: 100%;
  text-align: center;
`;

const ContainerItem = styled.div`
  flex-basis: 50%;
  padding-inline: ${tokens.space.xl};
`;

const Text = styled(ContainerItem)`
  text-align: start;
`;

const Image = styled(ContainerItem)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContainerWithImage = styled(Container)`
  flex-direction: row;
`;

export const Hero = (props) => {
  if (props.image) {
    const { image, children, ...rest } = props;
    return (
      <ContainerWithImage {...rest}>
        <Text>{children}</Text>
        <Image>
          <img src={image} alt="" />
        </Image>
      </ContainerWithImage>
    );
  }
  return <Container {...props} />;
};
```

#### Add Hero stories

Add stories/Hero.stories.js

```jsx
import React from "react";

import { ButtonAsLink } from "./ButtonAsLink";
import { Hero } from "./Hero";

import image from "./assets/talend.svg";

const argTypes = {
  title: {
    name: "Title",
    description: "Title of the bannner",
    control: { type: "text" },
  },
  description: {
    name: "Description",
    description: "Description of the banner",
    control: { type: "text" },
  },
  secondary: {
    name: "Secondary",
    description: "Secondary CTA",
    control: { type: "text" },
  },
  primary: {
    name: "Primary",
    description: "Primary CTA",
    control: { type: "text" },
  },
  image: {
    name: "Image",
    description: `Image URL to display
        <code>/${image}</code>
        <code>//media.giphy.com/media/TLqkzhMIZxAQg/giphy.gif</code>
        `,
    control: { type: "text" },
  },
};

const args = {
  title: "Connect your data in the cloud",
  description:
    "Need superior analytics for important decisions? Talend brings it all together with support for any cloud data warehouse.",
  primary: "Contact us",
};

export const Default = ({
  title,
  description,
  secondary,
  primary,
  ...rest
}) => (
  <Hero {...rest}>
    {title && <h1>{title}</h1>}
    {description && <p>{description}</p>}
    {secondary && (
      <ButtonAsLink variant="secondary" href="#">
        {secondary}
      </ButtonAsLink>
    )}
    {primary && (
      <ButtonAsLink variant="primary" href="#">
        {primary}
      </ButtonAsLink>
    )}
  </Hero>
);
Default.args = args;
Default.parameters = {
  docs: {
    description: {
      story: "By default, the content is centered.",
    },
  },
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/",
  },
};
Default.argTypes = argTypes;

export const WithImage = Default.bind({});
WithImage.args = { ...Default.args, secondary: "Free trial", image };
WithImage.parameters = {
  docs: {
    description: {
      story: "With an image the content is left aligned.",
    },
  },
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/",
  },
};

export default {
  title: "Example/Hero",
  component: Hero,
  parameters: {
    description: {
      component:
        "A large banner, usually appearing as one of the first items on a page; often contains a full-width image.",
    },
  },
  args,
  argTypes,
};
```

#### Use MDX format

First, edit stories/Hero.stories.js

```diff
[...]

+/*
+export default {
+  title: "Example/Hero",
+  component: Hero,
+  parameters: {
+    description: {
+      component:
+        "A large banner, usually appearing as one of the first items on a page; often contains a full-width image.",
+    },
+  },
+  args,
+  argTypes,
+};
+*/
```

Add stories/Hero.stories.mdx

```mdx
import { ArgsTable, Canvas, Meta, Story } from "@storybook/addon-docs";
import { Figma } from "storybook-addon-designs/blocks";

import { Button } from "@talend/design-system";

import * as Stories from "./Hero.stories";

import image from "./assets/talend.svg";

<Meta title="Example/Hero" />

# Hero

A large banner, usually appearing as one of the first items on a page; often contains a full-width image.

## Zoning

<Figma
  url="https://www.figma.com/file/"
  collapsable={false}
  showLink={false}
/>

## Style

### Default

By default, the content is centered.

<Canvas>
  <Story story={Stories.Default} />
</Canvas>

### With image

With an image the content is left aligned.

<Canvas>
  <Story story={Stories.WithImage} />
</Canvas>

## States

N/A

## Interactions

N/A

## Content

- Use a compelling header that is in-brand and relevant to your most important content/action item.
- Have clear call to action.
- We recommend hero images at least 800px by 600px. A 16:9 aspect ratio works well though more of it can be hidden when the hero section is tall.
- Choose your image wisely.
- Don’t just repeat the site title in the header

## Usage

<Canvas>
  <Story
    name="Usage"
    args={Stories.Default.args}
    argTypes={Stories.Default.argTypes}
  >
    {Stories.Default.bind({})}
  </Story>
</Canvas>

<ArgsTable story="Usage" />

## Accessibility

N/A

```

Edit stories/Page.js

```diff
import React from "react";
import PropTypes from "prop-types";

+import { ButtonAsLink } from "./ButtonAsLink";
import { Header } from "./Header";
+import { Hero } from "./Hero";
import "./page.css";

export const Page = ({ user, onLogin, onLogout, onCreateAccount }) => (
  <article>
    <Header
      user={user}
      onLogin={onLogin}
      onLogout={onLogout}
      onCreateAccount={onCreateAccount}
    />
+    <Hero image="https://www.talend.com/wp-content/uploads/2020/10/spot-lp-trial-contact-demo.png">
+      <h1>Book a Demo with one of our experts</h1>
+      <p>
+        Let us walk you through how Talend can help you get clean, compliant,
+        and complete data for everyone in your business.
+      </p>
+      <ButtonAsLink variant="primary" href="#">
+        Request a demo
+      </ButtonAsLink>
+    </Hero>
[...]
```

Commit, Push and check the result on Chromatic!

### Second round

Edit stories/Hero.js

```diff
[...]

const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-block: ${tokens.space.xl};
  min-height: 40rem;
  width: 100%;
  text-align: center;
+  background: ${tokens.colors.cottonCandy.backgroundImage};
`;

[...]
```

Commit, Push and check the result on Chromatic!

#### Add new Docs block

Add stories/blocks/Content.js

```jsx
import React from "react";
import styled from "styled-components";

const Content = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(10rem, auto);
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
import { ArgsTable, Canvas, Meta, Story } from "@storybook/addon-docs";
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

### Verify Docs mode

```bash
yarn storybook:docs
```
