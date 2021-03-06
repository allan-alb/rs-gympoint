import Bee from 'bee-queue';
import redisConfig from '../config/redis';
import EnrollmentMail from '../app/jobs/EnrollmentMail';
import EnrollmentUpdatedMail from '../app/jobs/EnrollmentUpdatedMail';
import EnrollmentCanceledMail from '../app/jobs/EnrollmentCanceledMail';
import HelpOrderAnsweredMail from '../app/jobs/HelpOrderAnsweredMail';

const jobs = [
  EnrollmentMail,
  EnrollmentUpdatedMail,
  EnrollmentCanceledMail,
  HelpOrderAnsweredMail,
];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    // eslint-disable-next-line no-console
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
