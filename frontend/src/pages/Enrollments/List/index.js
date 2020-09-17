import React from 'react';
import { Link } from 'react-router-dom';

import { Container, SectionHeader, Content, Controls } from '../../_layouts/default/styles';

function Enrollments() {
  return (
    <Container>
      <SectionHeader>
        <h2>Gerenciando matrículas</h2>
        <Link to="enrollments/new">
          <button type="button" className="primary">
            Cadastrar
          </button>
        </Link>
      </SectionHeader>
      <Content>
        <table>
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Plano</th>
              <th>Início</th>
              <th>Término</th>
              <th>Ativa</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lennert Nijenbijvank</td>
              <td>Start</td>
              <td>30 de Abril de 2019</td>
              <td>30 de Maio de 2019</td>
              <td> </td>
              <td>
                <Controls>
                  <a href={() => { }}>editar</a>
                  <a href={() => { }}>apagar</a>
                </Controls>
              </td>
            </tr>
            <tr>
              <td>Sebastian Westergren</td>
              <td>Diamond</td>
              <td>14 de Outubro de 2019</td>
              <td>14 de Abril de 2020</td>
              <td> </td>
              <td>
                <Controls>
                  <a href={() => { }}>editar</a>
                  <a href={() => { }}>apagar</a>
                </Controls>
              </td>
            </tr>
          </tbody>
        </table>
      </Content>
    </Container>
  );
}

export default Enrollments;
