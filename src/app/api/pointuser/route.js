import UserModal from "DBconfig/models/UserModal";
import InvoiceModal from "DBconfig/models/invoiceModal";
import { connectMongoDB } from "DBconfig/mongo";
import { NextResponse } from "next/server";
import crypto from "crypto"

import bcrypt from "bcrypt"


export async function POST(request) {
  // 1- Receive data from Front-end
  const objFromFrontEnd = await request.json();
  console.log(objFromFrontEnd);

  // 2- connect to DB
  await connectMongoDB();

  // 3- Hashing password with bcrypt.js
  console.log("*****************    salt   **************************");

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(objFromFrontEnd.password, salt);

  const hash = crypto.createHash('sha256').update(objFromFrontEnd.email).digest('hex');
  // قم بأخذ أول 24 حرفًا من الناتج
  const hexId = hash.slice(0, 24);

  // 4- Try to Store obj to DB
  await UserModal.create({
    name: hexId + 'lzx1' + objFromFrontEnd.name,
    email: objFromFrontEnd.email,
    password: hashedPassword,
    
  });

  await InvoiceModal.create({
    _id: hexId,
    customer:[],
  });

  // 5- Go back to frontend
  return NextResponse.json("zainaddyes");
}



