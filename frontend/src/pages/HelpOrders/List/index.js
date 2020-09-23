import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Textarea } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import Modal from '../Modal';

import { Container, SectionHeader, Content, Controls } from '../../_layouts/default/styles';

function HelpOrders() {
  const [modal, setModal] = useState(false);
  const [helpOrders, setHelpOrders] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [helpOrderId, setHelpOrderId] = useState(0);

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  function showModal(id) {
    const selectedHelpOrder = helpOrders.find((helpOrder) => helpOrder.id === id);
    setQuestion(selectedHelpOrder.question);
    setHelpOrderId(selectedHelpOrder.id);
    setAnswer('');
    setModal(true);
  }

  function hideModal() {
    setModal(false);
  }

  async function loadHelpOrders() {
    const response = await api.get('help-orders');
    setHelpOrders(response.data);
  }

  async function handleSubmit(data) {
    if (data.answer) {
      const response = await api.post(`help-orders/${data.id}/answer`, data);
      if (response.status === 200) {
        toast.success(`Questão respondida`);
      } else {
        toast.error('Ocorreu um erro');
      }

      await timeout(2000);
      hideModal();
      loadHelpOrders();
    } else {
      toast.warning('Insira uma resposta');
    }
  }

  useEffect(() => {
    loadHelpOrders();
  }, [])

  return (
    <Container>
      <SectionHeader>
        <h2>Pedidos de auxílio</h2>
      </SectionHeader>
      <Content>
        <Modal show={modal} handleClose={hideModal}>
          <Form id="answerForm" method="post" onSubmit={handleSubmit}>
            <Input type="hidden" name="id" value={helpOrderId} />
            <p><span>Pergunta do aluno</span></p>
            <p>{question}</p>
            <p><span>Sua resposta</span></p>
            <Textarea
              name="answer"
              cols="90"
              rows="6"
              placeholder="Insira aqui sua resposta"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </Form>
        </Modal>
        <table>
          <thead>
            <tr>
              <th>Aluno</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {helpOrders.map((helpOrder) => (
              <tr key={helpOrder.id}>
                <td>
                  {helpOrder.student.name}
                </td>
                <td>
                  <Controls>
                    <button type="button" className="primary" onClick={() => showModal(helpOrder.id)}>responder</button>
                  </Controls>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </Content>
    </Container>
  );
}

export default HelpOrders;
