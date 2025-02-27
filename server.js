const http = require("http");
const app = require("./src/apps/app");
const dotenv = require("dotenv");
const configDB = require("./src/config/configDB");
const cloudinary = require("cloudinary");
dotenv.config("./");

// server starting port
const port = process.env.PORT || "5000";

app.set("port", port);

// server createing
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, () => {
  configDB();
  console.log(`server runing on port http://localhost:${port}`);
});
