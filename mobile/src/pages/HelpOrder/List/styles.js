import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView``;

export const Content = styled.View`
  margin: 10px 20px;
`;

export const Button = styled(RectButton)`
  margin: 10px 0 10px;
  padding: 15px;
  border-radius: 4px;
  border: none;
  background: #ee4e62;
  width: 100%;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export const QuestionList = styled.FlatList``;

export const QuestionContainer = styled.TouchableOpacity`
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
  margin-bottom: 10px;
`;

export const QuestionAnswered = styled.Text`
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  color: ${(props) => (props.answered ? '#42cb59' : '#999')};
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
`;
