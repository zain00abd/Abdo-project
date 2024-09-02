const mongoose = require("mongoose");
 
export const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://zaindiv:Zain007abd@cluster0.32r5dqe.mongodb.net/all-data?retryWrites=true&w=majority");
    console.log("connected to MongoDB");
  } catch (error) {
    console.log("ERROR WITH CONNECTING  MongoDB", error);
  }
};

