import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

import api from '~/services/api';

import Header from '~/components/Header';

import { Container, Content, Button, TextArea, ButtonText } from './styles';

export default function New() {
  const { user_id } = useSelector((state) => state.user);
  const [question, setQuestion] = useState('');

  async function handleSubmit() {
    try {
      const response = await api.post(`students/${user_id}/help-orders`, {
        question,
      });

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Pedido enviado com sucesso');
      }
    } catch (err) {
      Alert.alert(
        'Erro',
        'Houve um erro ao enviar seu pedido. Favor tente novamente',
      );
    }
  }

  return (
    <Container>
      <Header backTo="HelpOrderList" />
      <Content>
        <TextArea
          placeholder="Digite seu pedido de auxílio"
          onChangeText={setQuestion}
          value={question}
        />
        <Button onPress={handleSubmit}>
          <ButtonText>Enviar pedido</ButtonText>
        </Button>
      </Content>
    </Container>
  );
}
