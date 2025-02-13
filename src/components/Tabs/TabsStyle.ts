import styled from "styled-components";

export const TabsStyle = styled.div`
  .tabs {
    display: flex;
    justify-content: space-around;
    border-bottom: 2px solid #e1e8ed;
    margin-bottom: 10px;
  }

  .tabs button {
    flex: 1;
    background: none;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
    transition: {
      background: 0.3s ease, color 0.3s ease;
    }
  }

  .tabs button.active {
    background-color: #1da1f2;
    color: white;
    border-radius: 10px;
  }

  .tabs button:hover {
    background-color: rgba(29, 161, 242, 0.2);
  }

  @media (max-width: 768px) {
    .tabs {
      flex-direction: column;
    }

    .tabs button {
      margin: 5px 0;
    }
  }
`;
