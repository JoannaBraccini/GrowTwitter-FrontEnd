import styled from "styled-components";

export interface LoginProps {
  signinIn: boolean;
}

export const LoginStyle = styled.div<LoginProps>`
  font-family: var(--Poppins);
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 678px;
  max-width: 100%;
  min-height: 500px;
  padding: 20px;

  .signin-container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 50%;
    transition: all 0.6s ease-in-out;
    z-index: 2;
    ${(props) =>
      props.signinIn !== true ? `transform: translateX(100%);` : null}
  }
  .signup-container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 50%;
    opacity: 0;
    z-index: 1;
    transition: all 0.6s ease-in-out;
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
  }
  .overlay {
    background: #067fd7;
    background: -webkit-linear-gradient(to right, #1a9ae9, #4595e1);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transition: transform 0.6s ease-in-out;
    transform: translateX(0);
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
    transition: transform 0.6s ease-in-out;
    transform: translateX(0);
  }

  .left-overlay {
    transform: translateX(-20%);
    ${(props) => (props.signinIn !== true ? `transform: translateX(0);` : null)}
  }

  .right-overlay {
    right: 0;
    transform: translateX(0);
    ${(props) =>
      props.signinIn !== true ? `transform: translateX(20%);` : null}
  }

  button {
    margin: 10px 0;
  }

  .mobile {
    display: none;
  }

  p {
    font-family: var(--OpenSans);
    font-size: 14px;
    font-weight: 200;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }

  h1 {
    font-weight: bold;
    margin: 10px 0;
  }

  @media screen and (max-width: 900px) {
    width: 95vw;
    height: 80vh;

    footer {
      display: none;
    }

    .overlay-container {
      display: none;
    }

    h1 {
      margin-top: 20px;
    }

    .signin-container {
      width: 100%;
      z-index: 999;
      border-radius: 10px;
      border-left: 4px solid rgb(6, 127, 215, 0.5);
    }

    .signup-container {
      width: 100%;
      z-index: 999;
    }

    .overlay-panel,
    .right-overlay,
    .signup-container {
      border-radius: 1rem;
      transform: translateX(0%);
      z-index: 999;
    }

    span {
      margin: 15px 0;
    }

    .mobile {
      display: block;
    }
  }
`;
