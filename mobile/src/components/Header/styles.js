import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  height: 60px;
  justify-content: space-around;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

export const Logo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RightImage = styled.Image`
  margin-left: -14px;
`;

export const LogoText = styled.Text`
  margin-left: 10px;
  color: #ee4e62;
  font-size: 16px;
  font-weight: bold;
`;

export const HeaderLeft = styled.TouchableOpacity``;

export const HeaderRight = styled.TouchableOpacity``;
