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
