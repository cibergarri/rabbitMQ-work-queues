module.exports = {
  QUEUE_URL : 'amqp://localhost' || process.env.QUEUE_URL,
  QUEUE_NAME: 'task_queue' || process.env.QUEUE_NAME,
  QUEUE_PREFECH: 1 || process.env.QUEUE_PREFECH, // Number ot tasks a worker will handle at the same time
  NO_ACK    : false,
};
