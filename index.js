import chalk from 'chalk';
import { Command } from 'commander';
import inquirer from 'inquirer';
import createApp from './app/index.js';
import { authOptions, dbOptions } from './options.js';

const program = new Command();
program.version('0.0.1');

const start = async () => {
  const confirmApp = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `${chalk.blue(
        'Hi There!. Ready to build your full stack Node and react app'
      )}`,
      default: true,
    },
  ]);

  if (!confirmApp.confirm) {
    process.exit(1);
  }

  const appOptions = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'auths',
      message: `${chalk.blue(
        'What kind/s of authentication methods do you want?'
      )}`,
      choices: authOptions,
      default: authOptions[0],
    },
    {
      type: 'list',
      name: 'database',
      message: `${chalk.blue(
        'What kind/s of database your are going to use?'
      )}`,
      choices: dbOptions,
      default: dbOptions[0],
    },
  ]);

  const databaseSelected = await dbOptions.findIndex(
    (el) => el === appOptions.database
  );
  appOptions.database = databaseSelected;

  if (databaseSelected === 0) {
    const mongoDBConfig = await inquirer.prompt([
      {
        type: 'input',
        name: 'uri',
        message: `${chalk.blue(
          'Enter your mongo uri (if any, then replace <password> with your password and myFirstDatabase with your database name)'
        )}`,
        default: 'mongodb://localhost:27017/',
      },
    ]);
    appOptions.dbConfig = mongoDBConfig;
  } else if (databaseSelected === 1) {
    const sqlDBConfig = await inquirer.prompt([
      {
        type: 'input',
        name: 'host',
        message: `${chalk.blue('Enter host for sql database')}`,
        default: 'localhost',
      },
      {
        type: 'input',
        name: 'user',
        message: `${chalk.blue('Enter user for sql database')}`,
        default: 'root',
      },
      {
        type: 'input',
        name: 'name',
        message: `${chalk.blue('Enter name of sql database')}`,
      },
      {
        type: 'password',
        name: 'password',
        message: `${chalk.blue('Enter password for sequelize database')}`,
      },
    ]);
    appOptions.dbConfig = sqlDBConfig;
  }

  const initProject = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: `${chalk.blue(
        'Give your project a name? (No special characters)'
      )}`,
    },
    {
      type: 'input',
      name: 'authorName',
      message: `${chalk.blue('Author name? (No special characters)')}`,
    },
  ]);

  if (appOptions) {
    appOptions.auths = appOptions.auths.map((el) =>
      authOptions.findIndex((e) => e === el)
    );

    appOptions.projectName = initProject.projectName
      .toLowerCase()
      .replace(/[^A-Z0-9]+/gi, '');

    appOptions.authorName = initProject.authorName
      .toLowerCase()
      .replace(/[^A-Z0-9]+/gi, '');
    createApp(appOptions);
  }
};

program
  .command('start')
  .description('Start creating your application')
  .action(start);

program.parse(process.argv);
