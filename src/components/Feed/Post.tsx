import styled from "styled-components";

export const Post = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #e6ecf0;
  padding-bottom: 10px;

  .post-avatar img {
    border-radius: 50%;
    height: 40px;
  }

  .post-body img {
    width: 450px;
    object-fit: contain;
    border-radius: 20px;
  }

  .post-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .post-badge {
    font-size: 14px !important;
    color: #50b7f5;
    margin-right: 5px;
  }

  .post-headerSpecial {
    font-weight: 600;
    font-size: 12px;
    color: gray;
  }

  .post-headerText h3 {
    font-size: 15px;
    margin-bottom: 5px;
  }

  .post-headerDescription {
    margin-bottom: 10px;
    font-size: 15px;
  }

  .post-body {
    flex: 1;
    padding: 10px;
  }

  .post-avatar {
    padding: 20px;
  }
`;
