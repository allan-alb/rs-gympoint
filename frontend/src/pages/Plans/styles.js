import styled from 'styled-components';

export const sectionHeader = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 900px;
  width: 100%;
  height: 64px;
  padding: 0 20px;

  h2 {
    margin: 0 30px;
  }

  button #primary {
    color: #fff;
    background: #ee4d64;
  }

  button #secondary {
    color: #fff;
    background: #ccc;
  }
`;
