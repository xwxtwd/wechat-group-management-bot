
exports = module.exports = async function (room, topic, oldTopic, changer) {
  console.log(arguments)
  console.log(`${changer.name()}把群名字由${oldTopic}改为${topic}`);
};
