import styled from "styled-components";

import { tokens } from "@talend/design-system";

const Container = styled.div`
  padding: ${tokens.space.xl};
  width: 100%;
  text-align: center;

  h1 {
    font-weight: normal;
    font-size: ${tokens.sizes.xxl};
  }

  a + a {
    margin-left: ${tokens.space.m};
  }
`;

const ContainerItem = styled.div`
  flex-basis: 50%;
`;

const Text = styled(ContainerItem)`
  text-align: start;
`;

const Image = styled(ContainerItem)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${tokens.space.xl};
`;

const ContainerWithImage = styled(Container)`
  display: flex;
  align-items: center;
`;

const Hero = (props) => {
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

export { Hero };
