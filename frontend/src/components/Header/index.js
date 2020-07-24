import React from 'react';
import { NavLink } from 'react-router-dom';

import { Container, Content, Profile, Logo } from './styles';

import halterLeft from '../../assets/halterleft.png';
import halterRight from '../../assets/halterright.png';


function Header() {
  return (
    <Container>
      <Content>
        <div>
          <Logo>
            <img src={halterLeft} alt="GymPoint" />
            <img src={halterRight} alt="GymPoint" />
            <h3>GYMPOINT</h3>
          </Logo>
          <nav>
            <ul>
              <li><NavLink activeStyle={{ color: '#444' }} to="/students">Alunos</NavLink></li>
              <li><NavLink activeStyle={{ color: '#444' }} to="/plans">Planos</NavLink></li>
              <li><NavLink activeStyle={{ color: '#444' }} to="/enrollments">Matrículas</NavLink></li>
              <li><NavLink activeStyle={{ color: '#444' }} to="/help_orders">Pedidos de auxílio</NavLink></li>
            </ul>
          </nav>
        </div>
        <Profile>
          <span>Diego Silveira</span>
          <button type="button">Sair do sistema</button>
        </Profile>
      </Content>
    </Container>
  );
}

export default Header;