import UserModal from "DBconfig/models/UserModal";
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
  const user = await UserModal.findOne({
    email: objFromFrontEnd.email,
  });

  // 4- Go back to frontend
  return NextResponse.json({ user });
}
