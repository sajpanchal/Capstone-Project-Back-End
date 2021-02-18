const expressInstance = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = require("./app");

const server = new expressInstance();
// use cors to allow React Frontend to connect to this server over locahost:8000
server.use(cors({ credentials: true }));

//this will put url parameters into req.query
server.use(bodyParser.urlencoded({ extended: true }));
//this will put body data that's json format into req.body
server.use(bodyParser.json());

//save your app routes to the end
server.use("/", app);

const port = 8000;
server.listen(port, () => {
  console.log("Server is running on port - " + port);
});

server.get("/", (req, res, next) => {
  res.json({
    Message:
      "You have reached codejunxion NodeJS API, start making requests to this server",
  });
});
