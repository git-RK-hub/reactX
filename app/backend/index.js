import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import execa from 'execa';
import { mongoDbConfig } from './template/dbconfig.js';
import app from './template/app.js';
import env from './template/env.js';
import prettier from './template/prettier.js';
import eslint from './template/eslint.js';
import packageJSON from './template/package.json.js';

const writeBackend = async (options) => {
  // create a backend folder
  const loader = ora('Creating backend');
  //TODO: handle case if folder already exist

  loader.start();

  const backendPath = `${process.cwd()}/backend`;
  try {
    await fs.mkdir(backendPath);
    loader.succeed();
  } catch (err) {
    console.log(err);
  }

  // create controller folder
  try {
    loader.start();
    loader.text = 'creating controllers';
    await fs.mkdir(`${backendPath}/controllers`);
    loader.succeed();
  } catch (err) {
    console.log(err);
  }

  // create models folder
  try {
    loader.start();
    loader.text = 'creating models';
    await fs.mkdir(`${backendPath}/models`);
    loader.succeed();
  } catch (err) {
    console.log(err);
  }

  // create routes folder
  try {
    loader.start();
    loader.text = 'creating routes';
    await fs.mkdir(`${backendPath}/routes`);
    loader.succeed();
  } catch (err) {
    console.log(err);
  }

  // write app.js file
  const appFilePath = path.join(backendPath, 'app.js');
  try {
    await fs.writeFile(appFilePath, app());
  } catch (err) {
    console.log(err);
  }

  // write db connect file
  const dbFilePath = path.join(backendPath, 'dbconnect.js');
  try {
    loader.start();
    loader.text = 'creating database connection';
    await fs.writeFile(dbFilePath, mongoDbConfig());
    loader.succeed();
  } catch (err) {
    console.log(err);
  }

  // write env file
  const envFilePath = path.join(backendPath, '.env');
  try {
    loader.start();
    loader.text = 'writing environment variables';
    await fs.writeFile(envFilePath, env());
    loader.succeed();
  } catch (err) {
    console.log(err);
  }

  // write prettier file

  const prettierFilePath = path.join(backendPath, '.prettierrc');
  try {
    await fs.writeFile(prettierFilePath, prettier());
  } catch (err) {
    console.log(err);
  }

  //write eslint files
  const eslintFilePath = path.join(backendPath, '.eslintrc.json');
  try {
    await fs.writeFile(eslintFilePath, eslint());
  } catch (err) {
    console.log(err);
  }

  // write packagejson file and install dependencies
  const packageJsonFilePath = path.join(backendPath, 'package.json');

  try {
    await fs.writeFile(
      packageJsonFilePath,
      packageJSON(options.projectName, options.authorName)
    );
  } catch (err) {
    console.log(err);
  }

  try {
    loader.start();
    loader.text = 'Installing dependencies';
    await execa('npm', ['install', './backend']);
    loader.succeed();
  } catch (error) {
    console.log(error);
  }
};

export default writeBackend;
