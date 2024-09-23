import React, { useState } from "react";
import { Link } from "react-router-dom";

const View = () => {
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
                      <h4 className="mt-3">บริษัท ไทยรุ่งยูเนี่ยนคาร์ จำกัด (หมาชน)</h4><br/>
                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <td><h5><b>ใบขอเบิกค่าใช้จ่าย / ใบเบิกงานสดย่อย</b></h5></td>
                          </tr>
                          <tr>
                            <td><b>จ่ายให้แก่ :</b> xxxxxxxxxx</td>
                            <td><b>หน่วยงาน :</b> xxxxxxxxxx</td>
                            <td><b>ส่วนงาน :</b> xxxxxxxxxx</td>
                            <td><b>ฝ่ายงาน :</b> xxxxxxxxxx</td>
                          </tr>
                          <tr>
                            <td><b>Cash ID :</b> xxxxxxxxxx</td>
                            <td><b>วันที่ขอเบิก :</b> xxxxxxxxxx</td>
                            <td><b>ผู้ที่ขอเบิก :</b> xxxxxxxxxx</td>
                            <td><b>Company :</b> xxxxxxxxxx</td>
                          </tr>
                        </thead>
                      </table>
                      <div className="col-md-12">
                        <table className="table table-bordered">
                          <thead>
                          <tr>
                            <th>NO</th>
                            <th>DESCRIPTION</th>
                            <th>INVOICE</th>
                            <th>VAT(%)</th>
                            <th>AMOUNT</th>
                          </tr>
                          </thead>
                          <tbody>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tbody>
                          <tr>
                              <td colSpan={3}></td>
                              <td><b>TOTAL</b></td>
                              <td></td>
                          </tr>
                        </table>
                        <input type="checkbox" /> ในวงเงินงบประมาณ <input type="checkbox" /> นอกงบประมาณ <input type="checkbox" /> เกินงบประมาณ
                        <div className="col-md-12 mt-5">
                          <div className="row">
                          <div className="col-md-3 text-center">
                            ...............................................................<br/>
                            <b>ผู้เบิกเงิน</b> <br/><br/>
                            วันที่........................................
                          </div>
                          <div className="col-md-3 text-center">
                            ...............................................................<br/>
                            <b>ผู้อนุมัติ</b> <br/><br/>
                            วันที่........................................
                          </div><div className="col-md-3 text-center">
                            ...............................................................<br/>
                            <b>ผู้รับเงิน</b> <br/><br/>
                            วันที่........................................
                          </div><div className="col-md-3 text-center">
                            ...............................................................<br/>
                            <b>ผู้จ่ายเงิน</b> <br/><br/>
                            วันที่........................................
                          </div>
                          </div>
                        </div>
                      </div>
                      <div className="float-right">
                        <Link to={"/pettycash"} className="btn btn-danger mt-3">
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
    </>
  );
};

export default View;
