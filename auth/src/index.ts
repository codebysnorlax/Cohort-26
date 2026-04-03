import { createApplication } from "./app";

async function main() {
  try {
    const app = createApplication();
    const PORT: number = 8080;

    app.listen(PORT, () => {
      console.log(`http server is running on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(`error starting http server`);
    throw error;
  }
}
main();
