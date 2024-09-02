import InvoiceModal from "DBconfig/models/invoiceModal";
import { connectMongoDB } from "DBconfig/mongo";
import mongoose from "mongoose";
import { NextResponse } from "next/server";




export async function PUT(request) {
  // 1- Receive data from Front-end
  const objFromFrontEnd = await request.json();
  const { id, ...restOfObj } = objFromFrontEnd;
  restOfObj._id = new mongoose.Types.ObjectId();
  console.log(objFromFrontEnd);

  // 2- connect to DB
  await connectMongoDB();

  // 3- Hashing password with bcrypt.js
  console.log("*****************    salt   **************************");


  // 4- Try to Store obj to DB
  try {
    const result = await InvoiceModal.updateOne(
      { _id: objFromFrontEnd.id },
      { $push: { customer: restOfObj } }
    );
    console.log(result);
  } catch (error) {
    console.error("Error updating document:", error);
  }

  // 5- Go back to frontend
  return NextResponse.json("zainaddyes");
}



