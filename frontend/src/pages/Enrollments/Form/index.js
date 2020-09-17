import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import { Container, SectionHeader, Content } from '../../_layouts/default/styles';

import { FormDiv } from './styles';

// Yup validation

function Enrollments() {
  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <Container>
      <SectionHeader>
        <h2>Matrículas</h2>
        <div>
          <Link to="/enrollments">
            <button className="secondary" type="button">Voltar</button>
          </Link>
          <button className="primary" form="new-enrollment" type="submit">
            Salvar
          </button>
        </div>
      </SectionHeader>
      <Content>
        <FormDiv>
          <Form id="new-enrollment" onSubmit={handleSubmit} >
            <Input type="text" name="student-name" placeholder="Buscar alunos" label="Aluno" />
            <div>
              <div>
                <Input type="text" name="plan" placeholder="Selecione o plano" label="Plano" />
              </div>
              <div>
                <Input type="date" name="start_date" placeholder="Escolha a data" label="Data de início" />
              </div>
              <div>
                <Input name="end_date" type="date" disabled label="Data de término" />
              </div>
              <div>
                <Input type="text" id="total_value" name="end_date" disabled label="Valor final" />
              </div>
            </div>
          </Form>
        </FormDiv>
      </Content>
    </Container>
  );
}

export default Enrollments;
