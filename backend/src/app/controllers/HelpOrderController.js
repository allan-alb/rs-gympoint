import * as Yup from 'yup';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Queue from '../../lib/Queue';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import HelpOrderAnsweredMail from '../jobs/HelpOrderAnsweredMail';

class HelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: { answer: null },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [
        ['id', 'DESC'],
      ],
    });

    return res.json(helpOrders);
  }

  async show(req, res) {
    const { student_id } = req.params;

    const helpOrders = await HelpOrder.findAll({
      where: { student_id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [
        ['id', 'DESC'],
      ],
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const { student_id } = req.params;

    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const student = await Student.findOne({
      where: { id: student_id },
      attributes: ['id', 'name', 'email'],
    });
    if (!student) {
      return res.status(400).json({ error: 'Invalid student id. ' });
    }

    const { question } = req.body;

    const { id } = await HelpOrder.create({ student_id, question });

    return res.json({ id, student_id, question, student });
  }

  async answer(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });
    if (!schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { id } = req.params;
    const { answer } = req.body;
    const helpOrder = await HelpOrder.findOne({
      where: { id },
    });

    if (!helpOrder) {
      return res.status(400).json({ error: 'Help order id not found.' });
    }

    const answer_at = format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx");

    helpOrder.update({ answer, answer_at });

    // Organiza dados e chama o envio de email
    const { name: student_name, email: student_email } = await Student.findByPk(
      helpOrder.student_id
    );
    const answer_date = format(
      parseISO(answer_at),
      "EEEE', dia' dd 'de' MMMM 'de' Y', às' HH:mm'h'",
      { locale: pt }
    );

    const helpAnswerMail = {
      student_name,
      student_email,
      question: helpOrder.question,
      answer,
      answer_date,
    };

    await Queue.add(HelpOrderAnsweredMail.key, { helpAnswerMail });

    return res.json({ id, question: helpOrder.question, answer, answer_at });
  }
}

export default new HelpOrderController();
