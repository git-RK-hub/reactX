import fs from 'fs';
import path from 'path';
import { mongoDbConfig } from './template/dbconfig.js';
import app from './template/app.js';
import env from './template/env.js';
import prettier from './template/prettier.js';
import eslint from './template/eslint.js';
import packageJSON from './template/package.json.js';

const writeBackend = (options) => {
  // create a backend folder

  //TODO: handle case if folder already exist
  const backendPath = `${process.cwd()}/backend`;
  fs.mkdirSync(backendPath);

  // create controller folder
  fs.mkdirSync(`${backendPath}/controllers`);

  // create models folder
  fs.mkdirSync(`${backendPath}/models`);

  // create routes folder
  fs.mkdirSync(`${backendPath}/routes`);

  // write app.js file
  const appFilePath = path.join(backendPath, 'app.js');
  fs.writeFileSync(appFilePath, app());

  // write db connect file
  const dbFilePath = path.join(backendPath, 'dbconnect.js');
  fs.writeFileSync(dbFilePath, mongoDbConfig());

  // write env file
  const envFilePath = path.join(backendPath, '.env');
  fs.writeFileSync(envFilePath, env());

  // write prettier file
  const prettierFilePath = path.join(backendPath, '.prettierrc');
  fs.writeFileSync(prettierFilePath, prettier());

  //write eslint files
  const eslintFilePath = path.join(backendPath, '.eslintrc.json');
  fs.writeFileSync(eslintFilePath, eslint());

  // write packagejson file
  const packageJsonFilePath = path.join(backendPath, 'package.json');
  fs.writeFileSync(
    packageJsonFilePath,
    packageJSON(options.projectName, options.authorName)
  );
};

export default writeBackend;
