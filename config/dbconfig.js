const sql = require("mssql");
require("dotenv").config();

const dbconfig = {
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE,
  stream: false,
  options: {
    trustedConnection: true,
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: false,
  },
};

const createConnection = () => {
  sql.connect(dbconfig, (err) => {
    if (err) {
      console.log("Error while connecting to the database : ERROR : " + err);
    } else {
      console.log("Connected to the database");
    }
  });
};

module.exports = createConnection;
