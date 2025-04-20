import styled from "styled-components";

export const NotificationsStyle = styled.div`
  padding: 20px;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.textColor};
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      background-color: ${({ theme }) => theme.backgroundColor};
      border: 1px solid ${({ theme }) => theme.highlight};
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 10px;
      transition: background-color 0.3s;

      &:hover {
        background-color: ${({ theme }) => theme.highlight};
      }

      p {
        margin: 0;
        font-size: 16px;
        color: ${({ theme }) => theme.textColor};
      }

      small {
        display: block;
        margin-top: 5px;
        font-size: 12px;
        color: ${({ theme }) => theme.textSecondary};
      }
    }
  }

  p {
    text-align: center;
    font-size: 16px;
    color: ${({ theme }) => theme.textSecondary};
  }
`;
