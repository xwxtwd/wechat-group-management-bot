/**
 * Created by J.Son on 2020/3/22
 */
const {Wechaty, Message, Contact, MediaMessage, MiniProgram, UrlLink} = require('wechaty');
const commandHandle = {
  sayHi (message) {
    const content = message.text();
    if (content === '你好') {
      message.say('你好啊');
      return true;
    }
    return false;
  },
  returnWangZheRank (message) {
    const content = message.text();
    const sender = message.from();
    if (content === '排行') {
      const miniPayload = new MiniProgram ({
        username           : 'gh_57f9f53c4fea@app',     //get from mp.weixin.qq.com
        appid              : 'wx5237c2a6ad938b2c',               //optional, get from mp.weixin.qq.com
        title              : `${sender.name()}，你这么菜就别看了`,               //optional
        description        : '太菜了吧',               //optional
        thumbUrl       : '30580201000451304f02010002046ed1141002032f5d0302042538f0b702045ebc024c042a777875706c6f61645f777869645f33646534316539627267636931323130315f313538393337393636300204010800030201000400',
        thumbKey: '55dde0291ce0e13054a11964d6c83c5f'
      })
      message.say(miniPayload);
      return true
    }
    return false
  }
};
exports = module.exports = commandHandle;
