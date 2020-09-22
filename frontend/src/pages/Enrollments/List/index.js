import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import { Container, SectionHeader, Content, Controls } from '../../_layouts/default/styles';

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);

  async function loadEnrollments() {
    const response = await api.get('enrollments');
    setEnrollments(response.data);
  }

  useEffect(() => {
    loadEnrollments();
  }, []);

  function formatDate(date) {
    const formattedDate = format(parseISO(date), "d 'de' MMMM 'de' yyyy", { locale: pt });
    return formattedDate;
  }

  async function handleDelete(id) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Tem certeza de que deseja remover?')) {
      const response = await api.delete(`enrollments/${id}`);

      if (response.status === 200 || response.status === 204) {
        toast.success('Removido com sucesso');
      } else {
        toast.error('Ocorreu um erro');
      }
      loadEnrollments();
    }
  }

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
            {enrollments.map((enrollment) => (
              <tr key={enrollment.id}>
                <td>{enrollment.student.name}</td>
                <td>{enrollment.plan.title}</td>
                <td>{formatDate(enrollment.start_date)}</td>
                <td>{formatDate(enrollment.end_date)}</td>
                <td>{enrollment.active ? 'Sim' : 'Não'}</td>
                <td>
                  <Controls>
                    <Link to={`/enrollments/${enrollment.id}/edit`}>editar</Link>
                    <button type="button" className="delete" onClick={() => handleDelete(enrollment.id)}>apagar</button>
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

export default Enrollments;
