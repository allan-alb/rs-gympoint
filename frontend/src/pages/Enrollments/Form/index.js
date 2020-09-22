import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from "yup";
import { format, addMonths, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';

import Input from '../../../components/Input';
import Select from '../../../components/Select';
import AsyncSelect from '../../../components/AsyncSelect';
import api from '../../../services/api';
import history from '../../../services/history';

import { Container, SectionHeader, Content } from '../../_layouts/default/styles';
import { FormDiv } from './styles';

const schema = Yup.object().shape({
  student_id: Yup.number().required(),
  plan_id: Yup.number().required(),
  start_date: Yup.date().required(),
})

function Enrollments() {
  const [enrollment, setEnrollment] = useState({});
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState({});
  const [selectedStudent, setSelectedStudent] = useState({});
  const [planOptions, setPlanOptions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [total, setTotal] = useState(0.0);
  const { id } = useParams();

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  function validateFields(data) {
    if (!data.student_id || !data.plan_id || !data.start_date) {
      return false;
    }
    if (data.student_id === '' || data.plan_id === '' || data.start_date === '') {
      return false;
    }
    return true;
  }

  function handleSetPlan(option) {
    setSelectedPlan(option);
  }

  async function handleSubmit(data) {
    if (id) {
      if (data.student_id == null) {
        data.student_id = enrollment.student_id;
      }
      if (data.plan_id == null) {
        data.plan_id = enrollment.plan_id;
      }

      if (validateFields(data)) {
        const formattedStartDate = format(parseISO(data.start_date, { locale: pt }), "yyyy-MM-dd'T'HH:mm:ssxxx");
        const newEnrollData = { ...data, start_date: formattedStartDate };

        const response = await api.put(`enrollments/${id}`, newEnrollData);

        if (response.status === 200) {
          toast.success('Salvo com sucesso');
        } else {
          toast.error(`Ocorreu um erro: ${response.statusText}`);
        }

        await timeout(2000);
        history.push('/enrollments');
        history.go('/enrollments');
      } else {
        alert('Preencha os campos corretamente');
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (validateFields(data)) {
        const formattedStartDate = format(parseISO(data.start_date, { locale: pt }), "yyyy-MM-dd'T'HH:mm:ssxxx");
        const newEnrollData = { ...data, start_date: formattedStartDate };

        const response = await api.post('enrollments/', newEnrollData);
        if (response.status === 200) {
          toast.success('Salvo com sucesso');
        } else {
          toast.error(`Ocorreu um erro: ${response.statusText}`);
        }

        await timeout(2000);
        history.push('/enrollments');
        history.go('/enrollments');
      } else {
        alert('Preencha os campos corretamente');
      }
    }
  }

  async function loadPlans() {
    const response = await api.get('plans');
    setPlans(response.data);

    const optionsArray = response.data.map((plan) => {
      return { value: plan.id, label: plan.title };
    })

    setPlanOptions(optionsArray);
  }

  async function fetchStudents(q) {
    if (q) {
      const response = await api.get('students', {
        params: { q },
      });

      const optionsArray = response.data.map((student) => {
        return { value: student.id, label: student.name };
      })

      return new Promise(resolve => {
        resolve(optionsArray);
      });
    }

    const response = await api.get('students');

    const optionsArray = response.data.map((student) => {
      return { value: student.id, label: student.name };
    })

    return new Promise(resolve => {
      resolve(optionsArray);
    });
  }

  async function calculateEndDateAndTotal() {
    const selectedPlanData = plans.find((plan) => (plan.id === selectedPlan.value));

    if (selectedPlanData) {
      const totalValue = (selectedPlanData.duration * (selectedPlanData.price / 100)).toFixed(2);
      setTotal(totalValue);
    }

    if (selectedPlanData && startDate) {
      const dateStartDate = new Date(parseISO(startDate, { locale: pt }));
      const dateEndDate = addMonths(dateStartDate, selectedPlanData.duration);
      setEndDate(format(dateEndDate, "yyyy-MM-dd"));
    }
  }

  async function loadEnrollment() {
    const response = await api.get(`enrollments/${id}`);

    const {
      start_date: enrollStartDate,
      end_date: enrollEndDate,
      plan: enrollPlan,
      student: enrollStudent,
      price,
    } = response.data;

    const formStartDate = format(parseISO(enrollStartDate, { locale: pt }), 'yyyy-MM-dd');
    setStartDate(formStartDate);

    const formEndDate = format(parseISO(enrollEndDate, { locale: pt }), 'yyyy-MM-dd');
    setEndDate(formEndDate);

    const formTotal = parseFloat(price) / 100;
    setTotal(formTotal);

    const selectedPlanOption = { value: enrollPlan.id, label: enrollPlan.title };
    setSelectedPlan(selectedPlanOption);

    const selectedStudentOption = { value: enrollStudent.id, label: enrollStudent.name };
    setSelectedStudent(selectedStudentOption);

    setEnrollment({
      student_id: enrollStudent.id,
      plan_id: enrollPlan.id,
    });
  }

  useEffect(() => {
    loadPlans();
    if (id) {
      loadEnrollment();
    }
  }, [])

  useEffect(() => {
    calculateEndDateAndTotal();
  }, [selectedPlan, startDate])


  return (
    <Container>
      <SectionHeader>
        <h2>{(id) ? 'Edição de matrícula' : 'Cadastro de matrícula'}</h2>
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
          <Form id="new-enrollment" onSubmit={handleSubmit} schema={schema} initialData={enrollment} >
            <AsyncSelect
              id="student_id"
              name="student_id"
              className="async-select"
              placeholder="Buscar alunos"
              label="Aluno"
              asyncFunc={fetchStudents}
              onChange={(e) => setSelectedStudent(e)}
              value={selectedStudent}
            />
            <div className="input-group">
              <div className="input-item">
                <Select name="plan_id"
                  className="react-select"
                  options={planOptions}
                  label="Plano"
                  onChange={(e) => handleSetPlan(e)}
                  value={selectedPlan}
                />
              </div>
              <div className="input-item">
                <Input type="date"
                  name="start_date"
                  placeholder="Escolha a data"
                  label="Data de início"
                  onChange={(e) => setStartDate(e.target.value)}
                  value={startDate}
                />
              </div>
              <div className="input-item">
                <Input name="end_date" type="date" disabled label="Data de término" value={endDate} />
              </div>
              <div className="input-item">
                <Input type="text" id="total_value" name="total_value" disabled label="Valor final" value={total} />
              </div>
            </div>
          </Form>
        </FormDiv>
      </Content>
    </Container>
  );
}

export default Enrollments;
