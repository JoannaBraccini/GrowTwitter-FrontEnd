import styled from "styled-components";

export const SidebarStyle = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  flex: 0.5;
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
  padding: 0 8px;
  min-width: 27vw;
  background-color: ${({ theme }) => theme.backgroundColor};
  z-index: 1000;

  .sidebar-input {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    background-color: ${({ theme }) => theme.highlight};
    padding: 8px;
    border-radius: 20px;
    padding-left: 12px;
    margin: 6px 0 10px 20px;
  }

  .sidebar-input input {
    font-size: 16px;
    border: none;
    outline: none;
    background-color: ${({ theme }) => theme.highlight};
    color: ${({ theme }) => theme.textColor};
  }

  .sidebar-trends {
    margin-top: 15px;
    margin-left: 20px;
    padding: 20px;
    border-radius: 20px;
    border: 1px solid ${({ theme }) => theme.highlight};
  }

  .sidebar-trends {
    h2 {
      font-size: 18px;
      margin-bottom: 12px;
      font-weight: bold;
    }

    ul {
      list-style: none;
      padding-bottom: 20px;

      li {
        padding: 10px 0;
        cursor: pointer;

        .trend-category {
          font-size: 12px;
          color: ${({ theme }) => theme.textExtra};
          display: flex;
          justify-content: space-between;
        }

        .trend-topic {
          font-size: 16px;
          font-weight: bold;
          margin: 4px 0;
        }

        .trend-posts {
          font-size: 12px;
          color: ${({ theme }) => theme.textExtra};
        }

        .trend-user {
          font-size: 14px;
          color: ${({ theme }) => theme.textExtra};
        }

        .trend-button {
          padding: 10px;
          height: min-content;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    display: none; /* Esconde a sidebar em tablets e mobile */
  }
`;
