import pg from 'pg';
const { Client } = pg;

import dotenv from 'dotenv';
dotenv.config();

import path from "path";
import { readFile } from 'fs/promises';

const SQL_DIR = "SQL";

// Получаем строку подключения из переменной окружения
const connectionString = process.env.DATABASE_URL;

// Создаем клиента
const client = new Client({
  connectionString: connectionString,
});

// Функция для проверки и создания базы данных
async function checkAndCreateDatabase(dbName) {
  const adminClient = new Client({ connectionString });

  try {
    await adminClient.connect();

    // Проверяем существование базы данных
    const res = await adminClient.query(`
          SELECT 1 FROM pg_database WHERE datname = $1
      `, [dbName]);

    if (res.rowCount === 0) {
      console.log(`База данных "${dbName}" не существует. Создаю...`);

      const sql = (await readFile(path.join(SQL_DIR, 'create_db.sql'), 'utf8')).replaceAll('${dbName}', dbName);

      await adminClient.query(sql);
      console.log(`База данных "${dbName}" была успешно создана.`);
    } else {
      console.log(`База данных "${dbName}" уже существует.`);
    }

    // Показ информации о базе данных
    await showDatabaseInfo(dbName, adminClient);

  } catch (err) {
    console.error('Ошибка при проверке или создании базы данных:', err.stack);
  } finally {
    await adminClient.end();
  }
}

// Функция для показа информации о базе данных
async function showDatabaseInfo(dbName, adminClient) {
  try {
    const dbInfoRes = await adminClient.query(`
      SELECT
        datname AS "Name",
        pg_catalog.pg_get_userbyid(datdba) AS "Owner",
        array_to_string(datacl, ', ') AS "Access Privileges",
        pg_encoding_to_char(encoding) AS "Encoding",
        datcollate AS "Collation",
        datctype AS "Ctype",
        datallowconn AS "Allow Connections",
        datconnlimit AS "Connection Limit"
      FROM
        pg_catalog.pg_database
      WHERE
        true OR datname = $1
    `, [dbName]);

    console.table(dbInfoRes.rows);
  } catch (err) {
    console.error('Ошибка при получении информации о базе данных:', err.stack);
  }
}

await checkAndCreateDatabase('college');
