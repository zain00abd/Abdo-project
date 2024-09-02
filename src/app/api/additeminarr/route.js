import ItemArrModal from "DBconfig/models/ItemArrModal";
import { connectMongoDB } from "DBconfig/mongo";
import { NextResponse } from "next/server";

export async function POST(request) {
  // 1- استلام البيانات من الواجهة الأمامية
  const objFromFrontEnd = await request.json();
  console.log(objFromFrontEnd.item);

  console.log("iiiiiiiiiteeeeeeeeeeeeeemmmmmmmmmmmmm")

  // 2- الاتصال بقاعدة البيانات
  await connectMongoDB();


  const result = await ItemArrModal.updateOne(
    { _id: "66d1c9f56f10c7937d54a1b0" },
    { $push: { expen: objFromFrontEnd.item } }
  );

  // 4- إعادة النتيجة إلى الواجهة الأمامية
  return NextResponse.json(result);
}
