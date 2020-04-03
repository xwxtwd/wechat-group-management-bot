/**
 * Created by J.Son on 2020/3/22
 */
const {log} = require('wechaty');
exports = module.exports = function (message) {
  const content = message.text();
  if (content === '你好') {
    message.say('你好啊');
  }
};
