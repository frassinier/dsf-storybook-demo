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
