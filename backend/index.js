const express = require("express");
const cors = require("cors");
const { mongooseConnect } = require("./app/config/mongodb-config");
const { handleErrors } = require("./app/handler/errorHandler");
const users = require("./app/modules/users/userRoute");
const jobs = require("./app/modules/jobs/jobRoute");
const auth = require("./app/middleware/auth")

const app = express();

//enable mongodb
mongooseConnect().then(async () => {
  app.set("secretKey", process.env.SECRETKEY);
  // enable cors
  app.use(cors({
    origin: "*"
  }))
  // parse requests of content-type - application/json
  app.use(express.json());
  // simple route
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to dans test service." });
  });

  // public route
  app.use("/users", users);

  // private route
  app.use("/jobs", auth, jobs);

  // handle errors
  app.use(handleErrors)

  // set port, listen for requests
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. ${new Date()}`);
  });
});
