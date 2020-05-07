/**
 * Created by xwxtwd on 2020/5/7
 */
const historyThisDay = require('./historyThisDay');
function create (bot) {
  historyThisDay(bot)
}

exports = module.exports = {
  create
};
