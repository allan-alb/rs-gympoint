import React from 'react';
import { Link } from 'react-router-dom';

import { Container, SectionHeader, Content, Controls } from '../../_layouts/default/styles';

function Plans() {
  return (
    <Container>
      <SectionHeader>
        <h2>Gerenciando planos</h2>
        <Link to="plans/new">
          <button className="primary" type="button">Cadastrar</button>
        </Link>
      </SectionHeader>
      <Content>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Duração</th>
              <th>Valor p/ mês</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Plano 1</td>
              <td>1 mês</td>
              <td>R$ 35,00</td>
              <td>
                <Controls>
                  <Link to={() => { }}>editar</Link>
                  <Link to={() => { }}>apagar</Link>
                </Controls>
              </td>
            </tr>
          </tbody>
        </table>
      </Content>
    </Container>
  );
}

export default Plans;
