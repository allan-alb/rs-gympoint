import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px;
`;

export const Logo = styled.Image`
  width: 123px;
  height: 76px;
  margin: 15px;
`;

export const Input = styled.TextInput`
  margin: 10px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

export const Button = styled(RectButton)`
  margin: 10px 0 10px;
  padding: 15px;
  border-radius: 4px;
  border: none;
  background: #ee4d64;
  width: 100%;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;
