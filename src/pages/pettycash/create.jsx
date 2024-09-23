import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      test: [{}],
    },
  });

  const navigate = useNavigate();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  const handleCreateSubmit = async (data) => {
    //alert(JSON.stringify(data));

    try {
      await axios
        .post(
          "http://localhost/laravel_auth_jwt_api_afd/public/api/petty-cash-create",
          data
        )
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Your Petty cash has been created",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/pettycash");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Petty Cash Create</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Petty Cash List</li>
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
                        <div className="row">
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="">petty_cash_id</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Please Enter"
                                {...register("petty_cash_id", {
                                  required: true,
                                })}
                              />
                              {errors.petty_cash_id && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="">emp_id</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Please Enter"
                                {...register("emp_id", {
                                  required: true,
                                })}
                              />
                              {errors.emp_id && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="">pay_to</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Please Enter"
                                {...register("pay_to", {
                                  required: true,
                                })}
                              />
                              {errors.pay_to && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="">section</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Please Enter"
                                {...register("section", {
                                  required: true,
                                })}
                              />
                              {errors.section && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="">division</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Please Enter"
                                {...register("division", {
                                  required: true,
                                })}
                              />
                              {errors.division && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="">dept</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Please Enter"
                                {...register("dept", {
                                  required: true,
                                })}
                              />
                              {errors.dept && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="">company</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Please Enter"
                                {...register("company", {
                                  required: true,
                                })}
                              />
                              {errors.company && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="">req_by</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Please Enter"
                                {...register("req_by", {
                                  required: true,
                                })}
                              />
                              {errors.req_by && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="">files</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Please Enter"
                                {...register("files", {
                                  required: true,
                                })}
                              />
                              {errors.files && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    {fields.map((item, index) => {
                      return (
                        <div className="card shadow-none border" key={item.id}>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">Accout id</label>
                                  <input
                                    name="invoice"
                                    type="text"
                                    className="form-control"
                                    placeholder="Please Enter"
                                    {...register(`test.${index}.acc_id`, {
                                      required: true,
                                    })}
                                  />
                                  {errors.test && (
                                    <span className="text-danger">
                                      This field is required
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">Invoice id</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Please Enter"
                                    {...register(`test.${index}.invoice_id`, {
                                      required: true,
                                    })}
                                  />
                                  {errors.test && (
                                    <span className="text-danger">
                                      This field is required
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">VAT</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Please Enter"
                                    {...register(`test.${index}.pay_vat`, {
                                      required: true,
                                    })}
                                  />
                                  {errors.test && (
                                    <span className="text-danger">
                                      This field is required
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">Pay type</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Please Enter"
                                    {...register(`test.${index}.pay_type`, {
                                      required: true,
                                    })}
                                  />
                                  {errors.test && (
                                    <span className="text-danger">
                                      This field is required
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">Decription</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Please Enter"
                                    {...register(`test.${index}.description`, {
                                      required: true,
                                    })}
                                  />
                                  {errors.test && (
                                    <span className="text-danger">
                                      This field is required
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">Amount</label>
                                  <input
                                    name="amount"
                                    type="text"
                                    className="form-control"
                                    placeholder="Please Enter"
                                    {...register(`test.${index}.amount`, {
                                      required: true,
                                    })}
                                  />
                                  {errors.test && (
                                    <span className="text-danger">
                                      This field is required
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="float-left">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() =>
                          append({
                            emp_name: "",
                            cost_type: "",
                            job_type: "",
                            bus_stations: "",
                          })
                        }
                      >
                        <i className="fa fa-plus"></i>
                      </button>{" "}
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() =>
                          remove({
                            emp_name: "",
                            cost_type: "",
                            job_type: "",
                            bus_stations: "",
                          })
                        }
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                    </div>
                    <div className="float-right">
                      <button
                        onClick={handleSubmit(handleCreateSubmit)}
                        className="btn btn-primary"
                      >
                        <i className="fas fa-save"></i> SUBMIT
                      </button>{" "}
                      <Link to={"/pettycash"} className="btn btn-danger">
                        <i className="fas fa-arrow-circle-left"></i> CANCEL
                      </Link>{" "}
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

export default Create;
