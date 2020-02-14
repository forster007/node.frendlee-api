import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import SignUpMail from '../app/jobs/SignUpMail';
import { redisConfig } from '../config';

const jobs = [CancellationMail, SignUpMail];

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
          removeOnSuccess: true,
          removeOnFailure: true,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee
        .on('failed', this.handleFailure)
        .on('succeeded', this.handleSucceeded)
        .process(handle);
    });
  }

  handleFailure(job, error) {
    console.log(`Queue ${job.queue.name}: FAILED`, error);
  }

  handleSucceeded(job) {
    switch (job.queue.name) {
      case 'SignUpMail': {
        console.log(`SignUp e-mail: Sended to ${job.data.email}`);
        break;
      }

      default:
        console.log(`Queue ${job.queue.name} succeeded: ${job.data}`);
        break;
    }
  }
}

export default new Queue();
