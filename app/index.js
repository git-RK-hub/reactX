import ora from 'ora';
import chalk from 'chalk';
import writeBackend from './backend/index.js';
import writeAuths from './auths/index.js';
import writeFrontend from './frontend/index.js';

const createApp = async (options) => {
  // const loader = ora(
  //   chalk.greenBright('Go grab your coffee, meanwhile we creating your App')
  // );
  // loader.start();
  // 1. Write backend
  writeBackend(options);
  // // 2. Write auths
  writeAuths(options);
  // // 3. Write React app
  writeFrontend(options);

  // setTimeout(() => {
  // loader.text = 'Enjoy Coding 🤎';
  // loader.succeed();
  // }, 6000);
};

export default createApp;
