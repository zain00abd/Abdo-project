// @ts-nocheck
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { notFound, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import moment from "moment";
import Head from "components/Head";
import Footer from "components/Footer";

const Page = () => {
  const { data: session, status } = useSession();
  const [arrinv, setarrinv] = useState(0);
  const [dataa, setdata] = useState([]);
  const [dataSearch, setdataSearch] = useState([]);
  const [nameuser, setnameuser] = useState(null);
  const [items, setiteams] = useState([]);
  const [tatalarr, settatalarr] = useState(null);
  const [date, setdate] = useState(null);
  const [plusmoney, setplusmoney] = useState(null);
  


  const [arrdis, setarrdis] = useState([]);
  const [arrmon, setarrmon] = useState([]);
  const [oclock, setoclock] = useState(null);
  const [today, settoday] = useState(null);

  const [allexpen, setallexpen] = useState(null);
  const [lastexpen, setlastexpen] = useState([]);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]'
    );
    // @ts-ignore
    const popoverList = [...popoverTriggerList].map(
      (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
    );
  }, []);

  useEffect(() => {
    if (status == "authenticated") {
      setnameuser(session.user.name);
      console.log(nameuser);
    }
  }, [status]);

  // useEffect(() => {

  //   const getData = async () => {
  //     const res = await fetch("https://nextback-seven.vercel.app/invoice");
  //     if (!res.ok) {
  //       notFound();
  //     }
  //     const result = await res.json();

  //     const updatedResult = result.map(user => {
  //       let totalarruser = 0;

  //       if (user.arrinvoce && user.arrinvoce.length > 0) {
  //         const getmony = JSON.parse(user.arrinvoce);
  //         console.log("************user************");
  //         let arrtoo = [];
  //         getmony.forEach((arrmoney) => {
  //           const totalonearr = arrmoney.money.reduce((acc, num) => acc + num, 0);
  //           totalarruser += totalonearr;
  //           arrtoo.push(totalarruser);
  //         });
  //         console.log(arrtoo);
  //       }

  //       totalarruser = Math.abs(totalarruser);
  //       user.total = totalarruser;
  //       if (totalarruser === 0) {
  //         user.total = 0;
  //       }
  //       return user;
  //     });

  //     setdata(updatedResult);
  //     setdataSearch(updatedResult)
  //   };
  //   getData();

  // }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`https://nextback-seven.vercel.app/abdodata`);
      if (!res.ok) {
        // notFound();
      }
      const result = await res.json();
      let expensesarr = JSON.parse(result[0].expen[result[0].expen.length - 1]);
      setdate(expensesarr.date);
      setlastexpen(expensesarr.expenses);

      let customerarr = expensesarr.expenses;
      console.log(customerarr);

      const datacustomer = customerarr.map((user, index) => {
        console.log(user);
        let totalinvoicecustomer = 0;

        // console.log(user.arrinvoce)
        if (user.money && user.money.length > 0) {
          const getmony = customerarr;
          console.log(getmony);

          let arrtoo = [];
          getmony.forEach((arrmoney) => {
            console.log(arrmoney);
            const totalonearr = arrmoney.money.reduce(
              (acc, num) => acc + num,
              0
            );
            totalinvoicecustomer += totalonearr;
            settatalarr(totalinvoicecustomer);
            console.log(totalinvoicecustomer);
            arrtoo.push(totalinvoicecustomer);
          });
          console.log(arrtoo);
        }

        totalinvoicecustomer = Math.abs(totalinvoicecustomer);
        user.total = totalinvoicecustomer;
        if (totalinvoicecustomer === 0) {
          user.total = 0;
        }
        // console.log(user.name)
        return user;
      });

      console.log(datacustomer);

      // setdata(datacustomer);
      // setdataSearch(datacustomer);

      addItem();
    };

    if (nameuser) {
      console.log("hoooommeeee");
    }
    getData();

  }, [today]);

  const searchuser = (value) => {
    console.log(value);
    const filteredData = dataSearch.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    console.log(filteredData);
    setdata(filteredData);
  };

  const addItem = () => {
    console.log("zain");

    const newItem = {
      id: 1 + items.length,
    };

    setiteams([...items, newItem]);
    console.log(items);
  };

  let arrdes = [];
  let arrmoney = [];
  useEffect(() => {
    settoday(moment().format(`D/${moment().get("month") + 1}/YYYY`));
    // console.log(moment().format(`D/${moment().get('month')+1}/YYYY`))
    sessionStorage.removeItem("arr1");
    sessionStorage.removeItem("arr2");
    arrdes = [];
    arrmoney = [];
  }, []);

  const addarritem = (value, id, inp) => {
    const arrmode = id.split("_")[0];
    const arrindex = id.split("_")[1];

    if (
      sessionStorage.getItem("arr1") !== null ||
      sessionStorage.getItem("arr2") !== null
    ) {
      arrmoney = JSON.parse(sessionStorage.getItem("arr1"));
      arrdes = JSON.parse(sessionStorage.getItem("arr2"));
    }

    if (arrmode === "mon") {
      if (isNaN(value)) {
        console.log(isNaN(value));
        const matches = value.match(/(\d+)[^\d]*$/);
        console.log(matches);

        if (matches) {
          value = matches[1];
        } else if (matches == null) {
          value = "";
        }

        inp.value = value;
      }
    }

    if (arrmode === "dis") {
      arrdes[arrindex] = value;
      // console.log(arrdes)
    } else {
      arrmoney[arrindex] = +value;
    }

    sessionStorage.setItem("arr1", JSON.stringify(arrmoney));
    sessionStorage.setItem("arr2", JSON.stringify(arrdes));

    filterarr();
  };

  const filterarr = () => {
    settoday(moment().format(`D/${moment().get("month") + 1}/YYYY`));
    console.log(today);
    setoclock(moment().format("LT"));
    console.log(oclock);

    let arrdesfilter = arrdes.filter(function (value) {
      return value !== null && value !== undefined && value !== "";
    });

    let arrmoneyfilter = arrmoney.filter(function (value) {
      return (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        value !== 0 &&
        !isNaN(value)
      );
    });

    // console.log("Filtered arrdes:", arrdesfilter);
    // console.log("Filtered arrmoney:", arrmoneyfilter);

    setarrdis(arrdesfilter);
    setarrmon(arrmoneyfilter);

    setplusmoney(
      arrmoneyfilter.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );
  };

  const cheackoldarr = () => {};

  const expobject = () => {
    let expenarr = [
      {
        discraption: arrdis,
        money: arrmon,
        user: nameuser,
        time: oclock,
      },
    ];

    let newobj = {};

    if (today === date) {
      let oldexpenarr = lastexpen;
      oldexpenarr.push(...expenarr);
      newobj = {
        date: today,
        expenses: oldexpenarr,
      };
    } else {
      newobj = {
        date: today,
        expenses: [
          {
            discraption: arrdis,
            money: arrmon,
            user: nameuser,
            time: oclock,
          },
        ],
      };
    }

    return JSON.stringify(newobj);
  };

  const submitupdate = async () => {
    const baseURL = window.location.origin;
    let routefile;
    let Postroute;

    if (today === date){
      routefile = "updatearr"
      Postroute = "PUT"
    }
    else{
      routefile = "additeminarr"
      Postroute = "POST"
    }

    
    const response = await fetch(`${baseURL}/api/${routefile}`, {
      method: `${Postroute}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: expobject(),
      }),
    });

    const dataFromBackend = await response.json();
    console.log(dataFromBackend);
  };

  return (
    <>
      <Head actev={"home"} />

      <div className="container">
        <ul
          className="list-group mb-4 mt-4 opacity-100 shadow-lg bg-body-tertiary rounded"
          style={{ padding: 0 }}
        >
          {lastexpen !== null && (
            <>
              <li
                style={{ padding: "10px 0px", fontWeight: "600" }}
                className="list-group-item d-flex justify-content-between align-items-center list-group-item-primary border border-1 border-primary"
              >
                <div style={{ width: "50%", textAlign: "center" }}>
                  اخراج والوقت
                </div>
                <div className="vr" />
                <div style={{ width: "50%", textAlign: "center" }}>المبلغ</div>
                <div className="vr" />
                <div style={{ width: "50%", textAlign: "center" }}>الوصف</div>
              </li>

              {/*** body invoce ***/}

              {lastexpen.map((entry, entryIndex) => (
                <div key={entryIndex} style={{ position: "relative" }}>
                  {entry.discraption.map((item, itemIndex) => (
                    <div key={itemIndex} style={{ position: "relative" }}>
                      <li
                        className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger"
                        style={{
                          width: "66.7%",
                          left: "33.3%",
                          padding: "7px 0px",
                        }}
                      >
                        <div
                          style={{ width: "100%", textAlign: "center" }}
                          id="inv_Ms"
                        >
                          {entry.money[itemIndex]}
                        </div>
                        <div className="vr" />
                        <div
                          className="dropend"
                          style={{ width: "100%", textAlign: "center" }}
                        >
                          <button
                            style={{
                              border: "none",
                              outline: "none",
                              background: "none",
                              fontWeight: 500,
                            }}
                            data-bs-toggle="dropdown"
                          >
                            {item}
                          </button>
                          <div
                            className="dropdown-menu"
                            style={{
                              width: "1%",
                              background: "none",
                              border: "none",
                            }}
                          >
                            <p
                              style={{
                                backgroundColor: "rgb(68, 0, 0)",
                                width: "auto",
                                marginRight: 100,
                                textAlign: "center",
                                color: "#ffffff",
                                borderRadius: 18,
                              }}
                            >
                              {entry.money[itemIndex]}
                            </p>
                          </div>
                        </div>
                      </li>
                    </div>
                  ))}

                  <div className="div-time">
                    {entry.user}
                    <br />
                    {entry.time}
                  </div>
                </div>
              ))}

              {/*** body invoce ***/}
              {/* end invoce */}

              <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-secondary border border-1 border-secondary-subtle">
                <div style={{ width: "50%", textAlign: "center" }}>
                  الاجمالي: <small className="text-danger">{tatalarr}</small>
                </div>

                <div className="vr" />
                <div
                  className=""
                  style={{ width: "50%", textAlign: "center" }}
                  id="date"
                >
                  {date}
                </div>
              </li>
            </>
          )}
          {/* top invoce */}
        </ul>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        // @ts-ignore
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close opacity-0"
                data-bs-dismiss="modal"
                aria-label="Close"
                disabled
              ></button>

              <h6
                className="modal-title me-5 w-100 text-center"
                id="staticBackdropLabel"
              >
                <i className="fa-solid fa-comment-dollar fa-rotate-180 fa-xl me-2"></i>
                اضافة مصروفات
                <i className="fa-solid fa-comment-dollar fa-xl ms-2"></i>
              </h6>
            </div>

            {/* start modal body */}

            <div className="modal-body">
              <div className="row g-0 justify-content-evenly">
                <button className="col-1 opacity-0" disabled>
                  <i
                    className="fa-solid fa-delete-left fa-rotate-180 fa-lg"
                    style={{ color: "#360000" }}
                  ></i>
                </button>
                <h6 className="col-3 text-center"> المبلغ </h6>
                <i
                  className="fa-solid fa-arrow-right-arrow-left col-1 opacity-0"
                  style={{
                    color: "#FFD43B",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></i>
                <h6 className="col-6 text-center">الوصف</h6>
              </div>

              {items.map((item, index) => {
                return (
                  <div
                    className="row g-0 justify-content-evenly"
                    id={item.id}
                    key={index}
                  >
                    <button className="col-1">
                      <i
                        className="fa-solid fa-delete-left fa-rotate-180 fa-lg"
                        style={{ color: "#550000" }}
                      ></i>
                    </button>

                    <input
                      className="col-3"
                      type=""
                      pattern="[0-9]*"
                      id={`mon_${item.id}`}
                      onKeyUp={(e) => {
                        addarritem(e.target.value, e.target.id, e.target);
                      }}
                    />

                    <i
                      className="fa-solid fa-arrow-right-arrow-left col-1"
                      style={{
                        color: "#FFD43B",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    ></i>

                    <input
                      className="col-6"
                      type="text"
                      id={`dis_${item.id}`}
                      onKeyUp={(e) => {
                        addarritem(e.target.value, e.target.id, e.target);
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <div
              className="row g-0 justify-content-evenly"
              style={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                backgroundColor: "#00313aab",
              }}
            >
              <div className="col-4 text-center">
                الاجمالي: <small className="text-danger">{plusmoney}</small>
              </div>

              <button
                className="plus-item col-2 p-1"
                style={{ background: "none", border: "none", width: "40px" }}
                onClick={() => {
                  addItem();
                }}
              >
                <i
                  className="fa-solid fa-circle-plus fa-xl"
                  style={{ color: "#fcba32" }}
                ></i>
              </button>

              <div
                className="col-4 text-center"
                style={{ letterSpacing: "1.5px" }}
              >
                {today}
              </div>
            </div>

            {/* end modal body */}

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  submitupdate();
                }}
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
