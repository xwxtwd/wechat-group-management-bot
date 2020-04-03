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

async function insertGroupInfo ({id, topic, ownerId, adminId, adminIdList}) {
  const db = await getDataBase();
  const tableName = 'groupInfo';
  await db.run('CREATE TABLE IF NOT EXISTS ' + tableName + ' (' +
    'id TEXT PRIMARY KEY NOT NULL,' +
    'topic TEXT ,' +
    'adminId TEXT ,' +
    'ownerId TEXT ,' +
    'adminIdList TEXT' +
    ') ');
  const _adminIdList = adminIdList.join(',')
  const insert = await db.prepare('INSERT OR IGNORE INTO ' +
    tableName + '(id,topic,adminId,ownerId, adminIdList) VALUES (?,?,?,?,?) ' +
    'ON CONFLICT(id) DO UPDATE SET topic=\'' + topic +
    '\',ownerId=\'' + ownerId +
    '\',adminIdList=\'' + _adminIdList +
    '\'');
  await insert.run(id, topic, adminId, ownerId, _adminIdList);
  await insert.finalize();
}

async function getGroupInfo (id) {
  const db = await getDataBase();
  const tableName = 'groupInfo';
  const row = await db.get('SELECT * FROM ' + tableName);
  return {
    ...row,
    adminIdList: row.adminIdList.split(',')
  }
}

async function getGroupInfoByAdminId (adminId) {
  const db = await getDataBase();
  const tableName = 'groupInfo';
  // SELECT *,rowid "NAVICAT_ROWID" FROM "main"."groupInfo" WHERE "adminId" = 'xwxtwd' OR "adminIdList" LIKE '%xwxtwd%' LIMIT 0,1000
  const rows = await db.all(`SELECT * FROM ${tableName}
  WHERE "adminId" = '${adminId}' OR "adminIdList" LIKE '%${adminId}%'
  `);
  return rows
}


exports = module.exports = {
  insertGroupInfo,
  getGroupInfo,
  getGroupInfoByAdminId
};

