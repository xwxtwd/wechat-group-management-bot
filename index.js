/**
 * Created by J.Son on 2020/3/19
 */
const {
  Wechaty,
  log
} = require('wechaty');
const PuppetPadplus = require('wechaty-puppet-padplus').default;
const config = require('./config');

const token = config.wechatyToken;

const puppet = new PuppetPadplus({
  token,
});

const name = 'wechat-group-management-bot';

const bot = new Wechaty({
  puppet,
  name, // generate xxxx.memory-card.json and save login data for the next login
});
// Bind events
const EVENT_LIST = ['scan', 'logout', 'login', 'error', 'heartbeat', 'friendship', 'message', 'room-join', 'room-topic', 'room-leave', 'room-invite'];
EVENT_LIST.forEach(event => {
  bot.on(event, `./listener/${event}`);
});

bot.start()
  .then(() => log.info('StarterBot', 'Starter Bot Started.'))
  .catch(e => log.error('StarterBotCatchError', e));

