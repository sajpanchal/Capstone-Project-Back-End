const expressInstance = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = require("./app");
const db = require("./database/models/index");

// force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync with { force: true }");
// });

const PORT = process.env.PORT;

const server = new expressInstance();
// use cors to allow React Frontend to connect to this server over locahost:8000
server.use(cors({ credentials: true }));

//this will put url parameters into req.query
server.use(bodyParser.urlencoded({ extended: true }));
//this will put body data that's json format into req.body
server.use(bodyParser.json());

//save your app routes to the end
server.use("/", app);

server.listen(PORT, () => {
  console.log(`Server is running on port - ${PORT}`);
});

server.get("/", async (req, res, next) => {
  try {
    // This connects to database server to make sure config is correctly setup
    await db.sequelize.authenticate();
    res.json({
      Message:
        "You have reached codejunxion NodeJS API, start making requests to this server",
    });
  } catch (error) {
    console.error("Unable to connect to the server:", error);
    res.status(500);
    res.json({ Message: `Unable to connect to the server` });
  }
});
