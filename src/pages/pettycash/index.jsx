import React from "react";
import { Link } from 'react-router-dom'

const Payments = () => {
  const payments = [
    {
      id: 1,
      emp_id: "Employee ID 1",
      emp_name: "Employee Name 1",
      company: "Thai Rung",
      section: "Section 1",
      division: "Division 1",
      depoartment: "Department 1",
      status:"In Progress",
      created_at: "10-12-2024",
      created_pay: "10-12-2024",
      created_by: "User 1",
    },
    {
      id: 2,
      emp_id: "Employee ID 2",
      emp_name: "Employee Name 2",
      company: "Thai Rung",
      section: "Section 2",
      division: "Division 2",
      depoartment: "Department 2",
      status:"In Progress",
      created_at: "10-12-2024",
      created_pay: "10-12-2024",
      created_by: "User 2",
    },
    {
      id: 3,
      emp_id: "Employee ID 3",
      emp_name: "Employee Name 3",
      company: "Thai Rung",
      section: "Section 3",
      division: "Division 3",
      depoartment: "Department 3",
      status:"Approved",
      created_at: "10-12-2024",
      created_pay: "10-12-2024",
      created_by: "User 3",
    },
    {
      id: 4,
      emp_id: "Employee ID 4",
      emp_name: "Employee Name 4",
      company: "Thai Rung",
      section: "Section 4",
      division: "Division 4",
      depoartment: "Department 4",
      status:"Approved",
      created_at: "10-12-2024",
      created_pay: "10-12-2024",
      created_by: "User 4",
    },
    {
      id: 5,
      emp_id: "Employee ID 5",
      emp_name: "Employee Name 5",
      company: "Thai Rung",
      section: "Section 5",
      division: "Division 5",
      depoartment: "Department 5",
      status:"Approved",
      created_at: "10-12-2024",
      created_pay: "10-12-2024",
      created_by: "User 5",
    },
  ];

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
                        <div className="float-right mb-3">
                        <button onClick={()=>alert('Export all data to excel file!')} className="btn btn-secondary"><i className="fas fa-download"></i> EXPORT</button>{' '}
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
                                  <select class="form-control" id="sel1">
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
                                  <select class="form-control" id="sel1">
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
                                  <select class="form-control" id="sel1">
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
                                  <select class="form-control" id="sel1">
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
                                  <select class="form-control" id="sel1">
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
                                  <select class="form-control" id="sel1">
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
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Employee ID</th>
                          <th>Employee Name</th>
                          <th>Company</th>
                          <th>Division</th>
                          <th>Section</th>
                          <th>Status</th>
                          <th>Created At</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((payment) => {
                          return (
                            <tr key={payment.id}>
                              <td>{payment.id}</td>
                              <td>{payment.emp_id}</td>
                              <td>{payment.emp_name}</td>
                              <td>{payment.company}</td>
                              <td>{payment.division}</td>
                              <td>{payment.section}</td>
                              <td>{payment.status}</td>
                              <td>{payment.created_at}</td>
                              <td>
                                <button className="btn btn-info">VIEW</button>{' '}
                                <button className="btn btn-primary">EDIT</button>{' '}
                                <button className="btn btn-danger">DELETE</button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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
