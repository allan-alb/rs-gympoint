import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useSelector } from 'react-redux';

import Header from '~/components/Header';

import api from '~/services/api';

import {
  Container,
  Content,
  Button,
  ButtonText,
  CheckinList,
  CheckinItem,
  CheckinNumber,
  CheckinDate,
} from './styles';

export default function Checkin() {
  const [checkins, setCheckins] = useState([]);
  const { user_id } = useSelector((state) => state.user);

  async function loadCheckins() {
    const response = await api.get(`students/${user_id}/checkins`);

    const checkinResponse = response.data;
    let checkinArray = [];
    let count = checkinResponse.length + 1;
    checkinArray = checkinResponse.map((checkin) => {
      const dateFormatted = formatRelative(
        parseISO(checkin.createdAt),
        new Date(),
        { locale: pt },
      );
      count -= 1;
      return { ...checkin, dateFormatted, count };
    });

    setCheckins(checkinArray);
  }

  async function newCheckin() {
    try {
      const response = await api.post(`students/${user_id}/checkins`);
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Check-in realizado com sucesso');
        loadCheckins();
      } else {
        Alert.alert('Erro', 'Houve um problema ao realizar o check-in');
      }
    } catch (err) {
      Alert.alert(
        'Erro',
        'Houve um problema ao realizar o check-in. Verifique sua conexão e se está atualmente matriculado.',
      );
    }
  }

  useEffect(() => {
    loadCheckins();
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <Button onPress={newCheckin}>
          <ButtonText>Novo check-in</ButtonText>
        </Button>
        <CheckinList
          data={checkins}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <CheckinItem>
              <CheckinNumber>Checkin-in #{item.count}</CheckinNumber>
              <CheckinDate>{item.dateFormatted}</CheckinDate>
            </CheckinItem>
          )}
        />
      </Content>
    </Container>
  );
}
