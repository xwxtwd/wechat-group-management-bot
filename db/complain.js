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

async function insertMember ({id, groupId, isAdvertising = false, isFlaunt = false, isDefault = true, informerId, informerName}) {
  const db = await getDataBase();
  const tableName = 'complain';
  await db.run('CREATE TABLE IF NOT EXISTS ' + tableName + ' (' +
    'id TEXT NOT NULL,' +
    'groupId TEXT NOT NULL ,' +
    'time TEXT ,' +
    'informerId TEXT NOT NULL ,' +
    'informerName TEXT NOT NULL,' +
    'isAdvertising BLOB ,' +
    'isDefault BLOB ,' +
    'isFlaunt BLOB' +
    ') ');
  const insert = await db.prepare('INSERT INTO ' +
    tableName + '(id,groupId,time,isAdvertising,isDefault,isFlaunt,informerId,informerName) VALUES (?,?,?,?,?,?,?,?)');
  const time = (Date.now()).toString();
  console.log(id, groupId, time, isAdvertising, isDefault, isFlaunt, informerId, informerName);
  await insert.run(id, groupId, time, isAdvertising, isDefault, isFlaunt, informerId, informerName);
  await insert.finalize();
}

async function getMemberInGroup24Hour ({id, groupId}) {
  const db = await getDataBase();
  const tableName = 'complain';
  const time = (Date.now() - 24 * 3600 * 1000).toString();
  // const rows= await db.all('SELECT * FROM ' + tableName + 'WHERE \'time\' > \'' + time + '\'');
  const rows = await db.all(`
    SELECT * FROM ${tableName}
    WHERE time > ${time} AND
    id = '${id}' AND
    groupId = '${groupId}'
 `);
  return rows;
}

async function getMemberNumInfo (id) {
  const db = await getDataBase();
  const tableName = 'complain';
  const data = await Promise.all([
    db.get(`
        SELECT COUNT(isAdvertising) as advertisingNum FROM ${tableName}
        WHERE id = '${id}' AND isAdvertising = true
     `),
    db.get(`
        SELECT COUNT(isFlaunt) as flauntNum FROM ${tableName}
        WHERE id = '${id}' AND isFlaunt = true
     `),
    db.get(`
        SELECT COUNT(isDefault) as defaultNum FROM ${tableName}
        WHERE id = '${id}' AND isDefault = true
     `)
  ]);

  return {
    advertisingNum: data[0].advertisingNum,
    flauntNum: data[1].flauntNum,
    defaultNum: data[2].defaultNum,
  };
}

exports = module.exports = {
  insertMember,
  getMemberInGroup24Hour,
  getMemberNumInfo
};
// getMemberNumInfo(11);

// insertMember({
//   informerId: 'wxid_p62agnlih7ft12',
//   informerName: '迪迪',
//   id: 'wxid_pcoklzisnlqs12',
//   groupId: '21600973927@chatroom',
//   isAdvertising: true,
//   isDefault: false,
//   isFlaunt: true,
// });
// getMemberInGroup24Hour({
//   id: '11',
//   groupId: 1,
// });
