import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "mantine-datatable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

  const numberFilter = async(key) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get("http://localhost/laravel_auth_jwt_api_afd/public/api/petty-cash")
      .then((res) => {
        const number = res.data.data.filter((p)=>p.petty_cash_id.includes(key))
        setPettyCash(number);
        setRecords(number.slice(from, to));
        setLoading(false);
      });
  }

  const employeeFilter = async(key) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get("http://localhost/laravel_auth_jwt_api_afd/public/api/petty-cash")
      .then((res) => {
        const employee = res.data.data.filter((p)=>p.emp_id.includes(key))
        setPettyCash(employee);
        setRecords(employee.slice(from, to));
        setLoading(false);
      });
  }

  const companyFilter = async(key) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get("http://localhost/laravel_auth_jwt_api_afd/public/api/petty-cash")
      .then((res) => {
        const company = res.data.data.filter((p)=>p.company===key)
        setPettyCash(company);
        setRecords(company.slice(from, to));
        setLoading(false);
      });
  }

  const deptFilter = async(key) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get("http://localhost/laravel_auth_jwt_api_afd/public/api/petty-cash")
      .then((res) => {
        const dept = res.data.data.filter((p)=>p.dept===key)
        setPettyCash(dept);
        setRecords(dept.slice(from, to));
        setLoading(false);
      });
  }

  const statusFilter = async(key) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get("http://localhost/laravel_auth_jwt_api_afd/public/api/petty-cash")
      .then((res) => {
        const status = res.data.data.filter((p)=>p.status===key)
        setPettyCash(status);
        setRecords(status.slice(from, to));
        setLoading(false);
      });
  }

  const dateFilter = async(key) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get("http://localhost/laravel_auth_jwt_api_afd/public/api/petty-cash")
      .then((res) => {
        const date = res.data.data.filter((p)=>p.created_at.includes(key))
        setPettyCash(date);
        setRecords(date.slice(from, to));
        console.log(key)
        setLoading(false);
      });
  }

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
                                  <label htmlFor="">หมายเลขเอกสาร</label>
                                  <input 
                                  className="form-control"
                                  placeholder="กรุณาเพิ่มข้อมูล"
                                  onChange={(event) =>
                                    numberFilter(event.target.value)
                                  }
                                  />
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">รหัสพนักงาน</label>
                                  <input 
                                  className="form-control"
                                  placeholder="กรุณาเพิ่มข้อมูล"
                                  onChange={(event) =>
                                    employeeFilter(event.target.value)
                                  }
                                  />
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">ฝ่ายงาน</label>
                                  <select className="form-control"
                                   onChange={(event) =>
                                    deptFilter(event.target.value)
                                  }
                                  >
                                    <option>กรุณาเลือกข้อมูล</option>
                                    <option value={'ITD'}>ITD</option>
                                    <option value={'HRD'}>HRD</option>
                                    <option value={'AFD'}>AFD</option>
                                    <option value={'PED'}>PED</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">ชื่อบริษัท</label>
                                  <select 
                                  className="form-control" 
                                  onChange={(event) =>
                                    companyFilter(event.target.value)
                                  }
                                  >
                                    <option>กรุณาเลือกข้อมูล</option>
                                    <option value={'TRU'}>TRU</option>
                                    <option value={'TRT'}>TRT</option>
                                    <option value={'TUC'}>TUC</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">สถานะ</label>
                                  <select className="form-control"
                                   onChange={(event) =>
                                    statusFilter(event.target.value)
                                  }
                                  >
                                    <option>กรุณาเลือกข้อมูล</option>
                                    <option value={'จัดทำเอกสาร'}>จัดทำเอกสาร</option>
                                    <option value={'รอสั่งจ่ายเงิน'}>รอสั่งจ่ายเงิน</option>
                                    <option value={'จ่ายเงินสำเร็จ'}>จ่ายเงินสำเร็จ</option>
                                    <option value={'จ่ายเงินไม่สำเร็จ'}>จ่ายเงินไม่สำเร็จ</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">วันที่จัดทำ</label>
                                  <input
                                  type="date"
                                  className="form-control"
                                  onChange={(event) =>
                                    dateFilter(
                                      dayjs(event.target.value).format(
                                        "YYYY-MM-DD"
                                      )
                                    )
                                  } 
                                  />
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
                          title: "หมายเลขเอกสาร",
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
                            <h5>
                              {status === "รอสั่งจ่ายเงิน" ? (
                                <span className="badge bg-primary">
                                  {status}
                                </span>
                              ) : status === "จ่ายเงินสำเร็จ" ? (
                                <span className="badge bg-success">
                                  {status}
                                </span>
                              ) : status === "จัดทำเอกสาร" ? (
                                <span className="badge bg-warning">
                                  {status}
                                </span>
                              ) : (
                                <span className="badge bg-danger">
                                  {status}
                                </span>
                              )}
                            </h5>
                          ),
                        },
                        {
                          accessor: "created_at",
                          title: "วันที่จัดทำ",
                          textAlignment: "center",
                          render: ({ created_at }) =>
                            dayjs(created_at).format("DD-MMM-YYYY"),
                        },
                        {
                          accessor: "actions",
                          textAlignment: "center",
                          title: "ดำเนินการ",
                          width: 250,
                          render: (blogs) => (
                            <>
                              <button
                                className="btn btn-info"
                                //onClick={() => hanldeDelete(blogs)}
                                onClick={() => alert("Send Petty Cash to AFD")}
                              >
                                <i className="fas fa-paper-plane"></i>
                              </button>{" "}
                              <Link
                                to={"/pettycash/view/" + blogs.id}
                                className="btn btn-secondary"
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
