import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-content: center;

  div {
    display: flex;
    justify-content: space-around;
    align-items: center;

    nav {
      font-size: 15px;
      margin-left: 20px;
      padding-left: 20px;
      border-left: 1px solid #eee;

      li {
        font: 14px 'Roboto', sans-serif;
        font-weight: bold;
        display: inline;

        & + li {
          margin-left: 15px;
        }

        a {
          color: ${(props) => (props.activeClassName ? '#444' : '#999')};
        }
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    margin-top: 20px;
    margin-bottom: 5px;
    font-size: 14px;
    line-height: 16px;
    text-align: right;
  }

  button {
    margin-bottom: 20px;
    border: none;
    color: #ee4d64;
    background: #fff;
    font: 10px 'Roboto', sans-serif;
    font-weight: bold;
    text-align: right;
  }
`;

export const Logo = styled.div`
  display: flex;
  flex: 0;
  justify-content: flex-start;
  align-items: center;

  h3 {
    flex: 1;
    color: #ee4d64;
    font-size: 15px;
    margin-left: 20px;
  }
`;
