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
                <h1 className="m-0">เพิ่มเอกสารเงินสดย่อย</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Petty cash list</li>
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
                              <label htmlFor="">รหัสเอกสาร</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="กรุณาเพิ่มข้อมูล"
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
                              <label htmlFor="">รหัสพนักงาน</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="กรุณาเพิ่มข้อมูล"
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
                              <label htmlFor="">จ่ายเงินให้</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="กรุณาเพิ่มข้อมูล"
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
                              <label htmlFor="">หน่วยงาน</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="กรุณาเพิ่มข้อมูล"
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
                              <label htmlFor="">ส่วนงาน</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="กรุณาเพิ่มข้อมูล"
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
                              <label htmlFor="">ฝ่ายงาน</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="กรุณาเพิ่มข้อมูล"
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
                              <label htmlFor="">ชื่อบริษัท</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="กรุณาเพิ่มข้อมูล"
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
                              <label htmlFor="">จัดทำโดย</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="กรุณาเพิ่มข้อมูล"
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
                              <label htmlFor="">อัพโหลด</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="กรุณาเพิ่มข้อมูล"
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
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="">ประเภทวงเงิน</label><br/>
                              <select 
                              className="form-control"
                              {...register("credit_type", {
                                required: true,
                              })}
                              >
                                <option value="">กรุณาเลือกข้อมูล</option>
                                <option value="1">ในวงเงินงบประมาณ</option>
                                <option value="2">นอกวงเงินงบประมาณ</option>
                                <option value="3">เกินเงินงบประมาณ</option>
                              </select>
                              {errors.credit_type && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="">ชื่อโครงการ</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="กรุณาเพิ่มข้อมูล"
                                {...register("project", {
                                  required: true,
                                })}
                              />
                              {errors.project && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="">ชื่อสินค้า</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="กรุณาเพิ่มข้อมูล"
                                {...register("product", {
                                  required: true,
                                })}
                              />
                              {errors.product && (
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
                                  <label htmlFor="">รหัสบัญชี</label>
                                  <input
                                    name="invoice"
                                    type="text"
                                    className="form-control"
                                    placeholder="กรุณาเพิ่มข้อมูล"
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
                                  <label htmlFor="">รหัสใบแจ้งหนี้</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="กรุณาเพิ่มข้อมูล"
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
                                  <label htmlFor="">จ่ายภาษี (%)</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="กรุณาเพิ่มข้อมูล"
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
                                  <label htmlFor="">ประเภทการจ่ายเงิน</label>
                                  <select 
                                  className="form-control"
                                  {...register(`test.${index}.pay_type`, {
                                    required: true,
                                  })}
                                  >
                                    <option value="">Please Select</option>
                                    <option value="ค่าเดินทาง">ค่าเดินทาง</option>
                                    <option value="ค่าทางด่วน">ค่าทางด่วน</option>
                                    <option value="ค่าเบี้ยเลี้ยง">ค่าเบี้ยเลี้ยง</option>
                                    <option value="ค่าปรับ">ค่าปรับ</option>
                                    <option value="ค่ารับรอง">ค่ารับรอง</option>
                                    <option value="วัสดุสิ้นเปลือง">วัสดุสิ้นเปลือง</option>
                                    <option value="ค่าโทรศัพท์">ค่าโทรศัพท์</option>
                                    <option value="เบ็ดเตล็ด">เบ็ดเตล็ด</option>
                                  </select>
                                  {errors.test && (
                                    <span className="text-danger">
                                      This field is required
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">รายละเอียด</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="กรุณาเพิ่มข้อมูล"
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
                                  <label htmlFor="">จำนวนเงิน</label>
                                  <input
                                    name="amount"
                                    type="number"
                                    className="form-control"
                                    placeholder="กรุณาเพิ่มข้อมูล"
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
                        className="btn btn-secondary btn-xs"
                        onClick={() =>
                          append({
                            acc_id:"",
                            invoice_id: "",
                            pay_vat: "",
                            pay_type: "",
                            description: "",
                            amount: "",
                            total: "",
                          })
                        }
                      >
                        <i className="fa fa-plus"></i>
                      </button>{" "}
                      <button
                        className="btn btn-secondary btn-xs"
                        onClick={() =>
                          remove({
                            acc_id:"",
                            invoice_id: "",
                            pay_vat: "",
                            pay_type: "",
                            description: "",
                            amount: "",
                            total: "",
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
                        <i className="fas fa-save"></i> ยืนยัน
                      </button>{" "}
                      <Link to={"/pettycash"} className="btn btn-danger">
                        <i className="fas fa-arrow-circle-left"></i> ยกเลิก
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
