import chalk from "chalk";
import { Command } from "commander";
import readline from "readline";
import { initOptions } from "./options.js";
import ora from "ora";

const program = new Command();
program.version("0.0.1");

const start = () => {
  initOptions.forEach((el, i) =>
    process.stdout.write(chalk.yellow(`${i + 1}. ${el}\n`))
  );
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(chalk.blue.bold("Enter (1 to 6) : "), (id) => {
    if (id < 1 || id > 6) {
      process.stdout.write(chalk.redBright("\nInvalid Option 💥"));
      process.exit(0);
    }
    const loader = ora(
      chalk.greenBright(
        initOptions[id - 1].replace(
          "Create",
          "Sit back and relax, Creating your"
        )
      )
    );
    loader.start();

    setTimeout(() => {
      loader.succeed();
      rl.close();
    }, 2000);
  });

  rl.on("close", function () {
    process.stdout.write(chalk.blue("\nEnjoy Coding 😄\n"));
    process.exit(0);
  });
};

program
  .command("start")
  .description("Start creating your application")
  .action(start);

program.parse(process.argv);
