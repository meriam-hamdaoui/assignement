require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const userRouter = require("./routes/userRoutes");

//intializing the express server
const app = express();

//calling the express.json() which is a built-in middleware for parsing (a prog part of the compiler)
app.use(express.json({ extended: false }));

//enable the express server to respond to preflight requests
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//connect to the data base
connectDB();

//conenect the express srever to our CRUD's
app.use("/api/user", userRouter);

//listen to the server on port number
const PORT = process.env.PORT || 5005;
app.listen(PORT, (error) => {
  error
    ? console.error(`server error => ${error}`)
    : console.log(`go to localhost:${PORT}`);
});
