// @ts-nocheck
"use client";

import { useEffect, useState, useRef } from "react";
import "./style.css";
import { notFound, useRouter } from "next/navigation";
import axios from "axios";
import moment from "moment";
import Musseg from "@/../../src/components/Musseg";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

console.log(moment().format("D/MM/YYYY"));

const Page = ({ params }) => {
  const [today, settoday] = useState("");
  const [oclock, setoclock] = useState("");
  const [indexli, setindexli] = useState(0);
  const [items, setItems] = useState([]);
  const [name, setname] = useState(null);
  const [adres, setadres] = useState(null);
  const [phone, setphone] = useState(null);
  const [arrinvoice, setarrinvoice] = useState([]);
  const [dateinv, setdateinv] = useState([]);
  const [currentTotal, setCurrentTotal] = useState(0);
  const buttonRef = useRef(null);
  const [plusinvoice, setplusinvoice] = useState(0);
  const [showinvoice, setshowinvoice] = useState("d-none");
  const inputRef = useRef(null);
  const [invoices, setinvoices] = useState(0);
  const [allindexarr, setallindexarr] = useState(0);
  const [uninvoice, setuninvoice] = useState("");
  const [iduser, setiduser] = useState(null);
  const [isonsubmit, setisonsubmit] = useState(false);
  const [onedit, setonedit] = useState(false);
  const [inpsmoney, setinpsmoney] = useState([]);
  const [arrdeletitem, setarrdeletitem] = useState([]);
  const [numindex, setnumindex] = useState(0);

  console.log(arrinvoice);
  console.log(arrdeletitem);

  const router = useRouter();

  useEffect(() => {
    const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]'
    );
    // @ts-ignore
    const popoverList = [...popoverTriggerList].map(
      (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
    );
  }, [dateinv]);

  const inputRefs = useRef([]);

  const [InvMode, setInvMode] = useState("");

  const addinvoice = (modeinvoice) => {
    if (modeinvoice === "minis") {
      setInvMode("danger");
      addItem(`danger`, "");
    } else {
      setInvMode("success");
      addItem(`success`, "تسديد مبلغ");
      handelarr("inv_des_0", "تسديد مبلغ");
    }
    console.log("zain");
    buttonRef.current.click();

    setshowinvoice("");
    inpfucas();
    console.log("dfsdgsdgers");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://nextback-seven.vercel.app/invoice/65e4ee2578eab017bb28a9d8`
        );
        const result = response.data;
        // setname(result.name);
        // setadres(result.addres);
        // setphone(result.phone);
        // setiduser(result._id);
        // console.log(result.phone);

        // console.log(result.arrinvoce.length);
        if (result.arrinvoce.length !== 0) {
          // setarrinvoice(JSON.parse(result.arrinvoce));
          console.log(JSON.parse(result.arrinvoce));
          const getmony = JSON.parse(result.arrinvoce);
          arrAllinvoice(getmony);
        } else {
          setuninvoice("لم يتم تسجيل فواتير بعد");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          notFound();
        } else {
          console.error("Unexpected error occurred:", error);
        }
      }

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    };
    getData();
  }, [params.id]);

  useEffect(() => {
    const getdata = async () => {
      const response = await axios.get(
        `https://nextback-seven.vercel.app/customer-details/${params.id}`
      );
      const result = response.data;
      setarrinvoice(result.arrinvoce);
      console.log(result.arrinvoce);
      // setname(result.name);
      // setadres(result.addres);
      // setphone(result.phone);
    };

    getdata();
  }, [params.id]);

  const arrAllinvoice = (arr) => {
    let totalarruser = 0;
    let totalinpmoney = 0;
    let arrinvo = [];
    let dateinvoice = [];
    let numincoie = [0];

    arr.forEach((arrmoney, index) => {
      dateinvoice.push(arrmoney.date);
      const totalonearr = arrmoney.money.reduce((acc, num) => acc + num, 0);
      totalinpmoney += arrmoney.money.length;

      numincoie.push(totalinpmoney);
      totalarruser += +totalonearr;
      arrinvo.push(+totalarruser);
    });
    setinpsmoney(numincoie);
    setCurrentTotal(arrinvo);
    setdateinv(dateinvoice);
  };

  const openedit = () => {
    console.log("edit");
    buttonRef.current.click();
    setonedit(true);
    console.log(inpsmoney);
  };

  const unreadonly = (inp) => {
    console.log(inp.className);
    if (inp.readOnly && onedit) {
      inp.readOnly = !inp.readOnly;
      inp.className = "inp_invoice_write";
    }
  };

  const editarr = (value, id, inp) => {
    let layerinv = id.split("_")[3];
    let indexarr = id.split("_")[2];
    let nameinv = id.split("_")[1];
    if (nameinv == "des") {
      arrinvoice[indexarr].description[layerinv] = value;
      console.log(arrinvoice[indexarr].description);
    } else if (nameinv == "mon") {
      console.log(inp.parentElement.className);
      if (isNaN(value)) {
        value = value.slice(0, -1);
        inp.value = value;
        // console.log(value.slice(0, -1));
      } else {
        if (
          inp.parentElement.className ==
          "list-group-item d-flex justify-content-between align-items-center list-group-item-danger"
        ) {
          arrinvoice[indexarr].money[layerinv] = Number(-value);
        } else {
          arrinvoice[indexarr].money[layerinv] = Number(value);
        }

        arrAllinvoice(arrinvoice);
      }
    }
  };

  let arritemdelet = [];
  const Selectitemdelete = (item) => {
    arritemdelet = [...arrdeletitem];

    let index = item.id.split("_")[3];

    // console.log(item.parentElement.previousElementSibling.previousElementSibling)
    // console.log(item)
    // console.log(item.parentElement.parentElement.classList.contains('focasdelet'))

    if (!item.parentElement.parentElement.classList.contains("focasdelet")) {
      item.parentElement.parentElement.classList.add("focasdelet");
      arritemdelet[index] = item.id;
      // arritemdelet = arritemdelet.filter(function (value) {
      //   return value != null;
      // });
      console.log(arrdeletitem);
    } else {
      item.parentElement.parentElement.classList.remove("focasdelet");
      arritemdelet[index] = undefined;
      console.log(arrdeletitem);
    }
    setarrdeletitem(arritemdelet);
  };

  const deletitem = () => {
    setarrdeletitem(
      arrdeletitem.filter(function (value) {
        return value != "" && value != null && value != undefined;
      })
    );
    console.log(arrdeletitem);

    handeldalete();
  };

  const handeldalete = () => {
    let arrfackinvoice = [...arrinvoice];

    // تكرار العناصر بالعكس
    arrdeletitem
      .reverse()
      .slice()
      .map((item) => {
        if (item != undefined) {
          console.log(item);

          let numarr = item.split("_")[1];
          let indexinv = item.split("_")[2];
          console.log(numarr + " / " + indexinv);

          arrfackinvoice[numarr].user.splice(indexinv, 1);
          arrfackinvoice[numarr].money.splice(indexinv, 1);
          arrfackinvoice[numarr].description.splice(indexinv, 1);
          arrfackinvoice[numarr].dateofregistration.splice(indexinv, 1);
          console.log(arrfackinvoice[numarr]);
        }
      });
    setarrinvoice(arrfackinvoice);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addItem = (mode, value) => {
    setindexli((prevCounter) => prevCounter + 1);
    const newItem = {
      id: indexli + 1,
      classi: `list-group-item-${mode}`,
      valueinp: `${value}`,
    };

    console.log("indexli");
    setItems([...items, newItem]);
    console.log(items);
    setinvoices((prevCounter) => prevCounter + 2);
  };

  const inpfucas = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  let arrdes = [];
  let arrmoney = [];
  useEffect(() => {
    sessionStorage.removeItem("arr1");
    sessionStorage.removeItem("arr2");
    arrdes = [];
    arrmoney = [];
  }, [isonsubmit]);

  const handelarr = (id, value) => {
    if (
      sessionStorage.getItem("arr1") !== null ||
      sessionStorage.getItem("arr2") !== null
    ) {
      arrmoney = JSON.parse(sessionStorage.getItem("arr1"));
      arrdes = JSON.parse(sessionStorage.getItem("arr2"));
    }

    let namearr = id.split("_")[1];
    let indexarr = parseInt(id.split("_")[2], 10);

    if (namearr === "des") {
      arrdes[indexarr] = value;
    } else {
      if (InvMode == "danger") arrmoney[indexarr] = +-value;
      else arrmoney[indexarr] = +value;
    }

    sessionStorage.setItem("arr1", JSON.stringify(arrmoney));
    sessionStorage.setItem("arr2", JSON.stringify(arrdes));

    filterarr();
  };

  const [description, setdescription] = useState([]);
  const [money, setmoney] = useState([]);

  const filterarr = () => {
    settoday(moment().format("D/MM/YYYY"));
    setoclock(moment().format("LT"));

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

    console.log("Filtered arrdes:", arrdesfilter);
    console.log("Filtered arrmoney:", arrmoneyfilter);

    setdescription(arrdesfilter);
    setmoney(arrmoneyfilter);

    setallindexarr(arrdesfilter.length + arrmoneyfilter.length);

    setplusinvoice(
      arrmoneyfilter.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );
  };

  const deleteitem = (item) => {
    let indexdeletitem = +item.id;
    handelarr(`inv_des_${indexdeletitem}`, null);

    handelarr(`inv_mon_${indexdeletitem}`, null);
    item.parentElement.remove();
    setinvoices((prevCounter) => prevCounter - 2);
  };

  const addnewinvoice = (e) => {
    e.preventDefault();

    if (!onedit) {
      settoday(moment().format("D/MM/YYYY"));
      setoclock(moment().format("LT"));

      let lastarrinvoice = arrinvoice[arrinvoice.length - 1];
      let invoice = creatnewinvoice();

      if (arrinvoice != "") {
        if (lastarrinvoice.date == today) {
          console.log(lastarrinvoice);
          updateoldinvoice(invoice, lastarrinvoice);
          console.log("old invoice");
        } else {
          console.log("new invoice");
          console.log(lastarrinvoice);
          addednewinvoice(invoice);
        }
      } else {
        console.log("no arr");
        addednewinvoice(invoice);
      }
    } else {
      deletitem();
      SubmitUpdate(" تم تعديل الفاتورة بنجاح ");
    }
  };

  const creatnewinvoice = () => {
    const repeatValue = (value, times) => {
      return Array.from({ length: times }, () => value);
    };

    let time = repeatValue(oclock, description.length);
    let user = repeatValue(localStorage.getItem("name"), description.length);

    let newobj = {};
    newobj = {
      date: today,
      description: description,
      money: money,
      user: user,
      dateofregistration: time,
    };
    return newobj;
    // arrinvoice.push(newobj);
    // addednewinvoice(newobj)
    // console.log(newobj);
    // console.log(JSON.stringify(arrinvoice));
    // SubmitUpdate()
  };

  const addednewinvoice = (invoice) => {
    arrinvoice.push(invoice);
    SubmitUpdate(" تم اضافة الفاتورة جديدة بنجاح ");
  };

  const updateoldinvoice = (invoice, oldoneinvoice) => {
    oldoneinvoice.money.push(...invoice.money);
    oldoneinvoice.user.push(...invoice.user);
    oldoneinvoice.description.push(...invoice.description);
    oldoneinvoice.dateofregistration.push(...invoice.dateofregistration);

    arrinvoice[arrinvoice.length - 1] = oldoneinvoice;
    console.log(oldoneinvoice);
    console.log(arrinvoice[arrinvoice.length - 1]);

    SubmitUpdate(" تم اضافة اصناف للفاتورة بنجاح ");
  };
  console.log("baseURL");

  const SubmitUpdate = async (title) => {
    setisonsubmit(true);
    const baseURL = window.location.origin;
    console.log(baseURL);

    const response = await fetch(`${baseURL}/api/updateinvoice`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        adres,
        phone,
        arrinvoice: JSON.stringify(arrinvoice),
        iduser,
      }),
    });

    const dataFromBackend = await response.json();
    console.log(dataFromBackend);

    if (response.ok) {
      console.log("yes");
      toast.success(`${title}`);
      setshowinvoice("d-none");
      setisonsubmit(false);
      setInvMode("");
      setItems([]);
      setindexli(0);
      setinvoices(0);
      setplusinvoice(0);
      arrAllinvoice(arrinvoice);
      filterarr();
      setonedit(false);
    }
  };

  const goo = async () => {
    console.log("zaingooo");

    const baseURL = window.location.origin;
    console.log(baseURL);

    const response = await fetch(
      `${baseURL}/api/Billingoperations/setnewinvoice`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          adres,
          phone,
          arrinvoice: JSON.stringify(arrinvoice),
          iduser,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
  };

  return (
    <div style={{ backgroundColor: `${onedit ? "#ffd54a49" : ""}` }}>
      <button
        className="btn btn-danger"
        onClick={() => {
          goo();
        }}
      >
        submit
      </button>
      <Musseg />

      <div
        className="modal fade"
        id="staticBackdrop"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ direction: "rtl" }}
        data-bs-theme="dark"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-white text-center m-auto"
                id="exampleModalLabel"
              >
                {" "}
                اختر نوع العملية{" "}
              </h1>
            </div>
            <div className="modal-body text-center">
              <div className="row p-3 m-auto justify-content-between">
                <button
                  className="btn btn-success m-auto w-60 col-5"
                  style={{ height: 90, padding: 25 }}
                  id="inv_price"
                  onClick={() => {
                    addinvoice("plus");
                  }}
                >
                  تسديد مبلغ
                  <i
                    className="fa-solid fa-hand-holding-dollar fa-xl"
                    style={{ height: 50, fontWeight: 600 }}
                  />
                </button>
                <button
                  className="btn btn-danger m-auto w-60 col-5"
                  style={{ height: 90, padding: 25 }}
                  id="inv_unprice"
                  onClick={() => {
                    addinvoice("minis");
                  }}
                >
                  اضافة فاتورة
                  <i
                    className="fa-solid fa-file-circle-plus fa-xl"
                    style={{ height: 50, fontWeight: 600 }}
                  />
                </button>
              </div>
              <button
                className="btn btn-warning d-block mt-3 m-auto w-50"
                style={{ height: 50, fontWeight: 600 }}
                onClick={() => openedit("dsf")}
              >
                تعديل
                <i
                  className="fa-solid fa-pen-to-square fa-xl"
                  style={{ color: "#000000" }}
                />
              </button>
            </div>
            <div className="modal-footer">
              <button
                ref={buttonRef}
                id="btn_cname"
                type="button"
                className="btn btn-secondary text-center m-auto"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <form action={`/view/${iduser}`} method="post">
        <p className="d-none" id="date_today"></p>
        <p className="d-none" id="data_req"></p>
        <input
          className="d-none"
          name="arrinvoce"
          type="text"
          readOnly
          defaultValue="<%= arr.arrinvoce %>"
          id="inp_ReqAdd_invoice"
        />
        <div className="container mt-3" style={{ direction: "rtl" }}>
          <div>
            <div>الاسم:{name}</div>
            <div>العنوان:{adres}</div>
            <div>الهاتف:{phone}</div>
          </div>

          {/* style requst invoice */}

          {arrinvoice.map((arr, index) => {
            return (
              <ul
                className="list-group mb-4 mt-4"
                style={{ padding: 0 }}
                key={index}
              >
                <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-primary border border-1 border-primary row g-0">
                  <div className="col-4" style={{ textAlign: "center" }}>
                    الوصف
                  </div>
                  <div className="vr" />
                  <div className="col-3" style={{ textAlign: "center" }}>
                    المبلغ
                  </div>
                  <div className="vr" />
                  <div className="col-4" style={{ textAlign: "center" }}>
                    {!onedit ? "اخراج والوقت" : "مسح فاتورة"}
                  </div>
                </li>
                {/*** body invoce ***/}

                {arr.money.reduce((acc, num) => acc + num, 0) &&
                index != 0 &&
                !onedit ? (
                  <div>
                    <li
                      className={`list-group-item d-flex justify-content-between align-items-center list-group-item-warning row g-0`}
                    >
                      <div className="col-4">
                        <input
                          className=""
                          type="text"
                          style={{ width: "100%", textAlign: "center" }}
                          id="inv_Ms"
                          readOnly
                          defaultValue={"فاتورة سابقة"}
                        />
                      </div>

                      <div className="vr" />
                      <div className="col-3">
                        <input
                          className={`${
                            currentTotal[index - 1] < 0
                              ? "text-danger"
                              : currentTotal[index - 1] > 0
                              ? "text-success"
                              : ""
                          } `}
                          type="text"
                          name="rtty"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          style={{
                            width: "100%",
                            textAlign: "center",
                            direction: "ltr",
                          }}
                          id="inv_Ms"
                          readOnly
                          defaultValue={
                            currentTotal[index - 1] > 0
                              ? "+" + currentTotal[index - 1]
                              : Math.abs(currentTotal[index - 1])
                          }
                        />
                      </div>

                      <div className="vr" />
                      <div className="col-4">
                        <button
                          style={{
                            width: "100%",
                            textAlign: "center",
                            fontWeight: 600,
                            border: "none",
                            color: "#000000",
                          }}
                          type="button"
                          className="btn"
                          data-bs-container="body"
                          data-bs-placement="right"
                        >
                          {dateinv[index - 1]}
                        </button>
                      </div>
                    </li>
                  </div>
                ) : (
                  ""
                )}

                {arr.money.map((inv, Larr) => {
                  return (
                    <div key={Larr}>
                      <li
                        className={`list-group-item d-flex justify-content-between align-items-center ${
                          arr.description[Larr] !== "تسديد مبلغ"
                            ? "list-group-item-danger"
                            : "list-group-item-success"
                        } row g-0`}
                      >
                        <div className="col-4">
                          <input
                            required
                            className="inp_invoice"
                            type="text"
                            style={{ textAlign: "center", width: "100%" }}
                            id={`inv_des_${index}_${Larr}`}
                            readOnly
                            defaultValue={arr.description[Larr]}
                            onFocus={(e) => {
                              unreadonly(e.target);
                            }}
                            onKeyUp={(e) => {
                              editarr(e.target.value, e.target.id);
                            }}
                          />
                        </div>

                        <div className="vr" />

                        <div className="col-3">
                          <input
                            required
                            className="inp_invoice col-3"
                            type="text"
                            name="rtty"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            style={{
                              textAlign: "center",
                              direction: "ltr",
                              width: "100%",
                            }}
                            id={`inv_mon_${index}_${Larr}`}
                            readOnly
                            defaultValue={Math.abs(arr.money[Larr])}
                            onFocus={(e) => {
                              unreadonly(e.target);
                            }}
                            onKeyUp={(e) => {
                              editarr(e.target.value, e.target.id, e.target);
                            }}
                          />
                        </div>

                        <div className="vr" />

                        {onedit ? (
                          <div
                            style={{
                              textAlign: "center",
                            }}
                            className="col-4"
                          >
                            <input
                              type="checkbox"
                              className="btn-check border-0"
                              id={`delet_${index}_${Larr}_${
                                inpsmoney[index + 1] -
                                (inpsmoney[index + 1] - inpsmoney[index]) +
                                Larr
                              }`}
                              onClick={(e) => {
                                Selectitemdelete(e.target);
                              }}
                              autoComplete="off"
                            />
                            <label
                              style={{ border: "none", background: "none" }}
                              className="btn btn-outline-danger"
                              htmlFor={`delet_${index}_${Larr}_${
                                inpsmoney[index + 1] -
                                (inpsmoney[index + 1] - inpsmoney[index]) +
                                Larr
                              }`}
                            >
                              <i
                                className="fa-regular fa-trash-can"
                                style={{ Color: "#8a0000" }}
                              ></i>
                            </label>
                          </div>
                        ) : (
                          <button
                            style={{
                              textAlign: "center",
                              fontWeight: 600,
                              border: "none",
                              color: "#000000",
                              background: "none",
                            }}
                            type="button"
                            className="btn btn-secondary col-4"
                            data-bs-container="body"
                            data-bs-toggle="popover"
                            data-bs-placement="right"
                            data-bs-content={arr.dateofregistration[Larr]}
                          >
                            {arr.user[Larr]}
                          </button>
                        )}
                      </li>
                    </div>
                  );
                })}

                {/*** body invoce ***/}

                {/* end invoce */}

                <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-secondary border border-1 border-secondary-subtle">
                  <div
                    className=""
                    style={{ width: "50%", textAlign: "center" }}
                    id="date"
                  >
                    {arr.date}
                  </div>
                  <div
                    className=""
                    style={{
                      backgroundColor: "black",
                      fontSize: 2,
                      height: 22,
                    }}
                  >
                    |
                  </div>
                  <div style={{ width: "50%", textAlign: "center" }}>
                    الاجمالي:{" "}
                    <small
                      className="text-danger"
                      id=""
                      style={{ direction: "ltr" }}
                    >
                      {Math.abs(currentTotal[index])}
                    </small>
                  </div>
                </li>
              </ul>
            );
          })}

          {arrinvoice == "" && (
            <h3
              style={{
                margin: "auto",
                textAlign: "center",
                color: "rgba(255, 0, 0, 0.623)",
                padding: 80,
              }}
            >
              {" "}
              {uninvoice}{" "}
            </h3>
          )}
          {/* style add invoice */}

          <div
            className={showinvoice}
            style={{
              backgroundColor: "rgba(196, 196, 196, 0.349)",
              margin: "20px ,0px",
              borderRadius: 15,
            }}
          >
            <ul
              className="list-group mt-4"
              id="inv_new"
              style={{ left: 20, position: "relative" }}
            >
              <h3 className="text-center text-white">اضافة فاتورة</h3>
              {/* top invoce */}
              <li
                className="list-group-item d-flex justify-content-between align-items-center list-group-item-primary border border-1 border-primary"
                id="dis_mode"
              >
                <div style={{ width: "50%", textAlign: "center" }}>الوصف</div>
                <div className="vr" />
                <div style={{ width: "50%", textAlign: "center" }}>المبلغ</div>
              </li>
              {/*** body invoce ***/}
              {/*** inp add ***/}

              <div key={1}>
                {items.map((item, index) => (
                  <div className="" key={index}>
                    <li
                      className={`list-group-item d-flex justify-content-between align-items-center ${item.classi}`}
                    >
                      <input
                        onChange={(e) => {
                          handelarr(e.target.id, e.target.value);
                        }}
                        className=""
                        type="text"
                        style={{ width: "48%", textAlign: "center" }}
                        id={`inv_des_${item.id}`}
                        defaultValue={item.valueinp}
                        ref={inputRef}
                      />

                      <div className="vr" />
                      <input
                        onChange={(e) => {
                          handelarr(e.target.id, e.target.value);
                        }}
                        className=""
                        type="text"
                        name="rtty"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        style={{
                          width: "48%",
                          textAlign: "center",
                          direction: "ltr",
                        }}
                        id={`inv_mon_${item.id}`}
                        defaultValue={item.value2}
                      />

                      {InvMode == "danger" && (
                        <>
                          <div
                            className="vr"
                            style={{
                              left: "40px",
                              position: "absolute",
                              height: "25px",
                            }}
                          />
                          <button
                            id={item.id}
                            onClick={(e) => {
                              deleteitem(e.currentTarget);
                            }}
                            className="btn"
                            style={{ position: "absolute", left: "0px" }}
                          >
                            <i
                              className="fa-regular fa-circle-xmark fa-lg"
                              style={{ color: "#800000" }}
                            ></i>
                          </button>
                        </>
                      )}
                    </li>
                  </div>
                ))}
              </div>

              {/*** body invoce ***/}
              {/* end invoce */}
              <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-secondary">
                <div
                  style={{
                    width: "50%",
                    textAlign: "center",
                    color: "rgb(0, 110, 46)",
                  }}
                  id="date1"
                >
                  {today}
                </div>

                {InvMode == "danger" && (
                  <>
                    <button
                      onClick={() => {
                        addItem(`${InvMode}`, "");
                        inpfucas();
                      }}
                      id="btn_addinv"
                      type="button"
                      className="btn btn-warning rounded-circle"
                    >
                      <i className="fa-solid fa-plus" />
                    </button>
                  </>
                )}

                <div style={{ width: "50%", textAlign: "center" }}>
                  الاجمالي:
                  <small className="text-danger" id="total_inv">
                    {Math.abs(plusinvoice)}
                  </small>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <ul className="list-group" style={{ marginTop: 180 }}>
          <li
            className="list-group-item d-flex justify-content-between align-items-center list-group-item-light"
            style={{ position: "fixed", bottom: 0, width: "100%", height: 50 }}
          >
            <div
              style={{
                width: "45%",
                textAlign: "center",
                color: "rgb(0, 110, 46)",
              }}
            >
              {InvMode === "danger" || InvMode === "success" || onedit ? (
                <>
                  <button
                    onClick={addnewinvoice}
                    href="#"
                    className={`btn btn-primary w-100 ${
                      allindexarr != invoices || isonsubmit ? "disabled" : ""
                    }`}
                    role="button"
                    id="btn_save"
                  >
                    {!isonsubmit ? (
                      "حفظ الفاتورة"
                    ) : (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          aria-hidden="true"
                        ></span>
                        ... برجاء الانتظار
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-success w-100"
                    id="btn_whats"
                  >
                    <i
                      className="fa-brands fa-whatsapp fa-xl"
                      style={{ color: "#ffffff" }}
                    />
                    WhatsApp
                  </button>
                </>
              )}
            </div>

            <div
              style={{ width: "45%", textAlign: "center" }}
              id="gro_btn_invoice"
            >
              {InvMode === "danger" || InvMode === "success" || onedit ? (
                <Link
                  className="btn btn-danger w-100"
                  href={`/`}
                  id="btn_close"
                >
                  الغاء
                </Link>
              ) : (
                <div
                  className="dropup-center dropup"
                  id="btn_section"
                  style={{ width: "100%" }}
                >
                  <button
                    style={{
                      width: "100%",
                      fontWeight: 600,
                      letterSpacing: "1.3px",
                      backgroundColor: `${
                        currentTotal[currentTotal.length - 1] > 0
                          ? "#22664ae0"
                          : "#940000"
                      }`,
                      color: "white",
                    }}
                    className="btn"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    {isNaN(currentTotal[currentTotal.length - 1]) ? (
                      <div className="">
                        <span className="">Loading...</span>
                        <div
                          className="spinner-grow  text-light"
                          role="status"
                          style={{ width: "20px", height: "20px" }}
                        ></div>
                      </div>
                    ) : (
                      <>
                        <i
                          className="fa-solid fa-sack-dollar fa-lg"
                          style={{
                            color: "#ffffff",
                            left: "-5px",
                            position: "relative",
                          }}
                        />
                        {currentTotal[currentTotal.length - 1] > 0 ? "+" : ""}
                        {Math.abs(currentTotal[currentTotal.length - 1])}
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </li>
        </ul>

        <button className="d-none" type="submit" id="myForm" />
      </form>
    </div>
  );
};

export default Page;
