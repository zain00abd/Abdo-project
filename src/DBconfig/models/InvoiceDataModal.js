const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const models = mongoose.models;

// define the Schema (the structure of the article)
const productSchema = new Schema({
  date:Date,
  description:Array,
  money:Array,
  dateofregistration:Array,
  user:Array,
});

// Create a model based on that schema
const InvoiceDataModal =
  models.customerinvoice || mongoose.model("customerinvoice", productSchema);

// export the model
module.exports = InvoiceDataModal;
