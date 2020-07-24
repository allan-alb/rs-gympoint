import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: #EE4D64;
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

  form {
    margin: 40px 20px;
    display: flex;
    flex-direction: column;

    label {
      flex: 1;
      font-weight: bold;
      
      span {
        margin: 5px 2px;
        line-height: 16px;
        font-size: 14px;
        display: flex;
        justify-content: flex-start;
      }

      input {
        margin-bottom: 5px;
        flex: 1;
        width: 100%;
        height: 45px;
      }
    }

    button {
      margin: 10px 0;
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
