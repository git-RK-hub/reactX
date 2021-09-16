import chalk from 'chalk';
import { Command } from 'commander';
import inquirer from 'inquirer';
import createApp from './app/index.js';
import { initOptions } from './options.js';

const program = new Command();
program.version('0.0.1');

const start = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'devApp',
        message: `${chalk.blue('Hi! There. What you want to build today')}`,
        choices: initOptions,
        default: initOptions[0],
      },
    ])
    .then((answers) => {
      const idx = initOptions.findIndex((el) => el === answers.devApp);
      createApp(idx + 1);
    });
};

program
  .command('start')
  .description('Start creating your application')
  .action(start);

program.parse(process.argv);
