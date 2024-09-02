"use client";
import Link from "next/link";
import Head from "./Head";
import "./stylecomp.css"

import { useState } from "react";

const Header = ({ onValueChange }) => {
  const [state, setstate] = useState(null);

  const seachtype = (e) => {
    onValueChange(e);
  };

  return (
    <>
      
      {/* <nav
        className="navbar sticky-top navbar-expand-lg "
        style={{ fontWeight: 600, backgroundColor: "#f0f3ffea" }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            style={{ border: "none" }}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <Link className="d-lg-none" href="/">
            <i
              className="fa-solid fa-house-user fa-2xl"
              style={{ color: "#005186" }}
            />
          </Link>

          <Link
            href="/adduser"
            className=" text-white d-lg-none"
            style={{
              background: "linear-gradient(to right, #008efa,#8400ff)",
              textDecoration: "none",
              padding: 5,
              borderRadius: 10,
              transform: "scale(1.1)",
            }}
          >
            <i
              className="fa-solid fa-plus fa-fade fa-lg"
              style={{ color: "#ffffff" }}
            />
            اضافة
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item d-none d-lg-block">
                <Link className="nav-link active" aria-current="page" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Disabled
                </a>
              </li>
              <form
                action="/search"
                method="post"
                className="d-flex m-auto"
                role="search"
              >
                <input
                  className="form-control me-2"
                  name="textsearch"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  defaultValue=""
                  onKeyUp={(e) => {
                    // @ts-ignore
                    seachtype(e.target.value);
                  }}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </ul>
          </div>
          <a
            href="/adduser"
            className=" text-white d-none d-lg-block"
            style={{
              background: "linear-gradient(to right, #008efa,#8400ff)",
              textDecoration: "none",
              padding: 5,
              borderRadius: 10,
              transform: "scale(1.1)",
            }}
          >
            <i
              className="fa-solid fa-plus fa-fade fa-lg"
              style={{ color: "#ffffff" }}
            />
            اضافة
          </a>
        </div>
      </nav> */}
    </>
  );
};

export default Header;
