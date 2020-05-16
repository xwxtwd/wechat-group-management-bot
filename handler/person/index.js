/**
 * Created by J.Son on 2020/3/22
 */
const command = require('../command');
exports = module.exports = function (message) {
  console.log(message.text());
  if (command.sayHi(message)) {
  } else if (command.returnWangZheRank(message)) {
  }
};
