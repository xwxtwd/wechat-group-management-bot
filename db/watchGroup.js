/**
 * Created by J.Son on 2020/3/31
 */
const sqlite = require('sqlite');
const path = require('path');
let db = null;

async function getDataBase () {
  if (db) return db;
  db = await sqlite.open(path.resolve(__dirname, './sqlite.db'), {cached: true, verbose: true});
  return db;
}

async function insertGroup ({id, needWatch = true, creatorId}) {
  const db = await getDataBase();
  const tableName = 'watchGroup';
  await db.run('CREATE TABLE IF NOT EXISTS ' + tableName + ' (' +
    'id TEXT PRIMARY KEY NOT NULL,' +
    'needWatch TEXT ,' +
    'time TEXT ,' +
    'creatorId TEXT' +
    ') ');
  const insert = await db.prepare('REPLACE INTO ' +
    tableName + '(id,needWatch,time,creatorId) VALUES (?,?,?,?)');
  const time = Date.now().toString();
  await insert.run(id, needWatch, time, creatorId);
  await insert.finalize();
}

async function dropGroup ({id, creatorId}) {
  const db = await getDataBase();
  const tableName = 'watchGroup';
  const time = Date.now().toString();
  const update = await db.prepare(`UPDATE ${tableName} SET
    needWatch = ${false},
    time = '${time}',
    creatorId = '${creatorId}' WHERE id = '${id}'
  `);
  await update.run();
  await update.finalize();
}

async function getGroupIsWatch (id) {
  const db = await getDataBase();
  const tableName = 'watchGroup';
  const row = await db.get(`SELECT * FROM ${tableName} WHERE id = '${id}' AND needWatch = true`);
  return !!row
}

exports = module.exports = {
  insertGroup,
  dropGroup,
  getGroupIsWatch
};

