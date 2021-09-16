const app = (loader) => {
  try {
    setTimeout(() => {
      loader.color = 'red';
      loader.text = 'Creating controllers';
    }, 2000);

    setTimeout(() => {
      loader.color = 'yellow';
      loader.text = 'Installing dependecies';
    }, 3000);

    setTimeout(() => {
      loader.text = 'Done';
      loader.succeed();
    }, 4000);
  } catch (err) {
    console.log(err);
  }
};

export default app;
