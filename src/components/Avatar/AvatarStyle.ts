import styled from "styled-components";

export const AvatarStyle = styled.div`
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
  flex-shrink: 0;
  flex-grow: 0;
`;
