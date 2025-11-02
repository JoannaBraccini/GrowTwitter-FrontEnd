import styled from "styled-components";

export const UserCardStyle = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 10px;

  @media (max-width: 600px) {
    min-width: 0; /* Permite flexbox comprimir apenas no mobile */
    gap: 4px;
  }

  .avatar {
    @media (max-width: 1024px) {
      margin-left: -4px; /* Move o avatar para a esquerda no mobile e tablet */
      padding-right: 6px;
    }
  }

  h3 {
    font-weight: bold;
    font-size: 15px;
    line-height: 20px;
    white-space: nowrap;
    flex-shrink: 0;

    @media (max-width: 600px) {
      font-size: 15px;
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-shrink: 1;
      min-width: 0;
    }
  }

  .verified {
    flex-shrink: 0; /* Nunca comprime o ícone */
    img {
      width: 14px !important;
      height: 14px !important;
    }
  }

  small {
    color: ${({ theme }) => theme.textSecondary};
    font-size: 15px;
    line-height: 20px;
    display: flex;
    gap: 4px;
    white-space: nowrap;
    flex-shrink: 0;

    @media (max-width: 600px) {
      font-size: 13px;
      gap: 2px;
      line-height: 20px;
      flex-shrink: 1;
      min-width: 0;
    }

    .username {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-shrink: 1;
      min-width: 0;

      @media (max-width: 600px) {
        max-width: 50px;
        flex-shrink: 1;
        min-width: 0;
      }
    }
  }

  .date {
    color: ${({ theme }) => theme.textSecondary};
    font-size: 15px;
    line-height: 20px;
    white-space: nowrap;
    flex-shrink: 0;

    @media (max-width: 600px) {
      font-size: 13px;
      line-height: 20px;
    }
  }

  .date::first-letter {
    font-size: 18px;
    font-weight: bold;
  }
`;
