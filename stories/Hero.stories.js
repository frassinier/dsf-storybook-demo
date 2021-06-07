import React from "react";

import { Button } from "@talend/design-system";
import { Hero } from "./Hero";

import image from "./assets/talend.svg";

/*
export default {
  title: "Example/Hero",
  component: Hero,
  argTypes: {
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
      description: "Should display a secondary CTA",
      control: { type: "text" },
    },
    primary: {
      name: "Primary",
      description: "Should display a primary CTA",
      control: { type: "text" },
    },
    image: {
      name: "Image",
      description: `Image URL to display
        <ul>
          <li>${image}</li>
          <li>https://media.giphy.com/media/TLqkzhMIZxAQg/giphy.gif</li>
        </ul>`,
      control: { type: "text" },
    },
  },
};
*/

export const defaultProps = {
  title: "Connect your data in the cloud",
  description:
    "Need superior analytics for important decisions? Talend brings it all together with support for any cloud data warehouse.",
  primary: "Contact us",
};

export const Template = ({
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
      <Button.Secondary as="a" href="#">
        {secondary}
      </Button.Secondary>
    )}
    {primary && (
      <Button.Primary as="a" href="#">
        {primary}
      </Button.Primary>
    )}
  </Hero>
);

export const Default = Template.bind({});
Default.args = defaultProps;
Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/16DCGEgU1U6DArqH98I0Kv/DSF-x-Talend?node-id=1%3A2",
  },
};

export const WithImage = Template.bind({});
WithImage.args = { ...defaultProps, secondary: "Free trial", image };
WithImage.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/16DCGEgU1U6DArqH98I0Kv/DSF-x-Talend?node-id=1%3A1916",
  },
};
