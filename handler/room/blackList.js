/**
 * Created by J.Son on 2020/3/31
 */
const dbComplain = require('../../db/complain');
async function blackListHandler (message) {
  const sender = message.from();
  const room = message.room();
  const owner = room.owner();
  const content = message.text();
  const mentionedList = await message.mentionList();
  const isAdvertising = content.indexOf('广告') !== -1;
  const isFlaunt = content.indexOf('炫耀') !== -1;
  for (let i = 0; i < mentionedList.length; i++) {
    const member = mentionedList[i];
    await dbComplain.insertMember({
      id: member.id,
      groupId: room.id,
      isAdvertising,
      isDefault: !isAdvertising && !isFlaunt,
      isFlaunt,
      informerId: sender.id,
      informerName: sender.name()
    });

    const mebmerBeReportedList = await dbComplain.getMemberInGroup24Hour({
      id: member.id,
      groupId: room.id,
    });
    const informerNameList = mebmerBeReportedList.map(item => item.informerName);
    if (mebmerBeReportedList.length >= 3) {
      const {advertisingNum, flauntNum, defaultNum} = await dbComplain.getMemberNumInfo(member.id);
      const numInfo = `数据库中累计被举报, 因：\n
【广告】：${advertisingNum}次\n
【炫耀】：${flauntNum}次\n
【其他】：${defaultNum}次\n
          `;
      if (!owner.self()) {
        room.say(`\n${24}小时内 ${informerNameList.join(', ')} 一致请求 ，
把 ${member.name()} 踢出群聊 \n
${numInfo}
            `, owner);
      } else {
        room.say(`${24}小时内 ${informerNameList.join(', ')} 一致同意，
把 ${member.name()} 踢出群聊\n
${numInfo}
            `);
        await room.del(member);
      }
      return false;
    } else {
      room.say(`${mentionedList.map(m => m.name()).join(',')}, 被 ${informerNameList.join(',')} 举报成功, ${24}小时内被${3}人举报将被踢出群`);
    }
  }
  return false;
}
exports = module.exports = blackListHandler
