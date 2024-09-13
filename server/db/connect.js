const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
const connect = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to mongodb");
  } catch (err) {
    console.error("MongoDb connection error:", err);
    process.exit(1);
  }
};
module.exports = connect;
