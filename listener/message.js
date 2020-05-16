const {Wechaty, Message, Contact, MediaMessage, MiniProgram} = require('wechaty');
const roomHandler = require('../handler/room');
const personHandler = require('../handler/person');
exports = module.exports = function (message) {
  // 跳过自己
  if (message.self()) return false;
  const sender = message.from();
  if (!sender) return false;
  // 只处理个人用户的信息
  switch (sender.type()) {
    case Contact.Type['Unknown']:
    case Contact.Type['Official']:
      return false;
    case Contact.Type['Personal']:
  }

  const room = message.room();
  if (room) {
    // 处理群信息
    roomHandler.call(this, message);
  } else {
    // 处理私聊命令
    personHandler.call(this, message);
  }
};
