import styled from "styled-components";

export const UserCardStyle = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  display: flex;
  width: 100%;
  gap: 5px;
  h3 {
    font-weight: bold;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .verified {
    img {
      width: 14px !important;
      height: 14px !important;
    }
  }
  small {
    color: ${({ theme }) => theme.textSecondary};
    line-height: 22px;
    display: flex;
    gap: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .username {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100px; /* Ajuste conforme necessário */
    }
  }
`;
