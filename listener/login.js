const dbGroup = require('../db/group');
exports = module.exports = async function onLogin (user) {
  const contact = this.userSelf();
  const roomList = await this.Room.findAll();
  /*
  * 记录加入的群组信息/更新群主或者管理员
  * admin第一次记录后都不变，认定为该群的超级管理员
  * */
  roomList.forEach(room => {
    const ownerId = room.payload.ownerId;
    dbGroup.insertGroupInfo({
      id: room.id,
      topic: room.payload.topic,
      ownerId,
      adminId: ownerId,
      adminIdList: room.payload.adminIdList
    });
  });
};
