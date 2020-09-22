import * as Yup from 'yup';
import { parseISO, addMonths, format } from 'date-fns';
import { Op } from 'sequelize';
import pt from 'date-fns/locale/pt';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';
import Queue from '../../lib/Queue';
import EnrollmentMail from '../jobs/EnrollmentMail';
import EnrollmentUpdatedMail from '../jobs/EnrollmentUpdatedMail';
import EnrollmentCanceledMail from '../jobs/EnrollmentCanceledMail';

class EnrollmentController {
  async index(req, res) {
    // const { student, plan } = req.query;
    // const active = req.query.active === 'true';
    const whereDate = {};
    /*
    if (active) {
      const currentDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx");
      whereDate.where = {
        start_date: { [Op.lte]: currentDate },
        end_date: { [Op.gte]: currentDate },
      };
    } */

    const enrollments = await Enrollment.findAll({
      ...whereDate,
      order: ['start_date'],
      attributes: ['id', 'student_id', 'plan_id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration'],
        },
      ],
    });

    return res.json(enrollments);
  }

  async show(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.findOne({
      where: { id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });
    if (!enrollment) {
      return res.status(400).json({ error: 'Invalid enrollment id.' });
    }

    return res.json(enrollment);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    // Verificação se o aluno já está matriculado em algum plano na data de inicio
    const { student_id, plan_id, start_date } = req.body;
    const date = start_date;

    const existingEnrollment = await Enrollment.findOne({
      where: {
        student_id,
        start_date: {
          [Op.lte]: date,
        },
        end_date: {
          [Op.gte]: date,
        },
      },
    });

    if (existingEnrollment) {
      return res
        .status(400)
        .json({ error: 'Student already enrolled in a plan at start date.' });
    }

    const {
      title: plan_title,
      duration,
      price: planPrice,
    } = await Plan.findByPk(plan_id);
    const price = planPrice * duration;
    const parsedStartDate = parseISO(start_date);
    const parsedEndDate = addMonths(parsedStartDate, duration);
    const end_date = format(parsedEndDate, "yyyy-MM-dd'T'HH:mm:ssxxx");

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    // Organiza os dados e chama o envio de e-mail para o aluno matriculado
    const student = await Student.findByPk(student_id);

    const mailData = {
      plan: { title: plan_title, duration, price: planPrice },
      student,
      price,
      parsedStartDate,
      parsedEndDate,
    };

    EnrollmentController.setMail(mailData, 'create');

    return res.json(enrollment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { id } = req.params;
    const enrollment = await Enrollment.findOne({
      where: { id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });
    if (!enrollment) {
      return res.status(400).json({ error: 'Invalid enrollment id.' });
    }
    const {
      student_id: validId,
      plan_id: validPlan,
      start_date: validDate,
    } = req.body;
    const student_id = validId || enrollment.student_id;
    const plan_id = validPlan || enrollment.plan_id;
    const start_date =
      validDate || format(enrollment.start_date, "yyyy-MM-dd'T'HH:mm:ssxxx");

    if (
      student_id !== enrollment.student_id ||
      start_date !== format(enrollment.start_date, "yyyy-MM-dd'T'HH:mm:ssxxx")
    ) {
      // Verificação se o aluno já está matriculado em algum plano na data de inicio
      const date = start_date;

      const existingEnrollment = await Enrollment.findOne({
        where: {
          student_id,
          id: {
            [Op.not]: id,
          },
          start_date: {
            [Op.lte]: date,
          },
          end_date: {
            [Op.gte]: date,
          },
        },
      });

      if (existingEnrollment) {
        return res
          .status(400)
          .json({ error: 'Student already enrolled in a plan at start date.' });
      }
    }

    if (
      plan_id !== enrollment.plan_id ||
      start_date !== format(enrollment.start_date, "yyyy-MM-dd'T'HH:mm:ssxxx")
    ) {
      const { title: plan_title, duration, price: planPrice } =
        plan_id !== enrollment.plan_id
          ? await Plan.findByPk(plan_id)
          : enrollment.plan;
      const price = planPrice * duration;
      const parsedStartDate = parseISO(start_date);
      const parsedEndDate = addMonths(parsedStartDate, duration);
      const end_date = format(parsedEndDate, "yyyy-MM-dd'T'HH:mm:ssxxx");
      const student =
        student_id.toString() !== enrollment.student.id
          ? await Student.findOne({
            where: { id: student_id },
            attributes: ['id', 'name', 'email'],
          })
          : enrollment.student;
      const mailData = {
        plan: { title: plan_title, duration, price: planPrice },
        student,
        price,
        parsedStartDate,
        parsedEndDate,
      };

      await enrollment.update({
        student_id,
        plan_id,
        start_date,
        end_date,
        price,
      });
      EnrollmentController.setMail(mailData, 'update');

      return res.json({
        id,
        student_id,
        plan_id,
        start_date,
        end_date,
        student,
      });
    }

    if (student_id !== enrollment.student_id) {
      // Prepara dados para o envio do email
      const { title: plan_title, duration, price: planPrice } = enrollment.plan;
      const price = planPrice * duration;
      const parsedStartDate = parseISO(start_date) || enrollment.start_date;
      const parsedEndDate = addMonths(parsedStartDate, duration);
      const student = await Student.findOne({
        where: { id: student_id },
        attributes: ['id', 'name', 'email'],
      });

      const mailData = {
        plan: { title: plan_title, duration, price: planPrice },
        student,
        price,
        parsedStartDate,
        parsedEndDate,
      };

      const { end_date } = await enrollment.update({ student_id });

      EnrollmentController.setMail(mailData, 'create');

      const canceledEnrollMail = {
        plan: { title: plan_title, duration, price: planPrice },
        student: enrollment.student,
        price,
        parsedStartDate,
        parsedEndDate,
      };
      EnrollmentController.setMail(canceledEnrollMail, 'delete');

      return res.json({
        id,
        student_id,
        plan_id,
        start_date,
        end_date,
        price,
        student,
      });
    }

    return res.json();
  }

  async delete(req, res) {
    const { id } = req.params;
    const enrollment = await Enrollment.findOne({
      where: { id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });
    if (!enrollment) {
      return res.status(400).json({ error: 'Invalid enrollment id.' });
    }

    // const { title: plan_title, duration, price: planPrice } = enrollment.plan;
    const price = enrollment.plan.price * enrollment.plan.duration;
    // Prepara dados para o envio do email
    const parsedStartDate = enrollment.start_date;
    const parsedEndDate = addMonths(parsedStartDate, enrollment.plan.duration);
    const mailData = {
      plan: enrollment.plan,
      student: enrollment.student,
      price,
      parsedStartDate,
      parsedEndDate,
    };

    await Enrollment.destroy({ where: { id } });

    EnrollmentController.setMail(mailData, 'delete');

    return res.json();
  }

  static async setMail(data, emailKey) {
    // Organiza os dados e chama o envio de e-mail para o aluno matriculado
    const { name: student_name, email: student_email } = data.student;
    const readableStartDate = format(
      data.parsedStartDate,
      "EEEE', dia' dd 'de' MMMM 'de' Y",
      { locale: pt }
    );
    const readableEndDate = format(
      data.parsedEndDate,
      "EEEE', dia' dd 'de' MMMM 'de' Y",
      {
        locale: pt,
      }
    );
    const readablePrice = Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(data.price / 100);
    const mes = data.plan.duration === 1 ? 'mês' : 'meses';
    const planInfo = `${data.plan.title} (${data.plan.duration} ${mes})`;
    const enrolledData = {
      student_name,
      student_email,
      planInfo,
      startDate: readableStartDate,
      endDate: readableEndDate,
      price: readablePrice,
    };
    if (emailKey === 'update') {
      await Queue.add(EnrollmentUpdatedMail.key, {
        enrolledData,
      });
    } else if (emailKey === 'create') {
      await Queue.add(EnrollmentMail.key, {
        enrolledData,
      });
    } else if (emailKey === 'delete') {
      await Queue.add(EnrollmentCanceledMail.key, {
        enrolledData,
      });
    }
  }
}

export default new EnrollmentController();
