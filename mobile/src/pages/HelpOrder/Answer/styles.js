import styled from 'styled-components/native';

export const Container = styled.SafeAreaView``;

export const Content = styled.View`
  margin: 10px 20px;
`;

export const QuestionContainer = styled.View`
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const QuestionHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const QuestionHeaderTitle = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #444;
  text-align: left;
`;

export const QuestionTime = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: right;
`;

export const QuestionText = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: left;
  line-height: 26px;
  margin: 10px 0;
`;
