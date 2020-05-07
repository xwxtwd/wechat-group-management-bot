/**
 * Created by xwxtwd on 2020/5/7
 */
const schedule = require('node-schedule');
const dbWatchGroup = require('../db/watchGroup');
const dbGroup = require('../db/group');
const querystring = require('querystring');
const axios = require('axios');
const config = require('../config');

async function main (bot) {
  // const roomList= await dbWatchGroup.getAllGroupIsWatch();
  // console.log(roomList);
  const date = new Date();
  const res = await axios.post('http://v.juhe.cn/todayOnhistory/queryEvent.php', querystring.stringify({
    key: config.juheAppKey,
    date: `${date.getMonth() + 1}/${date.getDate()}`,
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  if (res.data.reason === 'success') {
    const message = res.data.result
      .reverse()
      .filter((item, index) => index < 5)
      .map(item => {
        return `${item.date}: ${item.title}`;
      })
      .join('\n');
    if (!message) return;
    const roomList = await bot.Room.findAll();
    for (let i = 0; i < roomList.length; i++) {
      const room = roomList[i];
      if (await dbWatchGroup.getGroupIsWatch(room.id)) {
        room.say(`当年今日\n${message}`);
      }
    }
  }
}

function scheduleObjectLiteralSyntax (bot) {
  const cfg = {second: 10, minute: 29, hour: [8]};
  console.log(`历史上的今天,配置:${JSON.stringify(cfg)}`);
  schedule.scheduleJob(cfg, function () {
    main(bot);
  });
}

exports = module.exports = scheduleObjectLiteralSyntax;
