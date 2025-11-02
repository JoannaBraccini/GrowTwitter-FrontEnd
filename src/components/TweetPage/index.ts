import styled from "styled-components";

export const TweetPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  flex: 1;

  .page-header {
    display: flex;
    align-items: center;
    gap: 10px;
    position: sticky;
    top: 0;
    z-index: 100;
    padding-top: 15px;

    button {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 20px;
      width: 40px;
    }
  }

  .title {
    font-size: 20px;
    font-weight: 800;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .reply-input-box {
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: 12px;
    padding: 15px;
    padding-left: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.highlight};
    cursor: text;

    @media (max-width: 768px) {
      padding: 12px 16px;
      gap: 8px;
    }

    .avatar-column {
      width: 40px;
      height: 40px;
    }

    .input-placeholder {
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.textSecondary};
      font-size: 17px;
      padding: 10px 0;

      @media (max-width: 768px) {
        font-size: 15px;
      }
    }
  }

  -webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
