import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import chalk from 'chalk';
import execa from 'execa';

const writeFrontend = async () => {
  // create a frontend folder
  const loader = ora('Writing frontend');

  loader.start();

  const frontendPath = `${process.cwd()}/frontend`;
  try {
    await fs.mkdir(frontendPath);
    loader.succeed();
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
  }
};

export default writeFrontend;
