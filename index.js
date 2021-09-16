import chalk from "chalk";
import { Command } from "commander";
import { initOptions } from "./options.js";
import inquirer from "inquirer";
import ora from "ora";

const program = new Command();
program.version("0.0.1");

const start = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "devApp",
        message: `${chalk.blue("Hi! There. What you want to build today")}`,
        choices: initOptions,
        default: initOptions[0],
      },
    ])
    .then((answers) => {
      const idx = initOptions.findIndex((el) => el === answers.devApp);
      const loader = ora(
        chalk.greenBright(
          initOptions[idx].replace(
            "Create",
            "Sit back and relax, Creating your"
          )
        )
      );
      loader.start();

      setTimeout(() => {
        loader.succeed();
      }, 2000);
    });
};

program
  .command("start")
  .description("Start creating your application")
  .action(start);

program.parse(process.argv);
