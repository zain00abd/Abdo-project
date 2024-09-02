const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
 const models = mongoose.models;

 // define the Schema (the structure of the article)
 const productSchema = new Schema({
   name: String,
   email: String,
   password: String,

 });

 // Create a model based on that schema
 const UserModal = models.userinvoice || mongoose.model("userinvoice", productSchema);

 // export the model
 module.exports = UserModal;