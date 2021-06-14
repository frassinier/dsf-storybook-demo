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
Default.args = {
  title: "Connect your data in the cloud",
  description:
    "Need superior analytics for important decisions? Talend brings it all together with support for any cloud data warehouse.",
  primary: "Contact us",
};
Default.parameters = {
  docs: {
    description: {
      story: "By default, the content is centered.",
    },
  },
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/16DCGEgU1U6DArqH98I0Kv/DSF-x-Talend?node-id=327%3A30",
  },
};

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
      "https://www.figma.com/file/16DCGEgU1U6DArqH98I0Kv/DSF-x-Talend?node-id=327%3A66",
  },
};

/*
export default {
  title: "Example/Hero",
  component: Hero,
  parameters: {
    description: {
      component:
        "A large banner, usually appearing as one of the first items on a page; often contains a full-width image.",
    },
  },
  argTypes,
};
*/
