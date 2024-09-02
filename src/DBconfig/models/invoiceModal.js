const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const models = mongoose.models;

// define the Schema (the structure of the article)
const productSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  customer: [Object],
}, { timestamps: true });

// Create a model based on that schema
const InvoiceModal =
  models.customerinvoice || mongoose.model("customerinvoice", productSchema);

// export the model
module.exports = InvoiceModal;
