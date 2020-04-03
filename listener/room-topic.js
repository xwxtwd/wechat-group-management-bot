const {log} = require('wechaty');
exports = module.exports = async function (room, topic, oldTopic, changer) {
  const owner = await room.owner();
  if (owner.id !== changer.id) {
    console.log('非群主操作');
    console.log(`${changer.name()}把群名字由${oldTopic}改为${topic}`);
  }
  console.log(room);
  await room.refresh();
  console.log(room);
};
