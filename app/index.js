import ora from 'ora';
import chalk from 'chalk';
import writeBackend from './backend/index.js';
import writeAuths from './auths/index.js';
import writeFrontend from './frontend/index.js';

const createApp = async (options) => {
  const loader = ora(
    chalk.greenBright('Go grab your coffee, meanwhile we creating your App')
  );
  loader.start();

  setTimeout(async () => {
    loader.succeed();
    // 1. Write backend
    await writeBackend(options);
    // 2. Write auths
    await writeAuths(options);
    // 3. Write React app
    await writeFrontend(options);

    loader.start();
    loader.text = 'Enjoy Coding 🤎';
    loader.succeed();
  }, 2000);
};

export default createApp;
