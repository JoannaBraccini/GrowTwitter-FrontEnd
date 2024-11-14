import styled from "styled-components";

export interface ButtonProps {
  ghost?: boolean;
}

export const Button = styled.button<ButtonProps>`
  border-radius: 20px;
  border: 1px solid;
  background-color: ${(props) => (props.ghost ? "transparent" : "#4595e1")};
  border-color: ${(props) => (props.ghost ? "#fff" : "#4595e1")};
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;
