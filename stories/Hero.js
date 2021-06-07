import styled from "styled-components";

import { tokens } from "@talend/design-system";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40rem;
  padding: ${tokens.space.xl} 0;
  color: ${tokens.colors.gray900};
  background: linear-gradient(135deg, #ffffff 1.23%, #f8f3ef 96.04%);
  width: 100%;

  h1 {
    line-height: 1;
    font-weight: normal;
    font-size: ${tokens.sizes.xxl};
    margin-bottom: ${tokens.space.m};
  }

  p {
    margin-top: 0;
    margin-bottom: ${tokens.space.xl};
  }

  a + a {
    margin-left: ${tokens.space.m};
  }
`;

const ContainerItem = styled.div`
  padding: 0 ${tokens.space.xl};
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
  flex-direction: row;
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
