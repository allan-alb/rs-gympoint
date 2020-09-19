import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import { Container, SectionHeader, Content, Controls } from '../../_layouts/default/styles';

function Plans() {
  const [plans, setPlans] = useState([]);

  async function loadPlans() {
    const response = await api.get('plans');
    setPlans(response.data);
  }

  async function handleDelete(id) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Tem certeza de que deseja remover?")) {
      const response = await api.delete(`plans/${id}`);

      if (response.status === 200 || response.status === 204) {
        toast.success("Removido com sucesso");
      } else {
        toast.error("Ocorreu um erro");
      }
      loadPlans();
    }
  }

  useEffect(() => {
    loadPlans();
  }, [])

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
            {plans.map((plan) => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td>{plan.duration + (plan.duration > 1 ? ' meses' : ' mês')}</td>

                <td>R$ {((plan.price / 100).toFixed(2)).toString().replace('.', ',')}</td>
                <td>
                  <Controls>
                    <Link to={`/plans/${plan.id}/edit`}>editar</Link>
                    <button type="button" className="delete" onClick={() => handleDelete(plan.id)}>apagar</button>
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

export default Plans;
