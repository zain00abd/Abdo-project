const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
 const models = mongoose.models;

 // define the Schema (the structure of the article)
 const productSchema = new Schema({
   name: String,
   addres: String,
   phone: String,
   arrinvoce: Array,

 });

 // Create a model based on that schema
 const AdduserModal = models.invoce || mongoose.model("invoce", productSchema);

 // export the model
 module.exports = AdduserModal;