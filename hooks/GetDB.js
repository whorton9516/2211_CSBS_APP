import * as SQLite from 'expo-sqlite';

let database;

const getDB = () => {
  if (!database) {
    database = SQLite.openDatabase('userData.db');
  }

  return database;
};

export default getDB;