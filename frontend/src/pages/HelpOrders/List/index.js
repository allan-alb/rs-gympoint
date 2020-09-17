import React, { useState } from 'react';

import Modal from '../Modal';

import { Container, SectionHeader, Content, Controls } from '../../_layouts/default/styles';

function HelpOrders() {
  const [modal, setModal] = useState(false);
  const [question, setQuestion] = useState('');

  function showModal() {
    setModal(true);
  }

  function hideModal() {
    setModal(false);
  }

  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <Container>
      <SectionHeader>
        <h2>Pedidos de auxílio</h2>
      </SectionHeader>
      <Content>
        <Modal show={modal} handleClose={hideModal}>
          <form id="answerForm" method="post" onSubmit={handleSubmit}>
            <p><span>Pergunta do aluno</span></p>
            <p>{question}</p>
            <p><span>Sua resposta</span></p>
            <textarea name="answer" cols="90" rows="6" placeholder="Insira aqui sua resposta" />
          </form>
        </Modal>
        <table>
          <thead>
            <tr>
              <th>Aluno</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Lennert Nijenbijvank
              </td>
              <td>
                <Controls>
                  <a href={() => { }} onClick={() => showModal()}>responder</a>
                </Controls>
              </td>
            </tr>
          </tbody>
        </table>

      </Content>
    </Container>
  );
}

export default HelpOrders;
