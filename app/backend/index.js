import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import chalk from 'chalk';
import execa from 'execa';
import { mongoDbConfig, sqlDbConfig } from './template/dbconfig.js';
import app from './template/app.js';
import { sqlEnv, env, mongoEnv } from './template/env.js';
import prettier from './template/prettier.js';
import eslint from './template/eslint.js';
import packageJSON from './template/package.json.js';

const writeBackend = async (options) => {
  // create a backend folder
  const loader = ora('Creating backend');

  loader.start();

  const backendPath = `${process.cwd()}/backend`;
  try {
    await fs.mkdir(backendPath);
    loader.succeed();
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }

  // create controller folder
  try {
    loader.start();
    loader.text = 'Writing controllers';
    await fs.mkdir(`${backendPath}/controllers`);
    loader.succeed();
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }

  // create models folder
  try {
    loader.start();
    loader.text = 'Writing models';
    await fs.mkdir(`${backendPath}/models`);
    loader.succeed();
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }

  // create routes folder
  try {
    loader.start();
    loader.text = 'Writing routes';
    await fs.mkdir(`${backendPath}/routes`);
    loader.succeed();
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }

  // write app.js file
  const appFilePath = path.join(backendPath, 'app.js');
  try {
    await fs.writeFile(appFilePath, app());
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }

  // write db connect file
  const dbFilePath = path.join(backendPath, 'dbconnect.js');
  try {
    loader.start();
    loader.text = 'Creating database connection';
    if (options.database === 0) {
      await fs.writeFile(dbFilePath, mongoDbConfig());
    } else if (options.database === 1) {
      await fs.writeFile(dbFilePath, sqlDbConfig());
    } else {
      await fs.writeFile(dbFilePath, '');
    }
    loader.succeed();
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }

  // write env file
  const envFilePath = path.join(backendPath, '.env');
  try {
    loader.start();
    loader.text = 'Writing environment variables';
    if (options.database === 0) {
      await fs.writeFile(envFilePath, mongoEnv(options.dbConfig.uri));
    } else if (options.database === 1) {
      await fs.writeFile(envFilePath, sqlEnv(options.dbConfig));
    } else {
      await fs.writeFile(envFilePath, env());
    }
    loader.succeed();
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }

  // write prettier file

  const prettierFilePath = path.join(backendPath, '.prettierrc');
  try {
    await fs.writeFile(prettierFilePath, prettier());
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }

  //write eslint files
  const eslintFilePath = path.join(backendPath, '.eslintrc.json');
  try {
    await fs.writeFile(eslintFilePath, eslint());
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }

  // write packagejson file and install dependencies
  const packageJsonFilePath = path.join(backendPath, 'package.json');

  try {
    await fs.writeFile(
      packageJsonFilePath,
      packageJSON(options.projectName, options.authorName)
    );
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }

  try {
    loader.start();
    loader.text = 'Installing backend dependencies';
    await execa('npm', ['install'], {
      cwd: `./backend`,
      stdin: 'ignore',
    });
    loader.succeed();
  } catch (err) {
    loader.succeed();
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }
};

export default writeBackend;
