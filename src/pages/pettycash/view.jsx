import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";

const View = () => {
  const { id } = useParams();

  const [pettycash, setPettyCash] = useState({});
  const [paylists, setPayLists] = useState([]);
  const [paytotal, setPayTotal] = useState(0);
  const [creddit, setCredit] = useState(0);

  const getData = async () => {
    await axios
      .get(
        "http://localhost/laravel_auth_jwt_api_afd/public/api/petty-cash/" + id
      )
      .then((res) => {
        setPettyCash(res.data.data);
        setPayLists(res.data.data.pay_list);
        setCredit(res.data.data.credit_type);
        setPayTotal(
          res.data.data.pay_list.reduce((sum, item) => sum + item.amount, 0)
        );
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Petty Cash View</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Petty Cash List</li>
                  <li className="breadcrumb-item active">View</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card card-outline card-primary">
                  <div className="card-body">
                    <div className="col-md-12">
                      <div className="col-md-12 mt-3">
                        <h4>บริษัท ไทยรุ่งยูเนี่ยนคาร์ จำกัด (หมาชน)</h4>
                        <br />
                      </div>
                      <div className="col-md-12">
                        <h5>ใบขอเบิกค่าใช้จ่าย / ใบเบิกงานสดย่อย</h5>
                      </div>
                      <div className="col-md-12">
                        <id className="card shadow-none border">
                          <div className="card-body">
                            <table className="table table-borderless">
                              <thead>
                                <tr>
                                  <td>
                                    <b>จ่ายให้แก่ :</b> {pettycash.pay_to}
                                  </td>
                                  <td>
                                    <b>หน่วยงาน :</b> {pettycash.dept}
                                  </td>
                                  <td>
                                    <b>ส่วนงาน :</b> {pettycash.division}
                                  </td>
                                  <td>
                                    <b>ฝ่ายงาน :</b> {pettycash.section}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>Cash ID :</b> {pettycash.petty_cash_id}
                                  </td>
                                  <td>
                                    <b>วันที่ขอเบิก :</b>{" "}
                                    {dayjs(pettycash.created_at).format(
                                      "DD-MMM-YYYY"
                                    )}
                                  </td>
                                  <td>
                                    <b>ผู้ที่ขอเบิก :</b> {pettycash.req_by}
                                  </td>
                                  <td>
                                    <b>Company :</b> {pettycash.company}
                                  </td>
                                </tr>
                              </thead>
                            </table>
                          </div>
                        </id>
                      </div>
                      <div className="col-md-12">
                        <table className="table table-bordered">
                          <thead>
                            <tr align="center">
                              <th>NO</th>
                              <th>ACCOUNT ID</th>
                              <th>INVOICE ID</th>
                              <th>DESCRIPTION</th>
                              <th>VAT(%)</th>
                              <th>AMOUNT</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paylists.map((pay, index) => {
                              return (
                                <tr align="center">
                                  <td>{index + 1}</td>
                                  <td>{pay.acc_id}</td>
                                  <td>{pay.invoice_id}</td>
                                  <td>{pay.description}</td>
                                  <td>{pay.pay_vat}</td>
                                  <td>{pay.amount}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                          <tr align="center">
                            <td colSpan={5}>
                              <b>TOTAL</b>
                            </td>
                            <td>
                              <span>
                                <b>{paytotal}</b>
                              </span>
                            </td>
                          </tr>
                        </table>
                        <div className="col-md-12 mt-3">
                          <input
                            type="checkbox"
                            checked={creddit === 1 ? true : false}
                          />{" "}
                          ในวงเงินงบประมาณ{" "}
                          <input
                            type="checkbox"
                            checked={creddit === 2 ? true : false}
                          />{" "}
                          นอกงบประมาณ{" "}
                          <input
                            type="checkbox"
                            checked={creddit === 3 ? true : false}
                          />{" "}
                          เกินงบประมาณ
                        </div>
                        <div className="mt-3">
                          <div className="row">
                            <div className="col-md-3 text-center">
                              <div className="card shadow-none border">
                                <div className="card-body">
                                  <br />
                                  ...............................................................
                                  <br />
                                  <b>ผู้เบิกเงิน</b> <br />
                                  <br />
                                  วันที่............................................................
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 text-center">
                              <div className="card shadow-none border">
                                <div className="card-body">
                                  <br />
                                  ...............................................................
                                  <br />
                                  <b>ผู้อนุมัติ</b> <br />
                                  <br />
                                  วันที่............................................................
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 text-center">
                              <div className="card shadow-none border">
                                <div className="card-body">
                                  <br />
                                  ...............................................................
                                  <br />
                                  <b>ผู้รับเงิน</b> <br />
                                  <br />
                                  วันที่............................................................
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 text-center">
                              <div className="card shadow-none border">
                                <div className="card-body">
                                  <br />
                                  ...............................................................
                                  <br />
                                  <b>ผู้จ่ายเงิน</b> <br />
                                  <br />
                                  วันที่............................................................
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="float-right mt-2">
                          <button className="btn btn-secondary">
                            <i className="fas fa-print"></i> PRINT
                          </button>{" "}
                          <Link to={"/pettycash"} className="btn btn-danger">
                            <i className="fas fa-arrow-circle-left"></i> CANCEL
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
