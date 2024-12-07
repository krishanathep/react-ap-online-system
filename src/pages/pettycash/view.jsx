import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { convertThai } from "convert-thai";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import axios from "axios";

// นำเข้าฟอนต์ไทยสำหรับ PDF
import { KanitNomal } from "../../assets/fonts/Kanit-nomal.jsx";
import { KanitBold } from "../../assets/fonts/Kanit-bold.jsx";

const View = () => {
  const { id } = useParams();
  const [pettycash, setPettyCash] = useState([]);
  const [paylists, setPayLists] = useState([]);
  const [creddit, setCredit] = useState(0);

  const getData = async () => {
    await axios
      .get(import.meta.env.VITE_API_KEY + "/api/petty-cash/" + id)
      .then((res) => {
        setPettyCash(res.data.data);
        setPayLists(res.data.data.pay_list);
        setCredit(res.data.data.credit_type);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const exportPDF = () => {
    const doc = new jsPDF();

    // เพิ่มฟอนต์ไทยให้กับ PDF
    doc.addFileToVFS("Kanit-Regular.ttf", KanitNomal);
    doc.addFileToVFS("Kanit-Bold.ttf", KanitBold);
    doc.addFont("Kanit-Regular.ttf", "Kanit", "normal");
    doc.addFont("Kanit-Bold.ttf", "Kanit", "bold");

    // ตั้งค่าฟอนต์เริ่มต้น
    doc.setFont("Kanit", "normal");
    doc.setFontSize(16);

    // กำหนดชื่อหัวเอกสารตามค่า pettycash.company
    let companyName = "บริษัท ไทยรุ่งยูเนี่ยนคาร์ จำกัด (มหาชน)";
    if (pettycash.company === "TRT") {
      companyName = "บริษัท ไทยรุ่ง ทูลส์ แอนด์ จำกัด";
    } else if (pettycash.company === "TUC") {
      companyName = "บริษัท ไทยอัลติเมทคาร์ จำกัด";
    }

    // หัวเอกสาร
    doc.text(companyName, 105, 20, {
      align: "center",
    });

    doc.setFontSize(13);
    doc.text("ใบขอเบิกค่าใช้จ่าย / ใบเบิกเงินสดย่อย", 105, 30, {
      align: "center",
    });
    // ข้อมูลส่วนบน
    doc.setFontSize(14);
    const topData = [
      ["จ่ายเงินให้ : " + pettycash.pay_to, "หน่วยงาน : " + pettycash.section],
      ["ส่วนงาน : " + pettycash.division, "ฝ่ายงาน : " + pettycash.dept],
      [
        "เลขที่เอกสาร : " + pettycash.petty_cash_id,
        "วันที่ขอเบิก : " +
          dayjs(pettycash.created_at).locale("th").format("DD MMMM YYYY"),
      ],
      [
        "ผู้ที่ขอเบิก : " + pettycash.req_by,
        "ชื่อบริษัท : " + pettycash.company,
      ],
    ];

    autoTable(doc, {
      startY: 40,
      body: topData,
      theme: "plain",
      styles: {
        font: "Kanit",
        fontSize: 11,
      },
      columnStyles: {
        0: { cellWidth: 95 },
        1: { cellWidth: 95 },
      },
    });

    // ตารางรายการ
    const tableHeaders = [
      ["NO", "DESCRIPTION", "INVOICE", "VAT (%)", "AMOUNT"],
    ];

    const tableBody = paylists.map((pay, index) => [
      index + 1,
      `${pay.acc_id}\n${pettycash.pay_to} : ${pay.pay_type} : ${pay.description}`,
      pay.invoice_id,
      pay.pay_vat,
      pay.amount.toLocaleString("th-TH", { minimumFractionDigits: 2 }),
    ]);

    // เพิ่มแถวข้อมูลเพิ่มเติม (8 บรรทัด)
    for (let i = 0; i < 6; i++) {
      tableBody.push([]);
    }

    // เพิ่มแถวสรุป
    const totalAmount = parseFloat(pettycash.total).toFixed(2);
    tableBody.push([
      { content: convertThai.bathText(totalAmount), colSpan: 3 },
      "รวมเงิน",
      pettycash.total.toLocaleString("th-TH", { minimumFractionDigits: 2 }),
    ]);

    autoTable(doc, {
      head: tableHeaders,
      body: tableBody,
      startY: doc.lastAutoTable.finalY + 5,
      theme: "grid", // เปลี่ยนเป็น grid theme เพื่อแสดงเส้นขอบทั้งหมด
      styles: {
        font: "Kanit",
        fontSize: 10,
        lineColor: [80, 80, 80], // สีของเส้นขอบ
        lineWidth: 0.1, // ความหนาของเส้นขอบ
      },
      headStyles: {
        fillColor: [71, 71, 71],
        font: "Kanit",
        textColor: [0, 0, 0], // สีดำ
        halign: "center",
        fontSize: 10,
        fillColor: [220, 220, 220],
        lineColor: [80, 80, 80], // สีของเส้นขอบ
        lineWidth: 0.1, // ความหนาของเส้นขอบ
      },
      columnStyles: {
        0: { halign: "center", cellWidth: 10 },
        1: { cellWidth: 110 },
        2: { halign: "center", cellWidth: 20 },
        3: { halign: "center", cellWidth: 20 },
        4: { halign: "right", cellWidth: 20 },
      },
    });

    // ประเภทเครดิต
    doc.setFontSize(10);
    const creditText = [
      creddit === "1" ? "(X)" : "( )",
      " ในวงเงินงบประมาณ    ",
      creddit === "2" ? "(X)" : "( )",
      " นอกงบประมาณ    ",
      creddit === "3" ? "(X)" : "( )",
      " เกินงบประมาณ",
    ].join("");

    doc.text(creditText, 14, doc.lastAutoTable.finalY + 10);

    // เพิ่มพื้นที่สำหรับเซ็นลายเซ็น
    const signatureStartY = doc.lastAutoTable.finalY + 45;
    const signatureLabels = [
      "ผู้ขอเบิก",
      "ผู้อนุมัติ",
      "ผู้รับเงิน",
      "ผู้จ่ายเงิน",
    ];
    const signatureXStart = 30;
    const signatureSpacing = 50;

    signatureLabels.forEach((label, index) => {
      const x = signatureXStart + index * signatureSpacing;
      doc.text(label, x, signatureStartY - 5, { align: "center" });
      doc.line(x - 20, signatureStartY + 5, x + 20, signatureStartY + 5); // วาดเส้น
      doc.text("วันที่: _____________", x, signatureStartY + 15, {
        align: "center",
      }); // เพิ่มวันที่
    });

    // บันทึก PDF
    //doc.save(`เงินสดย่อย-${pettycash.petty_cash_id}.pdf`);

    const pdfUrl = doc.output("bloburl");
    window.open(pdfUrl, "_blank"); // เปิดในแท็บใหม่
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">รายละเอียดเงินสดย่อย</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">หน้าแรก</a>
                  </li>
                  <li className="breadcrumb-item active">รายการเงินสดย่อย</li>
                  <li className="breadcrumb-item active">ดูรายละเอียด</li>
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
                    <div className="col-md-12">
                      <div className="card shadow-none border">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4">
                              <b>เลขที่เอกสาร :</b> {pettycash.petty_cash_id}
                            </div>
                            <div className="col-md-4">
                              <b>รหัสพนักงาน :</b> {pettycash.emp_id}
                            </div>
                            <div className="col-md-4">
                              <b>ชื่อพนักงาน :</b> {pettycash.pay_to}
                            </div>
                            <div className="col-md-4">
                              <b>หน่วยงาน :</b> {pettycash.section}
                            </div>
                            <div className="col-md-4">
                              <b>ส่วนงาน :</b> {pettycash.division}
                            </div>
                            <div className="col-md-4">
                              <b>ฝ่านงาน :</b> {pettycash.dept}
                            </div>
                            <div className="col-md-4">
                              <b>ชื่อบริษัท :</b> {pettycash.company}
                            </div>
                            <div className="col-md-4">
                              <b>ผู้ที่ขอเบิก :</b> {pettycash.req_by}
                            </div>
                            <div className="col-md-4">
                              <b>ประเภทงบประมาณ :</b>{" "}
                              {pettycash.credit_type === "1"
                                ? "ในวงเงินงบประมาณ"
                                : pettycash.credit_type === "2"
                                ? "นอกงบประมาณ"
                                : pettycash.credit_type === "3"
                                ? "เกินงบประมาณ"
                                : "ไม่ระบุ"}
                            </div>
                          </div>
                        </div>
                      </div>
                      <table className="table table-bordered">
                        <tr align="center">
                          <th>#</th>
                          <th align="center">Account ID</th>
                          <th>Invoice</th>
                          <th>Type</th>
                          <th>Description</th>
                          <th>VAT</th>
                          <th>Amount</th>
                        </tr>
                        {paylists.map((pay, index) => {
                          return (
                            <tr key={pay.id}>
                              <td align="center">{index + 1}</td>
                              <td>{pay.acc_id}</td>
                              <td align="center">{pay.invoice_id}</td>
                              <td align="center">{pay.pay_type}</td>
                              <td align="center">{pay.description}</td>
                              <td align="center">{pay.pay_vat}</td>
                              <td align="center">{pay.amount}</td>
                            </tr>
                          );
                        })}
                      </table>
                      <div className="col-md-12">
                        <div className="float-right mt-2">
                          <button
                            className="btn btn-secondary"
                            onClick={exportPDF}
                          >
                            <i className="fas fa-download"></i> EXPORT
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
        </div>
      </div>
    </>
  );
};

export default View;
