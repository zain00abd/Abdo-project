"use client"


import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./style.css"
import Head from "components/Head";
import Musseg from "components/Musseg";

const Page = () => {

  const { data: session, status } = useSession();
  const [idcustomerarr, setidcustomerarr] = useState(null);
  const [name, setname] = useState(null);
  const [addres, setaddres] = useState(null);
  const [phone, setphone] = useState(null);
  const [arrinvoce, setarrinvoce] = useState([]);
  const [loading, setloading] = useState(false);
  

  useEffect(() => {
      if(status == 'authenticated'){
        setidcustomerarr(session.user.name.split("lzx1")[0])
        console.log(idcustomerarr)
      }

  }, [name]);
  
  

  const setuser = async (e) =>{
    e.preventDefault()
    setloading(true)

    console.log(name + ' / ' + addres + ' / ' + phone)

    const response = await fetch("api/setuser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id:idcustomerarr,
        name,
        addres,
        phone,
        arrinvoce,
      }),
    });
 
    const dataFromBackend = await response.json();
    console.log(dataFromBackend);

    if(response.ok){
      console.log("yes")
      toast.success(" تم اضافة عميل جديد بنجاح ")
      setloading(false)
      e.target.reset()
    }

  }





  return (
<>

<Musseg />
<Head actev={"adduser"} />
  <h4> اضافة عميل جديد </h4>
  <div className="container mt-3">
    <form onSubmit={setuser} style={{ direction: "rtl" }} >
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          {" "}
          أسم العميل{" "}
        </label>
        <input
          onChange={(e)=>{
            setname(e.target.value)
          }}
          type="text"
          name="name"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          {" "}
          العنوان{" "}
        </label>
        <input
          onChange={(e)=>{
            setaddres(e.target.value)
          }}
          type="text"
          name="addres"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          {" "}
          رقم الهاتف{" "}
        </label>
        <input
          onChange={(e)=>{
            setphone(e.target.value)
          }}
          type="number"
          name="phone"
          className="form-control"
          id="exampleInputPassword1"
        />
        <input
          style={{ display: "none" }}
          type="number"
          name="invoicesprice"
          className="form-control"
          id="exampleInputPassword1"
          defaultValue={0}
        />
        <input
          style={{ display: "none" }}
          type="number"
          name="invoicespay"
          className="form-control"
          id="exampleInputPassword1"
          defaultValue={0}
        />
      </div>
      <button type="submit" className={`btn btn-primary ${!loading && name && phone ? "" : "disabled"}`}>
        حفظ
      </button>
    </form>
  </div>
</>

  );
}

export default Page;
