import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import Swal from "sweetalert2";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { use } from "react";

const Create = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      test: [{}],
    },
  });

  const navigate = useNavigate();
  const userdetail = useAuthUser();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  const [latestId, setLatestId] = useState(null);
  const [generatedCode, setGeneratedCode] = useState("");

  const [options, setOptions] = useState([]);
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [account, setAccount] = useState([]);
  const [costCenter, setCostCenter] = useState([]);
  const [project, setProject] = useState([]);
  const [product, setProduct] = useState([]);
  const [boi, setBoi] = useState([]);
  const [interCompany, setInterCompany] = useState([]);
  const [reserve, setReserve] = useState([]);
  const [combination, setCombination] = useState('')
  const [account_id, setAccountID] = useState('')

  const [id_1, setID_1] = useState("000");
  const [id_2, setID_2] = useState("00");
  const [id_3, setID_3] = useState("0000000");
  const [id_4, setID_4] = useState("0000000");
  const [id_5, setID_5] = useState("000000000000");
  const [id_6, setID_6] = useState("0000");
  const [id_7, setID_7] = useState("0000");
  const [id_8, setID_8] = useState("0000");
  const [id_9, setID_9] = useState("00");

  const acc_id_gen =
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
    setID_1(key.value);
  };

  const branchFilter = (key) => {
    setID_2(key.value);
  };

  const accountFilter = (key) => {
    setID_3(key.value);
  };

  const costCenterFilter = (key) => {
    setID_4(key.value);
  };

  const projectFilter = (key) => {
    setID_5(key.value);
  };

  const productFilter = (key) => {
    setID_6(key.value);
  };

  const boiFilter = (key) => {
    setID_7(key.value);
  };

  const interCompanyFilter = (key) => {
    setID_8(key.value);
  };

  const reserveFilter = (key) => {
    setID_9(key.value);
  };

  const handleChange = async (selectedOption) => {
    await axios
      .get("http://129.200.6.52/laravel_auth_jwt_api_hrd/public/api/employees")
      .then((res) => {
        res.data.employees
          .filter((e) => e.emp_id === selectedOption.value)
          .map((i) =>
            reset({
              emp_id: i.emp_id,
              pay_to: i.emp_name,
              section: i.agency,
              division: i.department,
              dept: i.dept,
              company: i.company,
            })
          );
      });
  };

  const combinationFilter = async (key,index) => {
    console.log(key);
    await axios
      .get(
        "http://129.200.6.52/laravel_oracle11g_prod_api/public/api/oracle/combinations"
      )
      .then((res) => {
        const matchedCombinations = res.data.combinations.filter(
          (c) => c.cod_combination === key
        );

        if (matchedCombinations.length > 0) {
          matchedCombinations.forEach((i) => {
            console.log(i.code_combination_id); // Log the found code_combination_id
            setCombination(i.code_combination_id)
          });
        } else {
          console.log("ไม่มีข้อมูล"); // Log "no data" if no match
          setCombination('NO DATA')
        }
        setAccountID(key)
      });
  };

  const getCompany = async () => {
    await axios
      .get(
        "http://129.200.6.52/laravel_oracle11g_prod_api/public/api/oracle/companies"
      )
      .then((res) => {
        const data = res.data.companies;
        const formattedOptions = data.map((item) => ({
          value: item.company_no, // กำหนด value ที่จะเก็บใน selectedOption
          label: item.company_no + " : " + item.company_name, // กำหนด label ที่จะแสดงใน dropdown
        }));
        setCompany(formattedOptions);
      });
  };

  const getBranch = async () => {
    await axios
      .get(
        "http://129.200.6.52/laravel_oracle11g_prod_api/public/api/oracle/branchs"
      )
      .then((res) => {
        const data = res.data.branchs;
        const formattedOptions = data.map((item) => ({
          value: item.branch_no, // กำหนด value ที่จะเก็บใน selectedOption
          label: item.branch_no + " : " + item.branch_name, // กำหนด label ที่จะแสดงใน dropdown
        }));
        setBranch(formattedOptions);
      });
  };

  const getAccount = async () => {
    await axios
      .get(
        "http://129.200.6.52/laravel_oracle11g_prod_api/public/api/oracle/accounts"
      )
      .then((res) => {
        const data = res.data.accounts;
        const formattedOptions = data.map((item) => ({
          value: item.account_no, // กำหนด value ที่จะเก็บใน selectedOption
          label: item.account_no + " : " + item.account_name, // กำหนด label ที่จะแสดงใน dropdown
        }));
        setAccount(formattedOptions);
      });
  };

  const getCostCenter = async () => {
    await axios
      .get(
        "http://129.200.6.52/laravel_oracle11g_prod_api/public/api/oracle/cost-centers"
      )
      .then((res) => {
        const data = res.data.cost_centers;
        const formattedOptions = data.map((item) => ({
          value: item.cost_center_no, // กำหนด value ที่จะเก็บใน selectedOption
          label: item.cost_center_no + " : " + item.cost_center_name, // กำหนด label ที่จะแสดงใน dropdown
        }));
        setCostCenter(formattedOptions);
      });
  };

  const getProject = async () => {
    await axios
      .get(
        "http://129.200.6.52/laravel_oracle11g_prod_api/public/api/oracle/projects"
      )
      .then((res) => {
        const data = res.data.projects;
        const formattedOptions = data.map((item) => ({
          value: item.project_no, // กำหนด value ที่จะเก็บใน selectedOption
          label: item.project_no + " : " + item.project_name, // กำหนด label ที่จะแสดงใน dropdown
        }));
        setProject(formattedOptions);
      });
  };

  const getProduct = async () => {
    await axios
      .get(
        "http://129.200.6.52/laravel_oracle11g_prod_api/public/api/oracle/products"
      )
      .then((res) => {
        const data = res.data.products;
        const formattedOptions = data.map((item) => ({
          value: item.product_no, // กำหนด value ที่จะเก็บใน selectedOption
          label: item.product_no + " : " + item.product_name, // กำหนด label ที่จะแสดงใน dropdown
        }));
        setProduct(formattedOptions);
      });
  };

  const getBoi = async () => {
    await axios
      .get(
        "http://129.200.6.52/laravel_oracle11g_prod_api/public/api/oracle/bois"
      )
      .then((res) => {
        const data = res.data.bois;
        const formattedOptions = data.map((item) => ({
          value: item.boi_no, // กำหนด value ที่จะเก็บใน selectedOption
          label: item.boi_no + " : " + item.boi_name, // กำหนด label ที่จะแสดงใน dropdown
        }));
        setBoi(formattedOptions);
      });
  };

  const getInterComPany = async () => {
    await axios
      .get(
        "http://129.200.6.52/laravel_oracle11g_prod_api/public/api/oracle/inter-companies"
      )
      .then((res) => {
        const data = res.data.inter_companies;
        const formattedOptions = data.map((item) => ({
          value: item.inter_company_no, // กำหนด value ที่จะเก็บใน selectedOption
          label: item.inter_company_no + " : " + item.inter_company_name, // กำหนด label ที่จะแสดงใน dropdown
        }));
        setInterCompany(formattedOptions);
      });
  };

  const getReserve = async () => {
    await axios
      .get(
        "http://129.200.6.52/laravel_oracle11g_prod_api/public/api/oracle/reserves"
      )
      .then((res) => {
        const data = res.data.reserves;
        const formattedOptions = data.map((item) => ({
          value: item.reserve_no, // กำหนด value ที่จะเก็บใน selectedOption
          label: item.reserve_no + " : " + item.reserve_name, // กำหนด label ที่จะแสดงใน dropdown
        }));
        setReserve(formattedOptions);
      });
  };

  const getData = async () => {
    await axios
      .get("http://129.200.6.52/laravel_auth_jwt_api_hrd/public/api/employees")
      .then((res) => {
        const data = res.data.employees.filter(
          (e) => e.dept === userdetail().dept
        );
        const formattedOptions = data.map((item) => ({
          value: item.emp_id, // กำหนด value ที่จะเก็บใน selectedOption
          label: item.emp_id, // กำหนด label ที่จะแสดงใน dropdown
        }));
        setOptions(formattedOptions);
      });
  };

  const getLastId = () => {
    axios.get(import.meta.env.VITE_API_KEY + "/api/get-last-id").then((res) => {
      res.data.last_id;
      console.log(res.data.last_id);
      setLatestId(res.data.last_id);
    });
  };

  useEffect(() => {
    if (latestId !== null) {
      // ดึงปีปัจจุบัน
      const currentYear = new Date().getFullYear();

      const formattedId = latestId.toString().padStart(3, "0");

      // สร้างรหัสโดยมีโครงสร้าง ปี + "00" + ID ล่าสุด
      const code = `${currentYear}00${formattedId}`;
      setGeneratedCode(code);
    }
  }, [latestId]);

  const getAllSections = () => {
    getCompany();
    getBranch();
    getAccount();
    getCostCenter();
    getProduct();
    getProject();
    getBoi();
    getInterComPany();
    getReserve();
  };

  useEffect(() => {
    getData();
    getAllSections();
    getLastId();
  }, []);

  const handleCreateSubmit = async (data) => {
    const formData = new FormData();

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
      formData.append(`test[${index}][acc_id]`, item.acc_id);
      formData.append(`test[${index}][invoice_id]`, item.invoice_id);
      formData.append(`test[${index}][pay_vat]`, item.pay_vat);
      formData.append(`test[${index}][pay_type]`, item.pay_type);
      formData.append(`test[${index}][description]`, item.description);
      formData.append(`test[${index}][amount]`, item.amount);
    });

    try {
      await axios
        .post(import.meta.env.VITE_API_KEY + "/api/petty-cash-create", formData)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Your Petty cash has been created",
            showConfirmButton: false,
            timer: 2000,
          });

          navigate("/pettycash");
          console.log(res);
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
                <h1 className="m-0">PETTY CASH CREATE</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item">PETTY CASH LIST</li>
                  <li className="breadcrumb-item active">CREATE</li>
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
                        <div className="row">
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="">เลขที่เอกสาร</label>
                              <input
                                value={generatedCode}
                                type="text"
                                className="form-control"
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
                              <Select
                                options={options}
                                onChange={handleChange}
                                placeholder="กรุณาเลือกข้อมูล"
                                isClearable={true}
                              />
                              <input
                                hidden
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
                                value={userdetail().name}
                                type="text"
                                className="form-control"
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
                                <option value="">กรุณาเลือกข้อมูล</option>
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
                            <label htmlFor="">GENERATE ID</label>
                            <br />
                            <span className="text-success">{acc_id_gen}</span>
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
                                    type="text"
                                    className="form-control"
                                    onChange={(event) =>
                                      combinationFilter(event.target.value)
                                    }
                                    placeholder="PLEASE COPY BY GENERATE ID"
                                  />
                                  <input type="text" value={account_id} className="form-control" hidden
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
                                <label htmlFor="">COM ID</label>
                                <input
                                  type="text"
                                  size={1}
                                  value={combination}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-1">
                                <div className="form-group">
                                  <label htmlFor="">ใบแจ้งหนี้</label>
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
                              <div className="col-md-1">
                                <div className="form-group">
                                  <label htmlFor="">ภาษี (%)</label>
                                  <select
                                    type="number"
                                    className="form-control"
                                    placeholder="กรุณาเพิ่มข้อมูล"
                                    {...register(`test.${index}.pay_vat`, {
                                      required: true,
                                    })}
                                  >
                                    <option value="">เลือกข้อมูล</option>
                                    <option value="0">ไม่มี</option>
                                    <option value="7">มี</option>
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
                                  <label htmlFor="">ประเภทการจ่ายเงิน</label>
                                  <select
                                    className="form-control"
                                    {...register(`test.${index}.pay_type`, {
                                      required: true,
                                    })}
                                  >
                                    <option value="">กรุณาเลือกข้อมูล</option>
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
                              <div className="col-md-1">
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
                        className="btn btn-secondary btn-sm"
                        onClick={() =>
                          append({
                            acc_id: "",
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
                        className="btn btn-secondary btn-sm"
                        onClick={() =>
                          remove({
                            acc_id: "",
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
                        disabled={combination==="NO DATA" || combination===""}
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
