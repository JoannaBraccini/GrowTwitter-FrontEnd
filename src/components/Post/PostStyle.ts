import styled from "styled-components";

export const PostStyle = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.highlight};
  padding: 10px;

  .post-avatar {
    padding: 0 10px 10px 10px;
    img {
      border-radius: 50%;
      height: 40px;
    }
  }

  .post-body {
    flex: 1;
  }

  .post-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .post-badge {
    font-size: 14px !important;
    color: ${({ theme }) => theme.accent};
    margin-right: 5px;
  }

  .post-headerSpecial {
    font-weight: 600;
    font-size: 12px;
    color: ${({ theme }) => theme.textSecondary};
  }

  .post-headerText h3 {
    font-size: 15px;
    margin-bottom: 5px;
  }

  .post-content {
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
  }

  .post-icons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    .post-actions {
      display: flex;
      width: 60px;
      justify-content: space-between;
      align-items: end;
      padding-bottom: 6px;
    }
  }
`;
