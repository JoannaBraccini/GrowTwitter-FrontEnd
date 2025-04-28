import styled from "styled-components";

export interface SignProps {
  signingIn: boolean;
}

export const SignStyle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "signingIn", // Não permite que "signingIn" seja passada para o DOM
})<SignProps>`
  font-family: var(--Poppins);
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 678px;
  max-width: 100%;
  min-height: 500px;
  padding: 20px;

  .banner {
    font-size: 4rem;
    background: linear-gradient(to bottom, #1da1f2, #70c9f9, #e8f5fd);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent !important;
    -webkit-text-fill-color: transparent;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }

  .signin-container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 50%;
    transition: all 0.6s ease-in-out;
    z-index: 2;
    ${(props) =>
      props.signingIn !== true ? `transform: translateX(100%);` : null}
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
      props.signingIn !== true
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
      props.signingIn !== true ? `transform: translateX(-100%);` : null}
  }
  .overlay {
    background: linear-gradient(to bottom, #2ba9f8, #0066af);
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
      props.signingIn !== true ? `transform: translateX(50%);` : null}
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
    ${(props) =>
      props.signingIn !== true ? `transform: translateX(0);` : null}
  }

  .right-overlay {
    right: 0;
    transform: translateX(0);
    ${(props) =>
      props.signingIn !== true ? `transform: translateX(20%);` : null}
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

  @media screen and (max-width: 768px) {
    width: 95vw;
    height: 80vh;

    .banner {
      font-size: 1.9rem;
    }

    footer :first-child {
      display: none;
    }

    footer {
      height: 3rem;
    }

    .overlay-container {
      display: none;
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
      margin: 10px 0;
    }

    a {
      color: #0066af;
      font-weight: 400;
    }

    .mobile {
      display: block;
    }
  }
`;
