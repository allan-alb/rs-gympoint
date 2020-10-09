import React from 'react';
import { useDispatch } from 'react-redux';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

import { signOut } from '~/store/modules/user/actions';

import {
  Container,
  Logo,
  RightImage,
  LogoText,
  HeaderLeft,
  HeaderRight,
} from './styles';

import halterLeft from '~/assets/halterleft.png';
import halterRight from '~/assets/halterright.png';

export default function Header({ backTo }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <Container>
      <HeaderLeft onPress={() => backTo && navigation.navigate(backTo)}>
        {backTo && <Icon name="navigate-before" size={20} color="#000" />}
      </HeaderLeft>
      <Logo>
        <Image source={halterLeft} />
        <RightImage source={halterRight} />
        <LogoText>GYMPOINT</LogoText>
      </Logo>
      <HeaderRight onPress={() => dispatch(signOut())}>
        <Icon name="login" size={18} color="#eee" />
      </HeaderRight>
    </Container>
  );
}

Header.propTypes = {
  backTo: PropTypes.string,
};

Header.defaultProps = {
  backTo: null,
};
