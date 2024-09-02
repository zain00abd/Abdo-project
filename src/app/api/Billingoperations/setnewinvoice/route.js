import InvoiceDataModal from "DBconfig/models/InvoiceDataModal";
import { connectMongoDB } from "DBconfig/mongo";
import { NextResponse } from "next/server";

export async function POST(request) {
  // 1- Receive data from Front-end
  const objFromFrontEnd = await request.json();
  console.log(objFromFrontEnd);

  // 2- connect to DB
  await connectMongoDB();

  // 3- Hashing password with bcrypt.js
  console.log("*****************    Update   **************************");

  // 3- Try to Store obj to DB
  await InvoiceDataModal.updateOne({_id: "170cd5a4133909785798ce52"} ,{
    date: "20/4/2024",
    description: "sendewsh",
    money: "56",
    dateofregistration:"11:11 am",
    user:"ali",

  });

  // 4- Go back to frontend
  return NextResponse.json( "user" );
}
