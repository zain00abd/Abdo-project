import AdduserModal from "DBconfig/models/adduser";
import { connectMongoDB } from "DBconfig/mongo";
import { NextResponse } from "next/server";




export async function PUT(request) {
  // 1- Receive data from Front-end
  const objFromFrontEnd = await request.json();
  console.log(objFromFrontEnd);

  // 2- connect to DB
  await connectMongoDB();

  // 3- Hashing password with bcrypt.js
  console.log("*****************    Update   **************************");


  // 4- Try to Store obj to DB
  await AdduserModal.updateOne({_id: objFromFrontEnd.iduser} ,{
    name: objFromFrontEnd.name,
    addres: objFromFrontEnd.addres,
    phone: objFromFrontEnd.phone,
    arrinvoce:objFromFrontEnd.arrinvoice,

  });

  // 5- Go back to frontend
  return NextResponse.json("zainaddyes");
}


