import { Figma } from "storybook-addon-designs/blocks";

export const Default = (props) => (
  <Figma
    url="https://www.figma.com/file/16DCGEgU1U6DArqH98I0Kv/DSF-x-Talend?node-id=324%3A177"
    collapsable={false}
    showLink={false}
  />
);
Default.parameters = { docs: { disable: true } };

export default {
  title: "Example/Hero",
};
