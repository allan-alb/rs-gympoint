import React from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';

import { Container } from './styles';


const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <Container>
      <div className={showHideClassName}>
        <section className="modal-main">
          <div className="top-bar">
            <button type="button" className="close" onClick={handleClose}> <MdClose size={16} color="#333" /> </button>
          </div>
          <div className="content">
            {children}
          </div>
          <button className="submit" form="answerForm" type="submit">Responder aluno</button>
        </section>
      </div>
    </Container>
  );
};

export default Modal;

Modal.defaultProps = {
  show: false,
  children: {},
  handleClose: () => { },
}

Modal.propTypes = {
  children: PropTypes.objectOf(PropTypes.string),
  show: PropTypes.bool,
  handleClose: PropTypes.func,
}