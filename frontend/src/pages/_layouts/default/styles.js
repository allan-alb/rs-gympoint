import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: #f5f5f5;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 10px auto;
  padding: 0 60px;
`;

export const SectionHeader = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 1100px;
  width: 100%;
  height: 64px;
  margin: 10px 0;

  h2 {
    font-size: 24px;
    line-height: 28px;
  }

  button {
    font-weight: bold;
    height: 36px;
    margin: 0 8px;
    padding: 10px 20px 10px 40px;
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

  input {
    height: 36px;
    width: 237px;
    margin: 0 8px;
    padding: 10px 20px 10px 40px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1100px;
  padding: 10px 40px;

  table {
    width: 100%;
    max-width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 10px 10px;
    background-color: transparent;
    overflow-x: auto;
    background: #fff;
    border-radius: 4px;

    th,
    td {
      padding: 0.75rem;
      text-align: center;
    }

    tr {
      & + tr {
        td {
          border-top: 1px solid #eee;
        }
      }
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
  margin-right: 10px;
  display: flex;
  flex-direction: row;

  a {
    font-size: 14px;
    margin: 0 5px;
    text-decoration: none;
    color: #4d85ee;
    cursor: pointer;

    & + a {
      color: #de3b3b;
    }
  }

  button.delete {
    font-size: 14px;
    margin: 0 5px;
    text-decoration: none;
    color: #de3b3b;
    cursor: pointer;
    border: none;
    background: #fff;
  }
`;
