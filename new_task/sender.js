const amqp = require('amqplib');
const { QUEUE_NAME, QUEUE_URL } = require('../constants');

let channel;

const connect = () =>
  amqp.connect(QUEUE_URL).then((conn) => conn.createChannel());

const test = async () => {
  const options = {
    // persistent queues on rabbitMQ restart. Make sure it has not been previously created without this parameter
    durable: true,
  };
  const result = await channel.assertQueue(QUEUE_NAME, options);
  console.log('Sender connection to channel result', result);
};

const initalize = async () => {
  channel = await connect();
  await test();
};

const send = async (msg) => {
  const options = { persistent: true };
  const sent = await channel.sendToQueue(QUEUE_NAME, Buffer.from(msg), options);
  console.log(" [x] Sent '%s'", msg);
  return sent;
};

module.exports = {
  initalize,
  send,
};
