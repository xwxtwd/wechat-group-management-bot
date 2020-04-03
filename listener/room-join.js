exports = module.exports = async function (room, inviteeList, inviter) {
  const nameList = inviteeList.map(c => c.name()).join(',');
  const topic = await room.topic();
  const msg = `${inviter.name()}邀请了${nameList}, 进入${topic}`;
  console.log(msg);
};
