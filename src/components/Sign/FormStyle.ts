import styled from "styled-components";

export const FormStyle = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  @media (max-width: 768px) {
    padding: 0 10px;
  }

  .input-container {
    position: relative;
    width: 100%;
    margin: 8px 0;
  }

  input {
    background-color: #eee;
    color: #333;
    border-radius: 20px;
    padding: 12px 15px;
    width: 100%;
    @media (max-width: 768px) {
      border-radius: 0.5rem;
    }
    &:focus {
      outline: 2px double ${({ theme }) => theme.accent};
      background-color: #ffffff;
    }
    &:focus + label,
    &:not(:placeholder-shown) + label {
      top: -8px;
      left: 10px;
      font-size: 12px;
      color: ${({ theme }) => theme.accent};
    }
  }

  label {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    padding: 0 5px;
    transition: 0.3s ease all;
    pointer-events: none;
    color: #4c4c4c;
    font-size: 16px;
  }
  .name-container {
    display: flex;
    gap: 10px;
  }

  .name-container .input-container {
    flex: 1;
  }

  .checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0;
    margin: 10px;
  }

  .checkbox input {
    width: 100%;
    margin-right: auto;
  }

  .checkbox label {
    position: static;
    transform: none;
    padding: 0;
    color: #4c4c4c;
    font-size: 14px;
  }

  label,
  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
  }
`;
