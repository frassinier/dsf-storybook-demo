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
Default.argTypes = argTypes;
Default.args = args;
Default.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/16DCGEgU1U6DArqH98I0Kv/DSF-x-Talend?node-id=394%3A77",
  },
};

export const WithImage = Default.bind({});
WithImage.args = { ...Default.args, secondary: "Free trial", image };
WithImage.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/16DCGEgU1U6DArqH98I0Kv/DSF-x-Talend?node-id=394%3A83",
  },
};

/*
export default {
  title: "Example/Hero",
  component: Hero,
  args,
  argTypes,
};
*/
