import { existsSync, mkdirSync, rmSync } from 'fs';
import knex from 'knex';
import { join } from 'upath';
import chalk from 'chalk';
import '../src';

const tmp = join(__dirname, 'tmp');
if (!existsSync(tmp)) mkdirSync(tmp);
const sqlite = join(tmp, 'mydb.sqlite');
if (existsSync(sqlite)) rmSync(sqlite);

const db = knex({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: sqlite,
  },
  useNullAsDefault: true,
});

interface User {
  id: number;
  name: string;
  age: number;
}

(async () => {
  const exist = await db.schema.hasTable('users');
  if (!exist) {
    return db.schema.createTable('users', function (table) {
      table.increments();
      table.string('name');
      table.integer('age');
      table.timestamps();
    });
  }
})()
  .then(async () => {
    try {
      return await db<User>('users').insert({ id: 1, name: 'Dimas', age: 26 });
    } catch (e) {
      if (e instanceof Error) console.log(`cannot creating user with id 1 ${e}`, e.stack);
    }
  })
  .then(async () => {
    const user = await db<User>('users') // User is the type of row in database
      .where('id', 1) // Your IDE will be able to help with the completion of id
      .first(); // Resolves to User | undefined
    if (user) {
      console.log('user with id 1 found');
      return user;
    }
    console.log('empty user with id 1');
  })
  .then(async (user) => {
    if (user) {
      try {
        return await db<User>('users').where('id', 1).update({ name: 'Dimas Lanjaka' });
      } catch (e) {
        if (e instanceof Error) console.log(chalk.red(`cannot update name user ${e}`), e.stack);
      }
    }
  })
  .finally(() => {
    process.exit(1);
  });
