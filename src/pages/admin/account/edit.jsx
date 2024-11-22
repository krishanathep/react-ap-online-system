import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import { Link, useNavigate, useParams } from "react-router-dom";

const ACCUpdate = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      test: [{}],
    },
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const { fields } = useFieldArray({
    control,
    name: "test",
  });

  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [account, setAccount] = useState([]);
  const [costCenter, setCostCenter] = useState([]);
  const [project, setProject] = useState([]);
  const [product, setProduct] = useState([]);
  const [boi, setBoi] = useState([]);
  const [interCompany, setInterCompany] = useState([]);
  const [reserve, setReserve] = useState([]);

  const getData = async () => {
    await axios
      .get(
        import.meta.env.VITE_API_KEY +"/api/petty-cash/" + id
      )
      .then((res) => {
        reset({
          petty_cash_id: res.data.data.petty_cash_id,
          emp_id: res.data.data.emp_id,
          pay_to: res.data.data.pay_to,
          section: res.data.data.section,
          division: res.data.data.division,
          dept: res.data.data.dept,
          company: res.data.data.company,
          req_by: res.data.data.req_by,
          files: res.data.data.files,
          credit_type: res.data.data.credit_type,
          project: res.data.data.project,
          product: res.data.data.product,
          test: res.data.data.pay_list.map((pay) => ({
            id: pay.id,
            acc_id: pay.acc_id,
            invoice_id: pay.invoice_id,
            pay_vat: pay.pay_vat,
            pay_type: pay.pay_type,
            description: pay.description,
            amount: pay.amount,
          })),
        });
      });
  };

  const [id_1, setID_1] = useState('000')
  const [id_2, setID_2] = useState('00')
  const [id_3, setID_3] = useState('0000000')
  const [id_4, setID_4] = useState('0000000')
  const [id_5, setID_5] = useState('000000000000')
  const [id_6, setID_6] = useState('0000')
  const [id_7, setID_7] = useState('0000')
  const [id_8, setID_8] = useState('0000')
  const [id_9, setID_9] = useState('00')

  const acc_id =
    id_1 +
    "-" +
    id_2 +
    "-" +
    id_3 +
    "-" +
    id_4 +
    "-" +
    id_5 +
    "-" +
    id_6 +
    "-" +
    id_7 +
    "-" +
    id_8 +
    "-" +
    id_9;

    const companyFilter = (key) => {
      setID_1(key.value)
    }
  
    const branchFilter = (key) => {
      setID_2(key.value)
    }
  
    const accountFilter = (key) => {
      setID_3(key.value)
    }
  
    const costCenterFilter = (key) => {
      setID_4(key.value)
    }
  
    const projectFilter = (key) => {
      setID_5(key.value)
    }
  
    const productFilter = (key) => {
      setID_6(key.value)
    }
  
    const boiFilter = (key) => {
      setID_7(key.value)
    }
  
    const interCompanyFilter = (key) => {
      setID_8(key.value)
    }
  
    const reserveFilter = (key) => {
      setID_9(key.value)
    }

    const getCompany = async () => {
      await axios
        .get(import.meta.env.VITE_API_KEY +"/api/company")
        .then((res) => {
          const data = res.data.company;
          const formattedOptions = data.map((item) => ({
            value: item.COMPANY_NO, // กำหนด value ที่จะเก็บใน selectedOption
            label: item.COMPANY_NO+" : "+item.COMPANY_NAME, // กำหนด label ที่จะแสดงใน dropdown
          }));
          setCompany(formattedOptions);
        });
    };
  
    const getBranch = async () => {
      await axios
        .get(import.meta.env.VITE_API_KEY +"/api/branch")
        .then((res) => {
          const data = res.data.branch;
          const formattedOptions = data.map((item) => ({
            value: item.COMPANY_NO, // กำหนด value ที่จะเก็บใน selectedOption
            label: item.COMPANY_NO+ " : "+item.COMPANY_NAME, // กำหนด label ที่จะแสดงใน dropdown
          }));
          setBranch(formattedOptions);
        });
    };
  
    const getAccount = async () => {
      await axios
        .get(import.meta.env.VITE_API_KEY +"/api/account")
        .then((res) => {
          const data = res.data.account;
          const formattedOptions = data.map((item) => ({
            value: item.ACCOUNT_NO, // กำหนด value ที่จะเก็บใน selectedOption
            label: item.ACCOUNT_NO+" : "+item.ACCOUNT_NAME, // กำหนด label ที่จะแสดงใน dropdown
          }));
          setAccount(formattedOptions);
        });
    };
  
    const getCostCenter = async () => {
      await axios
        .get(import.meta.env.VITE_API_KEY +"/api/cost-center")
        .then((res) => {
          const data = res.data.cost_center;
          const formattedOptions = data.map((item) => ({
            value: item.COST_CENTER_NO, // กำหนด value ที่จะเก็บใน selectedOption
            label: item.COST_CENTER_NO+" : "+item.COST_CENTER_NAME, // กำหนด label ที่จะแสดงใน dropdown
          }));
          setCostCenter(formattedOptions);
        });
    };
  
    const getProject = async () => {
      await axios
        .get(import.meta.env.VITE_API_KEY +"/api/project")
        .then((res) => {
          const data = res.data.project;
          const formattedOptions = data.map((item) => ({
            value: item.PROJECT_NO, // กำหนด value ที่จะเก็บใน selectedOption
            label: item.PROJECT_NO+" : "+item.PROJECT_NAME, // กำหนด label ที่จะแสดงใน dropdown
          }));
          setProject(formattedOptions);
        });
    };
  
    const getProduct = async () => {
      await axios
        .get(import.meta.env.VITE_API_KEY +"/api/product")
        .then((res) => {
          const data = res.data.product;
          const formattedOptions = data.map((item) => ({
            value: item.PRODUCT_NO, // กำหนด value ที่จะเก็บใน selectedOption
            label: item.PRODUCT_NO+" : "+item.PRODUCT_NAME, // กำหนด label ที่จะแสดงใน dropdown
          }));
          setProduct(formattedOptions);
        });
    };
  
    const getBoi = async () => {
      await axios
        .get(import.meta.env.VITE_API_KEY +"/api/boi")
        .then((res) => {
          const data = res.data.boi;
          const formattedOptions = data.map((item) => ({
            value: item.BOI_NO, // กำหนด value ที่จะเก็บใน selectedOption
            label: item.BOI_NO+" : "+item.BOI_NAME, // กำหนด label ที่จะแสดงใน dropdown
          }));
          setBoi(formattedOptions);
        });
    };
  
  
    const getInterComPany = async () => {
      await axios
        .get(import.meta.env.VITE_API_KEY +"/api/inter-company")
        .then((res) => {
          const data = res.data.inter_company;
          const formattedOptions = data.map((item) => ({
            value: item.INTER_COMPANY_NO, // กำหนด value ที่จะเก็บใน selectedOption
            label: item.INTER_COMPANY_NO+" : "+item.INTER_COMPANY_NAME, // กำหนด label ที่จะแสดงใน dropdown
          }));
          setInterCompany(formattedOptions);
        });
    };
  
  
    const getReserve = async () => {
      await axios
        .get(import.meta.env.VITE_API_KEY +"/api/reserve")
        .then((res) => {
          const data = res.data.reserve;
          const formattedOptions = data.map((item) => ({
            value: item.RESERVE_NO, // กำหนด value ที่จะเก็บใน selectedOption
            label: item.RESERVE_NO+" : "+item.RESERVE_NAME, // กำหนด label ที่จะแสดงใน dropdown
          }));
          setReserve(formattedOptions);
        });
    };

  const handlUpdateSubmit = async (data) => {
    //alert(JSON.stringify(data));
    const formData = new FormData();

    formData.append("_method", "put");
    formData.append("files", data.files[0]);
    formData.append("petty_cash_id", data.petty_cash_id);
    formData.append("emp_id", data.emp_id);
    formData.append("pay_to", data.pay_to);
    formData.append("status", data.status);
    formData.append("section", data.section);
    formData.append("division", data.division);
    formData.append("dept", data.dept);
    formData.append("company", data.company);
    formData.append("req_by", data.req_by);
    formData.append("credit_type", data.credit_type);
    formData.append("project", data.project);
    formData.append("product", data.product);

    data.test.forEach((item, index) => {
      formData.append(`test[${index}][id]`, item.id);
      formData.append(`test[${index}][acc_id]`, item.acc_id);
      formData.append(`test[${index}][invoice_id]`, item.invoice_id);
      formData.append(`test[${index}][pay_vat]`, item.pay_vat);
      formData.append(`test[${index}][pay_type]`, item.pay_type);
      formData.append(`test[${index}][description]`, item.description);
      formData.append(`test[${index}][amount]`, item.amount);
    });

    try {
      await axios
        .post(
          import.meta.env.VITE_API_KEY +"/api/petty-cash-update/" +
            id,
            formData
        )
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Your Petty cash has been updated",
            showConfirmButton: false,
            timer: 2000,
          });
          console.log(res)
          navigate("/admin/account");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getCompany();
    getBranch();
    getAccount();
    getCostCenter();
    getProduct();
    getProject();
    getBoi();
    getInterComPany();
    getReserve();
  }, []);

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">PETTY CASH UPDATE</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">DASHBOARD</a>
                  </li>
                  <li className="breadcrumb-item active">PETTY CASH LIST</li>
                  <li className="breadcrumb-item active">UPDATE</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="card shadow-none border">
                      <div className="card-body">
                        <div className="card shadow-none border">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">เลขที่เอกสาร</label>
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
                                    onChange={(event) =>
                                      dataFilter(event.target.value)
                                    }
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
                                  <label htmlFor="">ชื่อพนักงาน</label>
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
                                  <label htmlFor="">ผู้ที่ขอเบิก</label>
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
                              <label htmlFor="">ประเภทงบประมาณ</label>
                              <select 
                                className="form-control"
                                {...register("credit_type", {
                                  required: true,
                                })}
                                >
                                <option value="">Please Select</option>
                                <option value="1">ในวงเงินงบประมาณ</option>
                                <option value="2">นอกงบประมาณ</option>
                                <option value="3">เกินงบประมาณ</option>
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
                                  <label htmlFor="">อัพโหลด</label>
                                  <br />
                                  <div>
                                    <input
                                      type="file"
                                      name="file"
                                      accept=".pdf"
                                      {...register("files", {
                                        required: false,
                                      })}
                                    />
                                  </div>
                                  <br />
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
                        <div className="card shadow-none border">
                          <div className="card-body">
                          <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="">COMPANY</label>
                              <Select
                                options={company}
                                onChange={companyFilter}
                                placeholder="กรุณาเลือกข้อมูล"
                                isClearable={true}
                              />  
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="">BRANCH</label>
                              <Select
                                options={branch}
                                onChange={branchFilter}
                                placeholder="กรุณาเลือกข้อมูล"
                                isClearable={true}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="">ACCOUNT</label>
                              <Select
                                options={account}
                                onChange={accountFilter}
                                placeholder="กรุณาเลือกข้อมูล"
                                isClearable={true}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="">COSTCENTER</label>
                              <Select
                                options={costCenter}
                                onChange={costCenterFilter}
                                placeholder="กรุณาเลือกข้อมูล"
                                isClearable={true}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="">PROJECT</label>
                              <Select
                                options={project}
                                onChange={projectFilter}
                                placeholder="กรุณาเลือกข้อมูล"
                                isClearable={true}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="">PRODUCT</label>
                              <Select
                                options={product}
                                onChange={productFilter}
                                placeholder="กรุณาเลือกข้อมูล"
                                isClearable={true}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="">BOI</label>
                              <Select
                                options={boi}
                                onChange={boiFilter}
                                placeholder="กรุณาเลือกข้อมูล"
                                isClearable={true}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="">INTER COMPANY</label>
                              <Select
                                options={interCompany}
                                onChange={interCompanyFilter}
                                placeholder="กรุณาเลือกข้อมูล"
                                isClearable={true}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="">RESERVE</label>
                              <Select
                                options={reserve}
                                onChange={reserveFilter}
                                placeholder="กรุณาเลือกข้อมูล"
                                isClearable={true}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <label htmlFor="">GENERATE ID</label><br/>
                            <span className="text-success">{acc_id}</span>
                          </div>
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
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="">ACCOUNT ID</label>
                                  <input
                                    name="invoice"
                                    type="text"
                                    className="form-control"
                                    placeholder="COPPY FROM GENERATE ID"
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
                              <div className="col-md-1">
                                <div className="form-group">
                                  <label htmlFor="">ใบแจ้งหนี้</label>
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
                              <div className="col-md-1">
                                <div className="form-group">
                                  <label htmlFor="">ภาษี (%)</label>
                                  <input
                                    type="number"
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
                                  <label htmlFor="">ประเภทการจ่าย</label>
                                  <select
                                    className="form-control"
                                    {...register(`test.${index}.pay_type`, {
                                      required: true,
                                    })}
                                  >
                                    <option value="">Please Select</option>
                                    <option value="ค่าเดินทาง">
                                      ค่าเดินทาง
                                    </option>
                                    <option value="ค่าทางด่วน">
                                      ค่าทางด่วน
                                    </option>
                                    <option value="ค่าเบี้ยเลี้ยง">
                                      ค่าเบี้ยเลี้ยง
                                    </option>
                                    <option value="ค่าปรับ">ค่าปรับ</option>
                                    <option value="ค่ารับรอง">ค่ารับรอง</option>
                                    <option value="วัสดุสิ้นเปลือง">
                                      วัสดุสิ้นเปลือง
                                    </option>
                                    <option value="ค่าโทรศัพท์">
                                      ค่าโทรศัพท์
                                    </option>
                                    <option value="เบ็ดเตล็ด">เบ็ดเตล็ด</option>
                                  </select>
                                  {errors.test && (
                                    <span className="text-danger">
                                      This field is required
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="form-group">
                                  <label htmlFor="">รายละเอียด</label>
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
                              <div className="col-md-1">
                                <div className="form-group">
                                  <label htmlFor="">จำนวนเงิน</label>
                                  <input
                                    name="amount"
                                    type="number"
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
                    <div className="float-right">
                      <button
                        onClick={handleSubmit(handlUpdateSubmit)}
                        className="btn btn-primary"
                      >
                        <i className="fas fa-save"></i> ยืนยัน
                      </button>{" "}
                      <Link to={"/admin/account"} className="btn btn-danger">
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

export default ACCUpdate;
