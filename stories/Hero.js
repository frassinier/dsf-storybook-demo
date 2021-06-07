import styled from "styled-components";

import { tokens } from "@talend/design-system";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${tokens.space.xl} 0;
  min-height: 40rem;
  width: 100%;
  background: linear-gradient(315deg, #ffa7a9 4.29%, #bde6f6 93.86%);

  h1 {
    line-height: 1;
    font-weight: normal;
    font-size: ${tokens.sizes.xxl};
    margin-bottom: ${tokens.space.m};
  }

  p {
    margin: 0;
    margin-bottom: ${tokens.space.xl};
  }

  a + a {
    margin-left: ${tokens.space.m};
  }
`;

const ContainerItem = styled.div`
  flex-basis: 50%;
  padding: 0 ${tokens.space.xl};
`;

const Text = styled(ContainerItem)``;

const Image = styled(ContainerItem)`
  display: flex;
  align-items: center;
  justify-content: center;
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
