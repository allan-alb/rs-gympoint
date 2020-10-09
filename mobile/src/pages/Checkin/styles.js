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

export const CheckinList = styled.FlatList``;

export const CheckinItem = styled.View`
  border: 1px solid #ddd;
  border-radius: 4px;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 20px;
  margin: 5px 0;
`;

export const CheckinNumber = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #444444;
  text-align: left;
`;

export const CheckinDate = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: right;
`;
