import Mail from '../../lib/Mail';

class EnrollmentUpdatedMail {
  get key() {
    return 'EnrollmentUpdatedMail';
  }

  async handle({ data }) {
    const { enrolledData } = data;

    await Mail.sendMail({
      to: `${enrolledData.student_name} <${enrolledData.student_email}>`,
      subject: 'Sua matrícula na GymPoint foi alterada',
      template: 'enrollmentUpdated',
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

export default new EnrollmentUpdatedMail();
