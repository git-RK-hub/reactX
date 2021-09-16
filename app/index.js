import ora from 'ora';
import chalk from 'chalk';
import appType1 from './type1/index.js';
import appType2 from './type2/index.js';
import appType3 from './type3/index.js';
import appType4 from './type4/index.js';
import appType5 from './type5/index.js';
import appType6 from './type6/index.js';
import { initOptions } from '../options.js';

const createApp = (id) => {
  const loader = ora(
    chalk.greenBright(
      initOptions[0].replace('Create', 'Sit back and relax, Creating your')
    )
  );
  loader.start();
  switch (id) {
    case 1:
      appType1(loader);
      break;
    case 2:
      appType2(loader);
      break;
    case 3:
      appType3(loader);
      break;
    case 4:
      appType4(loader);
      break;
    case 5:
      appType5(loader);
      break;
    case 6:
      appType6(loader);
      break;
    default:
      console.log('something went wrong');
      break;
  }
};

export default createApp;
