import styled from "styled-components";

export interface LoginProps {
  signinIn: boolean;
}

export const LoginStyle = styled.div<LoginProps>`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 678px;
  max-width: 100%;
  min-height: 400px;

  .signin-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
    left: 0;
    width: 50%;
    z-index: 2;
    ${(props) =>
      props.signinIn !== true ? `transform: translateX(100%);` : null}
  }
  .signup-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
    ${(props) =>
      props.signinIn !== true
        ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  `
        : null}
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
    ${(props) =>
      props.signinIn !== true ? `transform: translateX(-100%);` : null}

    .overlay {
      background: #067fd7;
      background: -webkit-linear-gradient(to right, #1a9ae9, #4595e1);
      background: linear-gradient(to right, #1a9ae9, #4595e1);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 0 0;
      color: #ffffff;
      position: relative;
      left: -100%;
      height: 100%;
      width: 200%;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
      ${(props) =>
        props.signinIn !== true ? `transform: translateX(50%);` : null}
    }

    .overlay-panel {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 40px;
      text-align: center;
      top: 0;
      height: 100%;
      width: 50%;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
    }
    .left-overlay {
      transform: translateX(-20%);
      ${(props) =>
        props.signinIn !== true ? `transform: translateX(0);` : null}
    }
    .right-overlay {
      right: 0;
      transform: translateX(0);
      ${(props) =>
        props.signinIn !== true ? `transform: translateX(20%);` : null}
    }

    p {
      font-size: 14px;
      font-weight: 100;
      line-height: 20px;
      letter-spacing: 0.5px;
      margin: 20px 0 30px;
    }
  }
`;
