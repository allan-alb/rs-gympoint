import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { signInRequest } from '~/store/modules/user/actions';

import { Container, Logo, Input, Button, ButtonText } from './styles';

import logo from '~/assets/logo.png';

export default function Sign() {
  const [id, setId] = useState('');
  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(signInRequest(id));
  }

  return (
    <Container>
      <Logo source={logo} />
      <Input
        name="id"
        placeholder="Informe seu ID de cadastro"
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
        keyboardType="numeric"
        value={id}
        onChangeText={setId}
      />
      <Button onPress={handleSubmit}>
        <ButtonText>Entrar no sistema</ButtonText>
      </Button>
    </Container>
  );
}
