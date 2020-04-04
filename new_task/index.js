const { initalize, send } = require('./sender');

const msg = process.argv.slice(2).join(' ') || 'Hello World!';

initalize()
  .then(() => send(msg))
  .catch(console.warn);