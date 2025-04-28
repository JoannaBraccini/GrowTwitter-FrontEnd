import styled from "styled-components";

interface ToastStyleProps {
  type: "success" | "error" | "warning";
}

export const ToastStyle = styled.section<ToastStyleProps>`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${({ type }) =>
    type === "success" ? "#4caf50" : type === "error" ? "#f44336" : "#ff9800"};
  color: #fff;
  padding: 16px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  .progress {
    height: 4px;
    background-color: #fff;
    border-radius: 2px;
    transition: width 0.1s linear;
  }
`;
