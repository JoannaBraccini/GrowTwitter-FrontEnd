import styled from "styled-components";

export const PostStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.highlight};
  padding: 10px 20px;
  flex: 1;

  .details {
    display: flex;
    gap: 10px;
    .user {
      display: flex;
      align-items: baseline;
      gap: 5px;
      h3 {
        /* font-size: 20px; */
        font-weight: bold;
      }
      .verified {
        width: 12px;
        height: 12px;
      }
    }
    small {
      color: ${({ theme }) => theme.textSecondary};
      gap: 5px;
      font-size: 14px;
    }
    .dots {
    }
  }

  .tweet-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 15px;
    img {
      object-fit: contain;
      border: 1px solid ${({ theme }) => theme.highlight};
      border-radius: 20px;
      width: 100%;
      height: auto;
    }

    .menu {
      button {
      }
    }

    .tweet-footer {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }

    .icons {
      display: flex;
      flex-direction: row;
      width: 40px;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      img {
        font-size: 14px;
        color: ${({ theme }) => theme.accent};
        margin-right: 5px;
        width: 100%;
      }
      .actions {
        display: flex;
        width: 60px;
        justify-content: space-between;
        align-items: end;
        padding-bottom: 6px;
      }
    }
  }
`;
