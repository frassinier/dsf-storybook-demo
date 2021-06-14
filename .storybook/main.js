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
  refs: {
    "design-system": {
      title: "Talend Design System",
      url: "https://design.talend.com/",
    },
  },
};
