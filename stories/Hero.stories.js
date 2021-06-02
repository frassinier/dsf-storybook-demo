import React from "react";

import { Button, Link } from "@talend/design-system";
import { Hero } from "./Hero";

import image from "./assets/talend.svg";

export default {
  title: "Example/Hero",
  component: Hero,
};

export const Default = () => (
  <Hero>
    <h1>Connect your data in the cloud</h1>
    <p>
      Need superior analytics for important decisions? Talend brings it all
      together with support for any cloud data warehouse.
    </p>
    <Button.Primary as="a" href="#">
      Contact us
    </Button.Primary>
  </Hero>
);
Default.args = {};

export const HeroWithImage = () => (
  <Hero image={image}>
    <h1>Connect your data in the cloud</h1>
    <p>
      Need superior analytics for important decisions? Talend brings it all
      together with support for any cloud data warehouse.
    </p>
    <Button.Secondary as="a" href="#">
      Free Trial
    </Button.Secondary>
    <Button.Primary as="a" href="#">
      Contact us
    </Button.Primary>
  </Hero>
);
HeroWithImage.args = {};
