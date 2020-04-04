const amqp = require('amqplib');
const { QUEUE_NAME, QUEUE_URL, NO_ACK } = require('../constants');
const { handler }               = require('./task');

const connect = () => amqp.connect(QUEUE_URL).then(conn => conn.createChannel());

const test = async (channel) => {
  const options = { durable: true };
  const result = await channel.assertQueue(QUEUE_NAME, options);
  console.log('Receiver connection to channel result', result);
  return channel;
};

const onMessage = (channel) => async (msg) => {
  const messageContent = msg.content.toString();
  console.log(' [x] Received %s', messageContent);
  // Emulate the seconds the task will take from the dots in the message:
  const secs = messageContent.split('.').length - 1;    
  await handler(secs);
  if(!NO_ACK) channel.ack(msg); // Remember this, otherwise the tasks will not be cleaned from the queue!!
};

const subscribe = async (channel) => {
  const options = {
    // noAck: true  -> the task is cleaned from the queue in the moment is received. Error if we call chanhel.ack
    // noAck: false -> the task is not cleaned until we call channel.ack(). Therefore if the worker is stopped before finishing it, it will take it again
    noAck: NO_ACK, // https://www.rabbitmq.com/confirms.html
  }
  await channel.consume(QUEUE_NAME, onMessage(channel), options)
  return channel;
};

const initalize = async () => {
  await connect().then(test).then(subscribe);
};

module.exports = {
  initalize,
}
