import React from "react";
import styled from "styled-components";

const Content = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(10rem, auto);
`;

const Usage = styled.ul.attrs({
  role: "list",
})`
  padding: 1rem;
  border-radius: 0.4rem;
  background: #e9f5fb;
  box-shadow: 0px -5px 0px 0px currentColor;

  li {
    color: black;

    &:before {
      content: "—";
      padding: 1ch;
    }
  }
`;

const Do = styled(Usage)`
  color: #9bca67;
`;

const Dont = styled(Usage)`
  color: #ff8a8c;
`;

const Block = (props) => (
  <Content>
    <Do>
      {props.do.map((item, key) => (
        <li key={key}>{item}</li>
      ))}
    </Do>
    <Dont>
      {props.dont.map((item, key) => (
        <li key={key}>{item}</li>
      ))}
    </Dont>
  </Content>
);

export default Block;
