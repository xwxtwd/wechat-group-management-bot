
const { Friendship} = require('wechaty');

exports = module.exports = async function (friendship) {
  try {
    console.log(`received friend event.`);
    const contact = friendship.contact();
    switch (friendship.type()) {
      case Friendship.Type.Receive:
        console.log(`received friend event from ${contact.name()}`);
        const kindleHelloList = ['咪咕', 'kindle'];
        if (kindleHelloList.includes(friendship.hello().toLocaleLowerCase())) {
          await friendship.accept();
          const room = await this.Room.find({topic: '咪咕kindle打卡签到提醒群'})
          if (room) {
            try {
              await room.add(contact)
              room.say('欢迎进入打卡群，将会在活动开始后提醒你每天打卡状态', contact)
            } catch(e) {
              console.error(e)
            }
          }
        }
        break;

      case Friendship.Type.Confirm:
        console.log(`${contact},friend ship confirmed`);
        break;
    }
  } catch (e) {
    console.error(e);
  }
};
