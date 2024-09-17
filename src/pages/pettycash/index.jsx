import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { DataTable } from "mantine-datatable";
import axios from "axios";
import dayjs from "dayjs";

const PAGE_SIZES = [5, 10, 20, 30];

const Payments = () => {

  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [overtimes, setOvertimes] = useState([]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState(overtimes.slice(0, pageSize));

  const getData = async () => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get(
        "https://full-stack-app.com/laravel_auth_jwt_api/public/api/ksssystems"
      )
      .then((res) => {
        setOvertimes(res.data.ksssystems);
        setRecords(res.data.ksssystems.slice(from, to));
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
                <h1 className="m-0">Petty cash list</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Petty cash</li>
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
                          <button
                            onClick={() =>
                              alert("Export all data to excel file!")
                            }
                            className="btn btn-secondary"
                          >
                            <i className="fas fa-download"></i> EXPORT
                          </button>{" "}
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
                      accessor: "title",
                      title: "เลขที่ใบคำร้อง",
                    },
                    { accessor: "objective", title: "ผู้ควบคุมงาน" },
                    {
                      accessor: "suggest_type",
                      title: "หน่วย / ส่วน / ฝ่าย",
                    },
                    // {
                    //   accessor: "status",
                    //   title: "สถานะการอนุมัติ",
                    //   textAlignment: "center",
                    //   render: ({ status }) => (
                    //     <>
                    //       <h5>
                    //         {status === "Approved" ? (
                    //           <Badge bg="success">{status}</Badge>
                    //         ) : status === "Rejected" ? (
                    //           <Badge bg="danger">{status}</Badge>
                    //         ) : (
                    //           <Badge bg="primary">{status}</Badge>
                    //         )}
                    //       </h5>
                    //     </>
                    //   ),
                    // },
                    // {
                    //   accessor: "created_at",
                    //   title: "วันที่เริ่มต้น",
                    //   textAlignment: "center",
                    //   render: ({ created_at }) =>
                    //     dayjs(created_at).format("DD-MMM-YYYY"),
                    // },
                    {
                      accessor: "created_at",
                      title: "วันที่สิ้นสุด",
                      textAlignment: "center",
                      render: ({ updated_at }) =>
                        dayjs(updated_at).format("DD-MMM-YYYY"),
                    },
                    {
                      accessor: "actions",
                      textAlignment: "center",
                      title: "Actions",
                      width: 300,
                      render: (blogs) => (
                        <>
                          <Link
                            to={"/overtime/view/" + blogs.id}
                            className="btn btn-info"
                          >
                            View
                          </Link>{" "}
                          <Link
                            to={"/overtime/edit/" + blogs.id}
                            className="btn btn-primary"
                          >
                            Edit
                          </Link>{" "}
                          <button
                            className="btn btn-danger"
                            onClick={() => hanldeDelete(blogs)}
                          >
                            Delete
                          </button>
                        </>
                      ),
                    },
                  ]}
                  records={records}
                  minHeight={200}
                  totalRecords={overtimes.length}
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
