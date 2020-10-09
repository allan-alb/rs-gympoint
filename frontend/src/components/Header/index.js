import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '../../store/modules/auth/actions';

import { Container, Content, Profile, Logo } from './styles';

import halterLeft from '../../assets/halterleft.png';
import halterRight from '../../assets/halterright.png';

function Header() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.profile.name);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <div>
          <Logo>
            <img src={halterLeft} alt="GymPoint" />
            <img src={halterRight} alt="GymPoint" style={{ marginLeft: -14 }} />
            <h3>GYMPOINT</h3>
          </Logo>
          <nav>
            <ul>
              <li>
                <NavLink activeStyle={{ color: '#444' }} to="/students">
                  Alunos
                </NavLink>
              </li>
              <li>
                <NavLink activeStyle={{ color: '#444' }} to="/plans">
                  Planos
                </NavLink>
              </li>
              <li>
                <NavLink activeStyle={{ color: '#444' }} to="/enrollments">
                  Matrículas
                </NavLink>
              </li>
              <li>
                <NavLink activeStyle={{ color: '#444' }} to="/help_orders">
                  Pedidos de auxílio
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <Profile>
          <span>{userName}</span>
          <button type="button" onClick={handleSignOut}>
            Sair do sistema
          </button>
        </Profile>
      </Content>
    </Container>
  );
}

export default Header;
