import React from 'react';

import logo from '../../assets/logo.png';

function SignIn() {
  return (
    <>
      <img src={logo} alt="GymPoint"/>
      <form>
        <label htmlFor="email">
          <span>Seu E-mail</span>
          <input type="email" name="email" id="email" placeholder="exemplo@email.com" />
        </label>
        <label htmlFor="password">
          <span>Sua Senha</span>
          <input type="password" name="password" id="password" placeholder="********" />
        </label>
        <button type="submit">Entrar no sistema</button>
      </form>
    </>
  );
}

export default SignIn;
