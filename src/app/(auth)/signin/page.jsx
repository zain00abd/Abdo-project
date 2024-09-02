import Link from "next/link";
import Formsignin from "./formsignin";

export const metadata = {
  title: "Signin page",
  description: "description for Signin page",
};

const Page = () => {

  


  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <h1> تسجيل الدخول </h1>

          <Formsignin />
        </div>
      </div>
    </>
  );
};

export default Page;
