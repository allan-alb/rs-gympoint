import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';

import { Container, SectionHeader, Content } from '../../_layouts/default/styles';
import { FormDiv } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  age: Yup.number().integer().required(),
  weight: Yup.number().required(),
  height: Yup.number().required(),
});

function Students() {
  const { id } = useParams();
  const [student, setStudent] = useState({});

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  async function handleSubmit(data) {
    if (!id) {
      const response = await api.post('students', data);
      if (response.status === 200) {
        toast.success('Salvo com sucesso');
      } else {
        toast.error(`Ocorreu um erro: ${response.statusText}`);
      }
    } else {
      const response = await api.put(`students/${id}`, data);
      if (response.status === 200) {
        toast.success('Alterado com sucesso');
      } else {
        toast.error(`Ocorreu um erro: ${response.statusText}`);
      }
    }

    await timeout(2000);
    history.push('/students');
    history.go('/students');

  }

  useEffect(() => {
    async function loadStudent() {
      const response = await api.get(`students/${id}`);
      setStudent(response.data);
    }

    if (id) {
      loadStudent();
    }
  }, [id]);

  return (
    <Container>
      <SectionHeader>
        <h2>{id > 0 ? 'Edição de aluno' : 'Cadastro de aluno'}</h2>
        <div>
          <Link to="/students">
            <button className="secondary" type="button">Voltar</button>
          </Link>
          <button className="primary" form="new-student" type="submit">
            Salvar
          </button>
        </div>
      </SectionHeader>
      <Content>
        <FormDiv>
          <Form id="new-student" schema={schema} onSubmit={handleSubmit} initialData={student}>
            <Input type="text" name="name" placeholder="John Doe" label="Nome completo" />
            <Input
              type="email"
              name="email"
              placeholder="exemplo@email.com"
              label="Endereço de e-mail"
            />
            <div>
              <div>
                <Input type="number" name="age" label="Idade" />
              </div>
              <div>
                <Input type="number" name="weight" label="Peso (kg)" />
              </div>
              <div>
                <Input type="number" name="height" label="Altura (cm)" />
              </div>
            </div>
          </Form>
        </FormDiv>
      </Content>
    </Container>
  );
}

export default Students;
