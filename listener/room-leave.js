exports = module.exports = function (room, leaverList) {
  const nameList = leaverList.map(c => c.name()).join(',');
  room.say(`${nameList}已退出群聊`);
};
