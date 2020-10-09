import React from 'react';
import { View } from 'react-native';

import Header from '~/components/Header';

import {
  Container,
  Content,
  QuestionContainer,
  QuestionHeader,
  QuestionHeaderTitle,
  QuestionTime,
  QuestionText,
} from './styles';

export default function Answer({ route }) {
  const { helpOrder } = route.params;
  return (
    <Container>
      <Header backTo="HelpOrderList" />
      <Content>
        <QuestionContainer>
          <QuestionHeader>
            <QuestionHeaderTitle>Pergunta</QuestionHeaderTitle>
            <QuestionTime>{helpOrder.timeFormatted}</QuestionTime>
          </QuestionHeader>
          <QuestionText>{helpOrder.question}</QuestionText>
          <QuestionHeaderTitle>Resposta</QuestionHeaderTitle>
          <QuestionText>{helpOrder.answer}</QuestionText>
        </QuestionContainer>
      </Content>
    </Container>
  );
}
