const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
 const models = mongoose.models;

 // define the Schema (the structure of the article)
 const productSchema = new Schema({
   name: String,
   addres: String,
   phone: String,
   arrinvoce: Array,

 },{ timestamps: true });

 // Create a model based on that schema
 const InvoiceObjectModal = models.customerinvoice || mongoose.model("customerinvoice", productSchema);

 // export the model
 module.exports = InvoiceObjectModal;