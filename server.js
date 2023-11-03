const express = require("express");
const createConnection = require("./config/dbconfig");

const app = express();
const PORT = 5000;

createConnection();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/api/employee", require("./routes/employee.route"));

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
