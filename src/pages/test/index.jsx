import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

// นำเข้าฟอนต์ไทยสำหรับ PDF
// import { THSarabunNew } from "../../assets/fonts/THSarabunNew-normal.jsx";
// import { THSarabunNewBold } from "../../assets/fonts/THSarabunNew-bold.jsx";
import { KanitNomal } from "../../assets/fonts/Kanit-nomal.jsx";
import { KanitBold } from "../../assets/fonts/Kanit-bold.jsx";

const TestFunctions = () => {
  const generatePDF = () => {
    // สร้างเอกสาร PDF ใหม่ในแนวนอน
    const doc = new jsPDF({
      //orientation: "landscape", // ตั้งค่าเป็นแนวนอน
    });

    // เพิ่มฟอนต์ไทยให้กับ PDF
    doc.addFileToVFS("Kanit-Regular.ttf", KanitNomal);
    doc.addFileToVFS("Kanit-Bold.ttf", KanitBold);
    doc.addFont("Kanit-Regular.ttf", "Kanit", "normal");
    doc.addFont("Kanit-Bold.ttf", "Kanit", "bold");

    // ตั้งค่าฟอนต์เริ่มต้นเป็นฟอนต์ไทย
    doc.setFont("Kanit", "normal");
    doc.setFontSize(16);

    // ข้อมูลตัวอย่างสำหรับตาราง
    const tableColumn = ["ID", "Name", "Email", "Country"];
    const tableRows = [
      [1, "John Doe", "johndoe@example.com", "USA"],
      [2, "Jane Smith", "janesmith@example.com", "UK"],
      [3, "Sam Brown", "sambrown@example.com", "Canada"],
    ];

    // เพิ่มชื่อหัวข้อใน PDF
    doc.text("บริษัท ไทยรุ่ง ยูเนี่ยนคาร์ จำกัด", 14, 15);

    // สร้างตาราง
    doc.autoTable({
      head: [tableColumn], // หัวตาราง
      body: tableRows, // ข้อมูลในตาราง
      startY: 20, // ตำแหน่งเริ่มต้น Y
    });

    // บันทึกไฟล์ PDF
    doc.save("table.pdf");
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Test Functions</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Test Functions</li>
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
                        <button className="btn btn-success" onClick={generatePDF}>Export to PDF</button>
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

export default TestFunctions;
