import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Container, SectionHeader, Content } from '../../_layouts/default/styles';
import { FormDiv } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required(),
  duration: Yup.number().min(1).integer().required(),
  price: Yup.number().required(),
});

function Plans() {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);

  const totalPrice = useMemo(() => {
    let total = 0;
    if (price && duration) {
      total = price * duration;
    }

    return total;

  }, [price, duration])

  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <Container>
      <SectionHeader>
        <h2>Cadastro de plano</h2>
        <div>
          <Link to="/plans">
            <button className="secondary" type="button">Voltar</button>
          </Link>
          <button className="primary" form="new-plan" type="submit">
            Salvar
          </button>
        </div>
      </SectionHeader>
      <Content>
        <FormDiv>
          <Form id="new-plan" schema={schema} onSubmit={handleSubmit} >
            <Input
              type="text"
              name="title"
              label="Título do plano"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div>
              <div>
                <Input
                  type="number"
                  name="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  label="Duração (em meses)"
                />
              </div>
              <div>
                <Input
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  label="Preço mensal"
                />
              </div>
              <div>
                <Input
                  type="number"
                  name="totalprice"
                  disabled
                  value={totalPrice}
                  label="Preço total"
                />
              </div>
            </div>
          </Form>
        </FormDiv>
      </Content>
    </Container>
  );
}

export default Plans;
