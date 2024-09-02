"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Formsignin = () => {
  const router = useRouter();
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const { data: session, status } = useSession();

  // useEffect(() => {
  //     if(status == "authenticated"){
  //       signOut()
  //     }

  // }, []);
  

  const handelsubmit = async (e) => {
    e.preventDefault();
    console.log(email + ' / ' + password);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(res);

    if (res.error) {
      return;
    }
    router.replace("/");

  };

  return (
    <form
      onSubmit={(e) => {
        handelsubmit(e);
      }}
    >
      <div className="form-group">
        <div className="bar" />
      </div>
      <div className="form-group">
        <input
          type="email"
          id="email"
          placeholder=" البريد الالكتروني "
          onKeyUp={(e) => {
            // @ts-ignore
            setemail(e.target.value);
          }}
        />
        <div className="bar" />
      </div>
      <div className="form-group">
        <input
          onKeyUp={(e) => {
            // @ts-ignore
            setpassword(e.target.value);
          }}
          type="password"
          id="password"
          placeholder="كلمة المرور"
        />
        <div className="bar" />
      </div>
      <div className="suggestion">
        <p>
          {" "}
          اذا لم يكن لديك حساب <Link href={"/register"}> انشاء حساب </Link>
        </p>
      </div>

      <button type="submit" > تسجيل الدخول </button>
      <br />
      <p>{status}</p>

          <button className="btn btn-danger" onClick={() =>{
            signOut()
          }}>sign out</button>

    </form>
  );
};

export default Formsignin;
