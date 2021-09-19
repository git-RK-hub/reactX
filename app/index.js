import ora from 'ora';
import chalk from 'chalk';
import execa from 'execa';

const createApp = async (options) => {
  const loader = ora(
    chalk.greenBright('Go grab your coffee, meanwhile we creating your App')
  );

  loader.start(`Building react app`);
  try {
    await execa('npx', ['create-react-app', 'rishi']);
    loader.succeed();
  } catch (err) {
    console.error(err);
  }
};

export default createApp;
