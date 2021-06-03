import React from "react";

import { Button, Link } from "@talend/design-system";
import { Hero } from "./Hero";

import image from "./assets/talend.svg";

export default {
  title: "Example/Hero",
  component: Hero,
  argTypes: {
    hasFreeTrialCTA: {
      description: "Should display the `Free Trial` CTA",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
      },
    },
    image: {
      description: `<dl><dt>Image URL to display</dt><dd>${image}</dd><dd>https://media.giphy.com/media/TLqkzhMIZxAQg/giphy.gif</dd></dl>`,
      control: { type: "text" },
      table: {
        type: { summary: "url" },
      },
    },
  },
};

const Template = (args) => (
  <Hero {...args}>
    <h1>Connect your data in the cloud</h1>
    <p>
      Need superior analytics for important decisions? Talend brings it all
      together with support for any cloud data warehouse.
    </p>
    {!!args.hasFreeTrialCTA && (
      <Button.Secondary as="a" href="#">
        Free Trial
      </Button.Secondary>
    )}
    <Button.Primary as="a" href="#">
      Contact us
    </Button.Primary>
  </Hero>
);

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/16DCGEgU1U6DArqH98I0Kv/DSF-x-Talend?node-id=1%3A2",
  },
};

export const HeroWithImage = Template.bind({});
HeroWithImage.args = { image, hasFreeTrialCTA: true };
HeroWithImage.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/16DCGEgU1U6DArqH98I0Kv/DSF-x-Talend?node-id=1%3A1916",
  },
};
