// @ts-nocheck

import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import "./stylecomp.css";

const Head = ({ actev }) => {
  return (
    <nav
      className="navbar sticky-top navbar-expand-lg navbar-dark"
      aria-label="Offcanvas navbar large"
      style={{backgroundColor:"#253d53b9"}}
    >
      <div className="container-fluid">
        <button
          style={{ border: "none" }}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar2"
          aria-controls="offcanvasNavbar2"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="offcanvas offcanvas-start text-bg-dark"
          tabIndex="-1"
          id="offcanvasNavbar2"
          aria-labelledby="offcanvasNavbar2Label"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbar2Label">
              Offcanvas
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            {/*  start nav  */}

            <ul className="navbar-nav justify-content-start flex-grow-1">
            <li className="nav-item text-center item-align-center d-none d-lg-flex">
                <button
                  className={`nav-link bg-danger m-auto ${
                    actev == "home" && "active"
                  }`}
                  
                  onClick={() =>{
                    signOut()
                  }}
                >
                   تسجيل الخروج  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </li>
            </ul>

            {/*  center nav  */}
            <ul className="navbar-nav justify-content-center flex-grow-1">
              <form className="d-none d-lg-flex" role="search">
                <input
                  className="form-control ms-2 me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </ul>

            {/*  end nav  */}
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item d-lg-none text-center">
                <button
                  className={`nav-link bg-danger w-50 m-auto ${
                    actev == "home" && "active"
                  }`}
                  
                  onClick={() =>{
                    signOut()
                  }}
                >
                  تسجيل الخروج <i className="fa-solid fa-right-to-bracket"></i>
                </button>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link d-none d-lg-block ${
                    actev == "adduser" && "active"
                  }`}
                  href="/adduser"
                >
                  اضافة عميل <i className="fa-solid fa-user-plus"></i>
                </Link>
              </li>

              <li className="">
                <Link
                  className={`nav-link d-none d-lg-block ${
                    actev == "home" && "active"
                  }`}
                  aria-current="page"
                  href="/"
                >
                  القائمة الرئيسية
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="accordion d-lg-none" id="accordionExample">
          <button
            className=""
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
            style={{
              background: "linear-gradient(45deg, #00bd9d, #165e00, #00bd9d)",
              outline: "none",
              border: "none",
              height: "35px",
              borderRadius: "15px",
            }}
          >
            <i
              className="fa-solid fa-magnifying-glass fa-lg gradient-icon"
              style={{ color: "#e0ecff" }}
            ></i>
          </button>
        </div>

        <Link className="d-lg-none" href="/">
          <i
            className={`fa-solid fa-house-user fa-lg gradient-icon ${
              actev == "home" && "actev-nav"
            }`}
            style={{ color: "#e0ecff" }}
          />
        </Link>

        <Link className="d-lg-none" href="/adduser">
          <i
            className={`fa-solid fa-user-plus fa-lg gradient-icon ${
              actev == "adduser" && "actev-nav"
            }`}
            style={{ color: "#e0ecff" }}
          ></i>
        </Link>
      </div>

      <form
        className="d-lg-none ms-5 "
        role="search"
        style={{ margin: "0px", padding: "0px" }}
      >
        <div
          id="collapseOne"
          className="accordion-collapse collapse "
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body d-flex" style={{ padding: "5px" }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </div>
        </div>
        {/* <input className="form-control ms-2 " type="search" placeholder="Search" aria-label="Search"/> */}
      </form>
    </nav>
  );
};

export default Head;
