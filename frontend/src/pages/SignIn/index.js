import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';
import logo from '../../assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string().email('Insira um e-mail válido').required('Favor inserir um e-mail'),
  password: Yup.string().required('A senha é obrigatória'),
});

function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit(data) {
    const { email, password } = data;

    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GymPoint" />
      <Form onSubmit={handleSubmit} schema={schema}>
        <Input type="email" name="email" label="Seu E-mail" placeholder="exemplo@email.com" />
        <Input type="password" name="password" label="Sua Senha" placeholder="********" />
        <button type="submit">{loading ? 'Carregando...' : 'Entrar no sistema'}</button>
      </Form>
    </>
  );
}

export default SignIn;
