import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '~/components/Header';

import {
  Container,
  Content,
  Button,
  ButtonText,
  QuestionList,
  QuestionContainer,
  QuestionHeader,
  QuestionAnswered,
  QuestionTime,
  QuestionText,
} from './styles';

import api from '~/services/api';

export default function List({ navigation }) {
  const [helpOrders, setHelpOrders] = useState([]);
  const { user_id } = useSelector((state) => state.user);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchHelpOrders = async () => {
        try {
          const response = await api.get(`students/${user_id}/help-orders`);

          const helpOrdersArray = response.data.map((helpOrder) => {
            const timeFormatted = formatRelative(
              parseISO(helpOrder.createdAt),
              new Date(),
              { locale: pt },
            );
            return { ...helpOrder, timeFormatted };
          });

          if (isActive) {
            setHelpOrders(helpOrdersArray);
          }
        } catch (e) {
          Alert.alert('Erro', 'Erro ao carregar dados');
        }
      };

      fetchHelpOrders();

      return () => {
        isActive = false;
      };
    }, []),
  );

  function handleNew() {
    navigation.navigate('HelpOrderNew');
  }

  return (
    <Container>
      <Header />
      <Content>
        <Button onPress={handleNew}>
          <ButtonText>Novo pedido de auxílio</ButtonText>
        </Button>
        <QuestionList
          data={helpOrders}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <QuestionContainer
              onPress={() =>
                navigation.navigate('HelpOrderAnswer', { helpOrder: item })
              }>
              <QuestionHeader>
                <QuestionAnswered answered={item.answer}>
                  <Icon
                    name="check-circle"
                    size={16}
                    color={item.answer ? '#42cb59' : '#999'}
                  />
                  {item.answer ? ' Respondido' : ' Sem resposta'}
                </QuestionAnswered>
                <QuestionTime>{item.timeFormatted}</QuestionTime>
              </QuestionHeader>
              <QuestionText>{item.question}</QuestionText>
            </QuestionContainer>
          )}
        />
      </Content>
    </Container>
  );
}
