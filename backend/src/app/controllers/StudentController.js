import * as Yup from 'yup';
import { Op } from 'sequelize';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { q } = req.query;
    const whereName = {};

    if (q) {
      whereName.where = {
        name: { [Op.like]: '%' + q + '%' }
      }
    }

    const students = await Student.findAll({
      ...whereName,
    });

    return res.json({ students });
  }

  async show(req, res) {
    const { id } = req.params;
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student id not found.' });
    }

    return res.json(student);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      age: Yup.number().required().min(0).max(150),
      weight: Yup.number().required().min(0).max(730),
      height: Yup.number().required().min(50).max(280),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'User email already exists.' });
    }

    // eslint-disable-next-line prettier/prettier
    const { id, name, email, age, weight, height } = await Student.create(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      age: Yup.number().min(0).max(130),
      weight: Yup.number().min(0).max(730),
      height: Yup.number().min(50).max(280),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { id } = req.params;
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student id not found.' });
    }

    const { name, email, age, weight, height } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student id not found.' });
    }

    await student.destroy();
    return res.status(204).send();
  }
}

export default new StudentController();
