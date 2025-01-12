import styled from "styled-components";

export interface ButtonProps {
  ghost?: boolean;
  fullWidth?: boolean;
  shadow?: boolean;
  size?: "small" | "medium" | "large";
  text?: string;
}

export const Button = styled.button<ButtonProps>`
  font-family: var(--Montserrat);
  border-radius: 30px;
  border: 1px solid;
  color: ${({ text, theme }) => text ?? theme.textColor};

  background-color: ${({ ghost, theme }) =>
    ghost ? "transparent" : theme.accent};
  border-color: ${({ ghost, theme }) =>
    ghost ? theme.backgroundColor : theme.accent};
  box-shadow: ${({ shadow }) =>
    shadow ? "0px 5px 10px rgba(0, 0, 0, 0.1)" : "none"};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  max-width: 300px;
  height: ${({ size }) => (size === "large" ? "50px" : "auto")};
  font-size: ${({ size }) =>
    size === "small" ? "12px" : size === "large" ? "16px" : "15px"};
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;

  &:hover {
    background-color: #0081d1;
    border-color: #0081d1;
  }

  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 900px) {
    padding: 12px 25px;
  }
`;
