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
  if (appOptions) {
    appOptions.auths = appOptions.auths.map((el) =>
      authOptions.findIndex((e) => e === el)
    );

    appOptions.database = dbOptions.findIndex(
      (el) => el === appOptions.database
    );

    createApp(appOptions);
  }
};

program
  .command('start')
  .description('Start creating your application')
  .action(start);

program.parse(process.argv);
