import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import chalk from 'chalk';
import execa from 'execa';
import app from './template/src/App.js';
import appCss from './template/src/App.css.js';
import index from './template/src/index.js';
import indexCss from './template/src/index.css.js';
import appTests from './template/src/App.test.js';
import reportWebVitals from './template/src/reportWebVitals.js';
import packageJSON from './template/package.json.js';

const writeFrontend = async (options) => {
  // create a frontend folder
  const loader = ora('Writing frontend');

  loader.start();

  const frontendPath = `${process.cwd()}/frontend`;
  try {
    await fs.mkdir(frontendPath);
    loader.succeed();
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }

  // creating public folder
  try {
    await fs.mkdir(`${frontendPath}/public`);
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }

  // creating src folder
  try {
    await fs.mkdir(`${frontendPath}/src`);
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }

  // Writing index.js file
  const indexFilePath = path.join(`${frontendPath}/src`, 'index.js');
  try {
    await fs.writeFile(indexFilePath, index());
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }

  // Writing index.css file
  const indexCssFilePath = path.join(`${frontendPath}/src`, 'index.css');
  try {
    await fs.writeFile(indexCssFilePath, indexCss());
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }

  // Writing app.js file
  const appFilePath = path.join(`${frontendPath}/src`, 'App.js');
  try {
    await fs.writeFile(appFilePath, app());
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }

  // Writing App.css file
  const appCssFilePath = path.join(`${frontendPath}/src`, 'App.css');
  try {
    await fs.writeFile(appCssFilePath, appCss());
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }

  // Writing App.tests.js file
  const appTestsFilePath = path.join(`${frontendPath}/src`, 'App.test.js');
  try {
    await fs.writeFile(appTestsFilePath, appTests());
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }

  // Writing reportWebVitals.js file
  const reportWebVitalsFilePath = path.join(
    `${frontendPath}/src`,
    'reportWebVitals.js'
  );
  try {
    await fs.writeFile(reportWebVitalsFilePath, reportWebVitals());
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }

  // write packagejson file and install dependencies
  const packageJsonFilePath = path.join(frontendPath, 'package.json');

  try {
    await fs.writeFile(packageJsonFilePath, packageJSON(options.projectName));
  } catch (err) {
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }

  try {
    loader.start();
    loader.text = 'Installing frontend dependencies';
    await execa('npm', ['install'], {
      cwd: `./frontend`,
      stdin: 'ignore',
    });
    loader.succeed();
  } catch (err) {
    loader.succeed();
    console.log(chalk.redBright('Error 💥', err));
    process.exit(1);
  }
};

export default writeFrontend;
