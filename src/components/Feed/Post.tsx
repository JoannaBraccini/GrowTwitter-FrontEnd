import styled from "styled-components";

export const Post = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.highlight};
  padding: 10px 0;

  .post-avatar {
    padding: 10px 10px 0 21px;
    img {
      border-radius: 50%;
      height: 40px;
    }
  }

  .post-body {
    flex: 1;
    img {
      width: 450px;
      object-fit: contain;
      border-radius: 20px;
    }
  }

  .post-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  /* .post-icons {
    display: flex;
    justify-content: space-between;
  } */

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

  .post-headerDescription {
    margin-bottom: 10px;
    font-size: 15px;
  }
`;
