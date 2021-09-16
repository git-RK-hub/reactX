const app = (loader) => {
  setTimeout(() => {
    loader.succeed();
  }, 2000);
};

export default app;
