/**
 * Created by J.Son on 2020/3/24
 */
const sqlite = require('sqlite');
const path = require('path');
let db = null;

async function getDataBase () {
  if (db) return db;
  db = await sqlite.open(path.resolve(__dirname, './sqlite.db'), {cached: true, verbose: true});
  return db;
}

async function insertCommand ({id, topic, ownerId, adminId, adminIdList}) {
  const db = await getDataBase();
  const tableName = 'groupInfo';
  await db.run('CREATE TABLE IF NOT EXISTS ' + tableName + ' (' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    'keywork TEXT ,' +
    'adminId TEXT ,' +
    'ownerId TEXT ,' +
    'adminIdList TEXT' +
    ') ');
  const insert = await db.prepare('INSERT OR IGNORE INTO ' +
    tableName + '(id,topic,adminId,ownerId, adminIdList) VALUES (?,?,?,?,?) ' +
    'ON CONFLICT(id) DO UPDATE SET topic=\'' + topic +
    '\',ownerId=\'' + ownerId +
    '\',adminIdList=\'' + adminIdList +
    '\'');
  await insert.run(id, topic, adminId, ownerId,adminIdList);
  await insert.finalize();
}

exports = module.exports = {
  insertGroupInfo
};
