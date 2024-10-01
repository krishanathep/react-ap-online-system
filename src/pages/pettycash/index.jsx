import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "mantine-datatable";
import axios from "axios";
import dayjs from "dayjs";

const PAGE_SIZES = [5, 10, 20, 30];

const Payments = () => {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [pettycash, setPettyCash] = useState([]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState(pettycash.slice(0, pageSize));

  const getData = async () => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get("http://localhost/laravel_auth_jwt_api_afd/public/api/petty-cash")
      .then((res) => {
        setPettyCash(res.data.data);
        setRecords(res.data.data.slice(from, to));
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, [page, pageSize]);

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">รายการเอกสารเงินสดย่อย</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Petty cash list</li>
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
                    <div className="row">
                      <div className="col-md-12">
                        <div className="float-right mb-2">
                          {/* <button
                            onClick={() =>
                              alert("Export all data to excel file!")
                            }
                            className="btn btn-secondary"
                          >
                            <i className="fas fa-download"></i> EXPORT
                          </button>{" "} */}
                          <Link
                            to={"/pettycash/create"}
                            className="btn btn-success"
                          >
                            <i className="fa fa-plus"></i> เพิ่มเอกสาร
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card shadow-none border">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">รหัสเอกสาร</label>
                                  <select className="form-control" id="sel1">
                                    <option>กรุณาเลือกข้อมูล</option>
                                    <option>Petty Cash ID 1</option>
                                    <option>Petty Cash ID 2</option>
                                    <option>Petty Cash ID 3</option>
                                    <option>Petty Cash ID 4</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">รหัสพนักงาน</label>
                                  <select className="form-control" id="sel1">
                                    <option>กรุณาเลือกข้อมูล</option>
                                    <option>Employees 1</option>
                                    <option>Employees 2</option>
                                    <option>Employees 3</option>
                                    <option>Employees 4</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">ชื่อบริษัท</label>
                                  <select className="form-control" id="sel1">
                                    <option>กรุณาเลือกข้อมูล</option>
                                    <option>Company 1</option>
                                    <option>Company 2</option>
                                    <option>Company 3</option>
                                    <option>Company 4</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">ฝ่ายงาน</label>
                                  <select className="form-control" id="sel1">
                                    <option>กรุณาเลือกข้อมูล</option>
                                    <option>Department 1</option>
                                    <option>Department 2</option>
                                    <option>Department 3</option>
                                    <option>Department 4</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">สถานะ</label>
                                  <select className="form-control" id="sel1">
                                    <option>กรุณาเลือกข้อมูล</option>
                                    <option>Status 1</option>
                                    <option>Status 2</option>
                                    <option>Status 3</option>
                                    <option>Status 4</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">วันที่จัดทำ</label>
                                  <select className="form-control" id="sel1">
                                    <option>กรุณาเลือกข้อมูล</option>
                                    <option>Created at 1</option>
                                    <option>Created at 2</option>
                                    <option>Created at 3</option>
                                    <option>Created at 4</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DataTable
                      style={{
                        fontFamily: "Prompt",
                      }}
                      withBorder
                      highlightOnHover
                      fontSize={"md"}
                      verticalSpacing="md"
                      paginationSize="md"
                      withColumnBorders
                      fetching={loading}
                      idAccessor="id"
                      columns={[
                        {
                          accessor: "index",
                          title: "#",
                          textAlignment: "center",
                          width: 80,
                          render: (record) => records.indexOf(record) + 1,
                        },
                        {
                          accessor: "petty_cash_id",
                          title: "รหัสเอกสาร",
                          textAlignment: "center",
                        },
                        {
                          accessor: "emp_id",
                          title: "รหัสพนักงาน",
                          textAlignment: "center",
                        },
                        {
                          accessor: "pay_to",
                          title: "จ่ายเงินให้",
                          textAlignment: "center",
                        },
                        {
                          accessor: "section",
                          title: "หน่วยงาน",
                          textAlignment: "center",
                        },
                        {
                          accessor: "division",
                          title: "ส่วนงาน",
                          textAlignment: "center",
                        },
                        {
                          accessor: "dept",
                          title: "ฝ่ายงาน",
                          textAlignment: "center",
                        },
                        {
                          accessor: "company",
                          title: "ชื่อบริษัท",
                          textAlignment: "center",
                        },
                        {
                          accessor: "status",
                          title: "สถานะเอกสาร",
                          textAlignment: "center",
                          render: ({ status }) => (
                            <>
                              {status === "รอสั่งจ่ายเงิน" ? (
                                <span className="badge rounded-pill bg-primary">
                                  {status}
                                </span>
                              ) : status === "จ่ายเงินสำเร็จ" ? (
                                <span className="badge rounded-pill bg-success">
                                  {status}
                                </span>
                              ) : status === "จัดทำเอกสาร" ? (
                                <span className="badge rounded-pill bg-secondary">
                                  {status}
                                </span>
                              ) : (
                                <span className="badge rounded-pill bg-danger">
                                  {status}
                                </span>
                              )}
                            </>
                          ),
                        },
                        {
                          accessor: "created_at",
                          title: "วันที่จัดทำ",
                          textAlignment: "center",
                          render: ({ updated_at }) =>
                            dayjs(updated_at).format("DD-MMM-YYYY"),
                        },
                        {
                          accessor: "actions",
                          textAlignment: "center",
                          title: "ดำเนินการ",
                          width: 250,
                          render: (blogs) => (
                            <>
                              <button
                                className="btn btn-warning text-white"
                                //onClick={() => hanldeDelete(blogs)}
                                onClick={() => alert("Send Petty Cash to AFD")}
                              >
                                <i className="fas fa-paper-plane"></i>
                              </button>{" "}
                              <Link
                                to={"/pettycash/view/" + blogs.id}
                                className="btn btn-info"
                              >
                                <i className="fas fa-print"></i>
                              </Link>{" "}
                              <Link
                                to={"/pettycash/update/" + blogs.id}
                                className="btn btn-primary"
                              >
                                <i className="fas fa-edit"></i>
                              </Link>{" "}
                              <button
                                className="btn btn-danger"
                                //onClick={() => hanldeDelete(blogs)}
                                onClick={() =>
                                  alert("This Petty Cash Deleted!!!")
                                }
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </>
                          ),
                        },
                      ]}
                      records={records}
                      minHeight={200}
                      totalRecords={pettycash.length}
                      recordsPerPage={pageSize}
                      page={page}
                      onPageChange={(p) => setPage(p)}
                      recordsPerPageOptions={PAGE_SIZES}
                      onRecordsPerPageChange={setPageSize}
                    />
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

export default Payments;
