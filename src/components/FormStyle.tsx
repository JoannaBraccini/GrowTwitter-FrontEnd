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
    padding: 0 3px;
  }

  h1 {
    font-weight: bold;
    @media (max-width: 768px) {
      padding-bottom: 10px;
    }
  }

  input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
    @media (max-width: 768px) {
      border-radius: 3rem;
    }
  }

  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }
`;
