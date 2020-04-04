const amqp = require('amqplib');
const { QUEUE_NAME, QUEUE_URL } = require('../constants');

let channel;

const connect = () =>
  amqp.connect(QUEUE_URL).then((conn) => conn.createChannel());

const test = async () => {
  const result = await channel.assertQueue(QUEUE_NAME);
  console.log('Sender connection to channel result', result);
};

const initalize = async () => {
  channel = await connect();
  await test();
};

const send = async (msg) => {
  const options = { pesrsistent: true };
  const sent = await channel.sendToQueue(QUEUE_NAME, Buffer.from(msg), options);
  console.log('sent:', sent);
  return sent;
};

module.exports = {
  initalize,
  send,
};
