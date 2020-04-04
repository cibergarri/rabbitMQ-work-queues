
const handler = (secs) => new Promise((resolve) => {
  setTimeout(() => {
    console.log(`[x] Done after ${secs} secs`);
    resolve();
  }, secs * 1000);
});

module.exports = {
  handler,
};