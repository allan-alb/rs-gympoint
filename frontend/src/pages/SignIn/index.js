import React from 'react';
import { Form, Input, Label } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '../../assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string().email('Insira um e-mail válido').required('Favor inserir um e-mail'),
  password: Yup.string().required('A senha é obrigatória'),
});

function SignIn() {

  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <img src={logo} alt="GymPoint"/>
      <Form onSubmit={handleSubmit} schema={schema}>
        <Input type="email" name="email" label="Seu E-mail" placeholder="exemplo@email.com" />
        <Input type="password" name="password" label="Sua Senha" placeholder="********" />
        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  );
}

export default SignIn;
