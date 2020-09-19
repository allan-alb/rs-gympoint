import React, { useMemo, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Container, SectionHeader, Content } from '../../_layouts/default/styles';
import { FormDiv } from './styles';
import api from '../../../services/api';
import history from '../../../services/history';

const schema = Yup.object().shape({
  title: Yup.string().required(),
  duration: Yup.number().min(1).integer().required(),
  price: Yup.number().required(),
});

function Plans() {
  const { id } = useParams();

  const [plan, setPlan] = useState({});
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  const totalPrice = useMemo(() => {
    let total = 0;
    if (price && duration) {
      total = (price * duration).toFixed(2);
    }

    return total;

  }, [price, duration, plan])

  async function handleSubmit(data) {
    console.log(data);
    const { title: submitTitle, duration: submitDuration, price: inputPrice } = data;
    const submitPrice = parseInt((inputPrice * 100), 10);
    const submitPlan = { title: submitTitle, duration: submitDuration, price: submitPrice };

    if (!id) {
      const response = await api.post('plans/', submitPlan);
      if (response.status === 200) {
        toast.success('Salvo com sucesso');
      } else {
        toast.error(`Ocorreu um erro: ${response.statusText}`);
      }
    } else {
      const response = await api.put(`plans/${id}`, submitPlan);
      if (response.status === 200) {
        toast.success('Salvo com sucesso');
      } else {
        toast.error(`Ocorreu um erro: ${response.statusText}`);
      }
    }

    await timeout(2000);
    history.push('/plans');
    history.go('/plans');
  }

  useEffect(() => {
    async function loadPlan() {
      const response = await api.get(`plans/${id}`);
      const { title: resTitle, duration: resDuration, price: resPrice } = response.data;
      const convertedPrice = parseFloat((resPrice / 100));
      setDuration(resDuration);
      setPrice(convertedPrice);
      setPlan({ title: resTitle, duration: resDuration, price: convertedPrice });
    }

    if (id) {
      loadPlan();
    }
  }, [])

  return (
    <Container>
      <SectionHeader>
        <h2>{(id) ? 'Edição de plano' : 'Cadastro de plano'}</h2>
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
          <Form id="new-plan" schema={schema} onSubmit={handleSubmit} initialData={plan} >
            <Input
              type="text"
              name="title"
              label="Título do plano"
            />
            <div>
              <div>
                <Input
                  type="number"
                  name="duration"
                  onChange={(e) => setDuration(e.target.value)}
                  label="Duração (em meses)"
                />
              </div>
              <div>
                <Input
                  type="number"
                  step="0.01"
                  name="price"
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
