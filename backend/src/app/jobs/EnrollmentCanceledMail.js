import Mail from '../../lib/Mail';

class EnrollmentCanceledMail {
  get key() {
    return 'EnrollmentCanceledMail';
  }

  async handle({ data }) {
    const { enrolledData } = data;

    await Mail.sendMail({
      to: `${enrolledData.student_name} <${enrolledData.student_email}>`,
      subject: 'Sua matrícula na GymPoint foi cancelada',
      template: 'enrollmentCanceled',
      context: {
        student_name: enrolledData.student_name,
        planInfo: enrolledData.planInfo,
        startDate: enrolledData.startDate,
        endDate: enrolledData.endDate,
        price: enrolledData.price,
      },
    });
  }
}

export default new EnrollmentCanceledMail();
