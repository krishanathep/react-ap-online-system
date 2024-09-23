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
      .get(
        "http://localhost/laravel_auth_jwt_api_afd/public/api/petty-cash"
      )
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
                <h1 className="m-0">Petty Cash List</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Petty Cash List</li>
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
                            <i className="fa fa-plus"></i> CREATE
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
                                  <label htmlFor="">Employee</label>
                                  <select className="form-control" id="sel1">
                                    <option>Please Select</option>
                                    <option>Employee 1</option>
                                    <option>Employee 2</option>
                                    <option>Employee 3</option>
                                    <option>Employee 4</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">Company</label>
                                  <select className="form-control" id="sel1">
                                    <option>Please Select</option>
                                    <option>Company 1</option>
                                    <option>Company 2</option>
                                    <option>Company 3</option>
                                    <option>Company 4</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">Department</label>
                                  <select className="form-control" id="sel1">
                                    <option>Please Select</option>
                                    <option>Department 1</option>
                                    <option>Department 2</option>
                                    <option>Department 3</option>
                                    <option>Department 4</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">Section</label>
                                  <select className="form-control" id="sel1">
                                    <option>Please Select</option>
                                    <option>Section 1</option>
                                    <option>Section 2</option>
                                    <option>Section 3</option>
                                    <option>Section 4</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">Status</label>
                                  <select className="form-control" id="sel1">
                                    <option>Please Select</option>
                                    <option>Status 1</option>
                                    <option>Status 2</option>
                                    <option>Status 3</option>
                                    <option>Status 4</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">Created at</label>
                                  <select className="form-control" id="sel1">
                                    <option>Please Select</option>
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
                          title: "petty_cash_id",
                          textAlignment: "center",
                        },
                        { accessor: "emp_id", title: "emp_id", textAlignment: "center"},
                        {
                          accessor: "pay_to",
                          title: "pay_to",
                          textAlignment: "center",
                        },
                        {
                          accessor: "status",
                          title: "status",
                          textAlignment: "center",
                        },
                        {
                          accessor: "section",
                          title: "section",
                          textAlignment: "center",
                        },
                        {
                          accessor: "division",
                          title: "division",
                          textAlignment: "center",
                        },
                        {
                          accessor: "dept",
                          title: "dept",
                          textAlignment: "center",
                        },
                        {
                          accessor: "company",
                          title: "company",
                          textAlignment: "center",
                        },
                        {
                          accessor: "created_at",
                          title: "created_at",
                          textAlignment: "center",
                          render: ({ updated_at }) =>
                            dayjs(updated_at).format("DD-MMM-YYYY"),
                        },
                        {
                          accessor: "actions",
                          textAlignment: "center",
                          title: "Actions",
                          width: 250,
                          render: (blogs) => (
                            <>
                              <Link
                            to={"/pettycash/view/" + blogs.id}
                            className="btn btn-info"
                          >
                           <i className="fas fa-eye"></i>
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
                            onClick={()=>alert("This Petty Cash Deleted!!!")}
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
