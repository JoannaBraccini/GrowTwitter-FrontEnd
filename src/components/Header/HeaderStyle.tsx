import styled from "styled-components";

export const HeaderStyle = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  background-color: var(--white-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  z-index: 1000;
  box-shadow: 0 0 2px var(--grey-color-light);

  .logo-item {
    display: flex;
    align-items: center;
    column-gap: 10px;
    font-size: 22px;
    font-weight: 500;
    color: var(--blue-color);
  }
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  .search-bar {
    height: 47px;
    max-width: 430px;
    width: 100%;
  }
  .search-bar input {
    height: 100%;
    width: 100%;
    border-radius: 25px;
    font-size: 18px;
    outline: none;
    background-color: var(--white-color);
    color: var(--grey-color);
    border: 1px solid var(--grey-color-light);
    padding: 0 20px;
  }
  .header-content {
    display: flex;
    align-items: center;
    column-gap: 25px;
  }
  .header-content i {
    cursor: pointer;
    font-size: 20px;
    color: var(--grey-color);
  }
`;
