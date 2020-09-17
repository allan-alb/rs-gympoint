import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import { Container, SectionHeader, Content, Controls } from '../../_layouts/default/styles';

function Students() {
  const [students, setStudents] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [searchStudent, setSearchStudent] = useState('');

  async function loadStudents() {
    const response = await api.get('students');
    setStudents(response.data.students);
    setStudentsList(response.data.students);
  }

  function handleSearch() {
    if (searchStudent !== '') {
      const filteredList = students.filter((student) => {
        return student.name.toUpperCase().includes(searchStudent.toUpperCase());
      });
      setStudentsList(filteredList);
    } else {
      setStudentsList(students);
    }
  }

  async function handleDelete(id) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Tem certeza de que deseja remover?")) {
      const response = await api.delete(`students/${id}`);

      if (response.status === 200 || response.status === 204) {
        toast.success("Removido com sucesso");
      } else {
        toast.error("Ocorreu um erro");
      }
      loadStudents();
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchStudent]);

  return (
    <Container>
      <SectionHeader>
        <h2>Gerenciando alunos</h2>
        <div>
          <Link to="students/new">
            <button className="primary" type="button">Cadastrar</button>
          </Link>
          <input type="text" placeholder="Buscar aluno" value={searchStudent} onChange={(e) => setSearchStudent(e.target.value)} />
        </div>
      </SectionHeader>
      <Content>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Idade</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {studentsList.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>
                  <Controls>
                    <Link to={`/students/${student.id}/edit`}>editar</Link>
                    <button type="button" className="delete" onClick={() => handleDelete(student.id)}>apagar</button>
                  </Controls>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </Container>
  );
}

export default Students;
