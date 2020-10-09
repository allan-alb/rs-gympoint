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

export const TextArea = styled.TextInput.attrs({
  multiline: true,
  numberOfLines: 15,
  textAlignVertical: 'top',
})`
  margin: 10px 0;
  padding: 20px 20px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
