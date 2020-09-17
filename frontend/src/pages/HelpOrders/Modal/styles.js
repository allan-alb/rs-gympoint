import styled from 'styled-components';

export const Container = styled.div`
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }

  .modal-main {
    border-radius: 4px;
    padding: 10px 20px 20px 20px;
    position: fixed;
    background: white;
    width: 40%;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: left;

    div.top-bar {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }

    button.close {
      border: none;
      background: #fff;
    }

    div.content {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      p {
        font: 16px 'Roboto', sans-serif;
        line-height: 26px;
        color: #666;
      }

      span {
        color: #444;
        font: 14px 'Roboto', sans-serif;
        font-weight: bold;
        line-height: 16px;
        margin-top: 10px;
        margin-bottom: 5px;
      }

      textarea {
        padding: 10px;
        width: 100%;
        height: 80px;
        resize: vertical;
        font-size: 16px;
      }
    }

    button.submit {
      background: #ee4d64;
      color: #fff;
      width: 100%;
      height: 45px;
      border-radius: 4px;
      border: none;
      margin-top: 20px;
      line-height: 19px;
      font: 16px 'Roboto', sans-serif;
      font-weight: bold;

      &:hover {
        opacity: 0.9;
      }
    }
  }

  .display-block {
    display: block;
  }

  .display-none {
    display: none;
  }
`;