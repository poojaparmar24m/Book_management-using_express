require("dotenv").config();
const express = require("express");

const app = express();

const port = process.env.PORT;
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is up and runing ",
    data: "hello",
  });
});

app.use("/users", require("./routers/user"));
app.use("/books", require("./routers/book"));

app.get((req, res) => {
  res.status(404).json({
    message: "This route Does not exits",
  });
});

app.listen(port, () => {
  console.log(`server runing at port : http://localhost:${port}/`);
});
// http://localhost:8081/
