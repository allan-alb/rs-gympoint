import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: #f5f5f5;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 10px auto;
  padding: 0 60px;
`;

export const SectionHeader = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 900px;
  width: 100%;
  height: 64px;
  margin: 10px 0;

  h2 {
    font-size: 24px;
    line-height: 28px;
  }

  button {
    font-weight: bold;
    margin: 0 15px;
    height: 35px;
    padding: 10px 10px 10px 30px;
    border-radius: 4px;
    border: none;
  }

  button.primary {
    color: #fff;
    background: #ee4d64;
  }

  button.secondary {
    color: #fff;
    background: #ccc;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  padding: 10px 40px;

  table {
    width: 100%;
    max-width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 10px 0;
    background-color: transparent;
    overflow-x: auto;
    background: #fff;
    border-radius: 4px;

    th,
    td {
      padding: 0.75rem;
      text-align: center;
    }

    thead {
      font-size: 16px;
      display: table-header-group;
      vertical-align: bottom;
      border-color: inherit;
    }

    tbody {
      font-size: 16px;
      color: #666;
    }
  }
`;

export const Controls = styled.div`
  flex: 0;
  max-width: 60px;

  a {
    font-size: 14px;
    margin: 0 5px;
    text-decoration: none;
    color: #4d85ee;

    & + a {
      color: #de3b3b;
    }
  }
`;
