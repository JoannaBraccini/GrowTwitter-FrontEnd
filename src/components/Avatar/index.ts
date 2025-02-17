import styled from "styled-components";

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.backgroundColor};
  img {
    width: 100%;
    height: 100%;

    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
`;
