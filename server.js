const { PORT = 5000 } = process.env;
const app = require("./src/app");
const knex = require("./src/db/connection");


const listener = () => console.log(`Listening on Port ${PORT}!`);

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch(console.error);
