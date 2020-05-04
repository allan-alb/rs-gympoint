import { subWeeks, format } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

class CheckinController {
  async index(req, res) {
    const { id } = req.params;

    const checkins = await Checkin.findAll({
      where: { student_id: id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { id } = req.params;

    const currentDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx");

    const enrollment = await Enrollment.findOne({
      where: {
        student_id: id,
        start_date: { [Op.lte]: currentDate },
        end_date: { [Op.gte]: currentDate },
      },
    });

    if (!enrollment) {
      return res
        .status(400)
        .json({ error: 'Unable to check-in. Student not currently enrolled.' });
    }

    const checkins = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: {
          [Op.between]: [subWeeks(new Date(), 1), new Date()],
        },
      },
    });

    if (checkins.length > 5) {
      return res
        .status(400)
        .json({ error: 'Unable to check-in. Weekly check-in limit reached.' });
    }

    const checkin = await Checkin.create({ student_id: id });

    return res.json(checkin);
  }
}

export default new CheckinController();
