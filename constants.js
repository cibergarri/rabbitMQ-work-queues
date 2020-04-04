module.exports = {
  QUEUE_URL : 'amqp://localhost' || process.env.QUEUE_URL,
  QUEUE_NAME: 'task_queue' || process.env.QUEUE_NAME,
  NO_ACK    : false,
};
