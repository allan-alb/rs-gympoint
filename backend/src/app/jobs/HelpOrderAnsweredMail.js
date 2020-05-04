import Mail from '../../lib/Mail';

class HelpOrderAnsweredMail {
  get key() {
    return 'HelpOrderAnsweredMail';
  }

  async handle({ data }) {
    const { helpAnswerMail } = data;

    await Mail.sendMail({
      to: `${helpAnswerMail.student_name} <${helpAnswerMail.student_email}>`,
      subject: 'Sua pergunta na GymPoint foi respondida',
      template: 'helpOrderAnswered',
      context: {
        student_name: helpAnswerMail.student_name,
        question: helpAnswerMail.question,
        answer: helpAnswerMail.answer,
        answer_date: helpAnswerMail.answer_date,
      },
    });
  }
}

export default new HelpOrderAnsweredMail();
