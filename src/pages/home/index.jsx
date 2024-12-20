import React, { useState, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

export default function Home() {
  const [pettycashs, setPettyCash] = useState(0);
  const [createDoc, setCreateDoc] = useState(0);
  const [inprogress, setInprogress] = useState(0);
  const [approverd, setApproved] = useState(0);
  const [rejected, setRejected] = useState(0);

  const profile = useAuthUser();

  const getData = async () => {
    await axios
      .get(import.meta.env.VITE_API_KEY + "/api/petty-cash")
      .then((res) => {
        if (profile().rule === "USER") {
          const detpFilter = res.data.data.filter(
            (f) => f.dept === profile().dept
          );

          const status0 = detpFilter.filter(
            (ap) => ap.status === "จัดทำเอกสาร"
          );

          const status1 = detpFilter.filter(
            (ap) => ap.status === "รอสั่งจ่ายเงิน"
          );

          const status2 = detpFilter.filter(
            (ap) => ap.status === "จ่ายเงินสำเร็จ"
          );

          const status3 = detpFilter.filter(
            (ap) => ap.status === "ยกเลิกเอกสาร"
          );
          setPettyCash(detpFilter.length);
          setCreateDoc(status0.length)
          setInprogress(status1.length);
          setApproved(status2.length);
          setRejected(status3.length);
        } else {
          const noFilter = res.data.data;

          const status0 = noFilter.filter(
            (ap) => ap.status === "จัดทำเอกสาร"
          );

          const status1 = noFilter.filter(
            (ap) => ap.status === "รอสั่งจ่ายเงิน"
          );

          const status2 = noFilter.filter(
            (ap) => ap.status === "จ่ายเงินสำเร็จ"
          );

          const status3 = noFilter.filter((ap) => ap.status === "ยกเลิกเอกสาร");
          setPettyCash(noFilter.length);
          setCreateDoc(status0.length)
          setInprogress(status1.length);
          setApproved(status2.length);
          setRejected(status3.length);
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">DASHBOARD</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a className="breadcrumb-item active">DASHBOARD</a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            {/* <div className="col-lg-2">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{pettycashs}</h3>
                  <p>เงินสดย่อย ทั้งหมด</p>
                </div>
                <div className="icon">
                  <i className="fab fa-bitcoin"></i>
                </div>
                <a href="#" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div> */}
            <div className="col-lg-3">
              <div className="small-box bg-warning">
                <div className="inner text-white">
                  <h3>{createDoc}</h3>
                  <p>จัดทำเอกสาร</p>
                </div>
                <div className="icon">
                  <i className="fas fa-user-edit"></i>
                </div>
                <a href="#" className="small-box-footer">
                  <span className="text-white">More info</span> <i className="fas fa-arrow-circle-right text-white"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="small-box bg-primary">
                <div className="inner">
                  <h3>{inprogress}</h3>
                  <p>รอสั่งจ่ายเงิน</p>
                </div>
                <div className="icon">
                  <i className="fas fa-clock"></i>
                </div>
                <a href="#" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{approverd}</h3>
                  <p>จ่ายเงินสำเร็จ</p>
                </div>
                <div className="icon">
                  <i className="fas fa-piggy-bank"></i>
                </div>
                <a href="#" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{rejected}</h3>
                  <p>ยกเลิกเอกสาร</p>
                </div>
                <div className="icon">
                  <i className="fas fa-exclamation-circle"></i>
                </div>
                <a href="#" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
