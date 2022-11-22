const mongoose = require("mongoose");

module.exports = connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log("process.env", process.env.MONGO_URI);
    console.log("you are connected to your DB now");
  } catch (error) {
    console.error(`OUPS!! DB failed to connect => ${error}`);
  }
};
