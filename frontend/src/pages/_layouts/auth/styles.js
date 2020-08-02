import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background: #fff;
  width: 100%;
  max-width: 360px;
  text-align: center;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  img {
    margin-top: 40px;
    width: 150px;
    height: 100px;
  }

  label {
    font-weight: bold;
    line-height: 16px;
    font-size: 14px;
    text-align: left;
    margin-bottom: 5px;
    margin-top: 10px;
  }

  form {
    margin: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    input {
      width: 100%;
      height: 45px;
    }

    span {
      color: darkred;
    }

    button {
      margin: 20px 0 10px;
      padding: 15px;
      border-radius: 4px;
      border: none;
      background: #ee4d64;
      color: #fff;
      height: 45px;
      flex: 1;
      font-size: 14px;
      font-weight: bold;

      &:hover {
        opacity: 0.9;
      }
    }
  }
`;
