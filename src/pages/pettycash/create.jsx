import React, { useState } from "react";
import { Link } from "react-router-dom";

const Create = () => {
  const [inputFields, setInputFields] = useState([
    {
      id: "",
      invoice: "",
      created_at: "",
      amount: "",
      vat: "",
      type: "",
      decription: "",
    },
  ]);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    let newfield = { invoice: "", amount: "" };
    setInputFields([...inputFields, newfield]);
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Petty cash create</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Petty cash</li>
                  <li className="breadcrumb-item active">Create</li>
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
                    <div className="card shadow-none border">
                      <div className="card-body">
                        <form>
                          <div className="row">
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
                                <label htmlFor="">Branch</label>
                                <select class="form-control" id="sel1">
                                  <option>Please Select</option>
                                  <option>Branch 1</option>
                                  <option>Branch 2</option>
                                  <option>Branch 3</option>
                                  <option>Branch 4</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="form-group">
                                <label htmlFor="">Segment</label>
                                <select class="form-control" id="sel1">
                                  <option>Please Select</option>
                                  <option>Segment 1</option>
                                  <option>Segment 2</option>
                                  <option>Segment 3</option>
                                  <option>Segment 4</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="form-group">
                                <label htmlFor="">Cost Center</label>
                                <select class="form-control" id="sel1">
                                  <option>Please Select</option>
                                  <option>Cost Center 1</option>
                                  <option>Cost Center 2</option>
                                  <option>Cost Center 3</option>
                                  <option>Cost Center 4</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="form-group">
                                <label htmlFor="">Project</label>
                                <select class="form-control" id="sel1">
                                  <option>Please Select</option>
                                  <option>Project 1</option>
                                  <option>Project 2</option>
                                  <option>Project 3</option>
                                  <option>Project 4</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="form-group">
                                <label htmlFor="">Product</label>
                                <select class="form-control" id="sel1">
                                  <option>Please Select</option>
                                  <option>Product 1</option>
                                  <option>Product 2</option>
                                  <option>Product 3</option>
                                  <option>Product 4</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    {/* <form> */}
                    {inputFields.map((input, index) => {
                      return (
                        <div className="card shadow-none border">
                          <div className="card-body">
                            <div className="row" key={index}>
                              {/* <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">ID</label>
                                  <input
                                    name="id"
                                    type="text"
                                    value={input.id}
                                    onChange={(event) =>
                                      handleFormChange(index, event)
                                    }
                                    className="form-control"
                                    placeholder="Please Enter"
                                  />
                                </div>
                              </div> */}
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">Invoice</label>
                                  <input
                                    name="invoice"
                                    type="text"
                                    value={input.invoice}
                                    onChange={(event) =>
                                      handleFormChange(index, event)
                                    }
                                    className="form-control"
                                    placeholder="Please Enter"
                                  />
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">Created At</label>
                                  <input
                                    name="created_at"
                                    type="text"
                                    value={input.created_at}
                                    onChange={(event) =>
                                      handleFormChange(index, event)
                                    }
                                    className="form-control"
                                    placeholder="Please Enter"
                                  />
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">VAT</label>
                                  <input
                                    name="vat"
                                    type="text"
                                    value={input.vat}
                                    onChange={(event) =>
                                      handleFormChange(index, event)
                                    }
                                    className="form-control"
                                    placeholder="Please Enter"
                                  />
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">Type</label>
                                  <input
                                    name="type"
                                    type="text"
                                    value={input.type}
                                    onChange={(event) =>
                                      handleFormChange(index, event)
                                    }
                                    className="form-control"
                                    placeholder="Please Enter"
                                  />
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">Decription</label>
                                  <input
                                    name="decription"
                                    type="text"
                                    value={input.decription}
                                    onChange={(event) =>
                                      handleFormChange(index, event)
                                    }
                                    className="form-control"
                                    placeholder="Please Enter"
                                  />
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">Amount</label>
                                  <input
                                    name="amount"
                                    type="text"
                                    value={input.amount}
                                    className="form-control"
                                    onChange={(event) =>
                                      handleFormChange(index, event)
                                    }
                                    placeholder="Please Enter"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="col-md-12">
                      <div className="float-right">
                        <button className="btn btn-info" onClick={addFields}>
                          <i className="fa fa-plus"></i> ITEMS
                        </button>{" "}
                        <button className="btn btn-primary"><i className="fas fa-save"></i> SUBMIT</button>{" "}
                        <Link to={"/pettycash"} className="btn btn-danger">
                        <i className="fas fa-arrow-circle-left"></i>  CANCEL
                        </Link>{" "}
                      </div>
                    </div>
                    {/* </form> */}
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

export default Create;
