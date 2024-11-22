import React, { useState, useEffect } from "react";
import { DataTable } from "mantine-datatable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import dayjs from "dayjs";

// นำเข้าฟอนต์ไทยสำหรับ PDF
import { KanitNomal } from "../../../assets/fonts/Kanit-nomal.jsx";
import { KanitBold } from "../../../assets/fonts/Kanit-bold.jsx";

const PAGE_SIZES = [10, 20, 30];

const Finance = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [pettycash, setPettyCash] = useState([]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState(pettycash.slice(0, pageSize));

  const getData = async () => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get(import.meta.env.VITE_API_KEY + "/api/petty-cash")
      .then((res) => {
        setPettyCash(res.data.data.filter((p)=>p.status==='จ่ายเงินสำเร็จ'));
        setRecords(res.data.data.filter((p)=>p.status==='จ่ายเงินสำเร็จ').slice(from, to));
        setLoading(false);
      });
  };

  const dateFilter = async () => {
    if (!startDate || !endDate) return;

    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    setLoading(true);
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_KEY + "/api/petty-cash"
      );

      // แปลงวันที่เริ่มต้นและสิ้นสุดเป็น timestamp เพื่อเปรียบเทียบ
      const startTimestamp = startDate.setHours(0, 0, 0, 0);
      const endTimestamp = endDate.setHours(23, 59, 59, 999);

      // กรองสถานะ
      const statusFilter = response.data.data.filter((p) => p.status==="จ่ายเงินสำเร็จ" || p.status==="ปิดรายการ");

      // กรองข้อมูลตาม date range
      const filteredData = statusFilter.filter((item) => {
        const itemDate = new Date(item.created_at).getTime();
        return itemDate >= startTimestamp && itemDate <= endTimestamp;
      });

      setPettyCash(filteredData);
      setRecords(filteredData.slice(from, to));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a3",
    });

    // เพิ่มฟอนต์ไทยให้กับ PDF
    doc.addFileToVFS("Kanit-Regular.ttf", KanitNomal);
    doc.addFileToVFS("Kanit-Bold.ttf", KanitBold);
    doc.addFont("Kanit-Regular.ttf", "Kanit", "normal");
    doc.addFont("Kanit-Bold.ttf", "Kanit", "bold");

    // ตั้งค่าฟอนต์เริ่มต้น
    doc.setFont("Kanit", "normal");
    doc.setFontSize(14);

    const tableColumns = [
      "#",
      "วันที่จัดทำ",
      "เลขที่บัญชี",
      "เลขที่เอกสาร",
      "จ่ายเงินให้",
      "ฝ่าย",
      "Account",
      "Costcenter",
      "Project",
      "จำนวนเงิน",
      "ค่าเดินทาง",
      "ค่าทางด่วน",
      "ค่าเบี้ยเลี้ยง",
      "ค่าปรับ",
      "ค่ารับรอง",
      "วัสดุสิ้นเปลือง",
      "ค่าโทรศัพท์",
      "ค่าอื่นๆ",
    ];

    const tableRows = records.map((record, index) => {
      const payListByType = (type) =>
        record.pay_list
          .filter((pay) => pay.pay_type === type)
          .map((pay) => pay.amount)
          .join(", ");

      return [
        index + 1,
        dayjs(record.created_at).format("DD-MMM-YYYY"),
        record.afd_id,
        record.petty_cash_id,
        record.pay_to,
        record.dept,
        record.pay_list.map((pay) => pay.acc_id.substring(7, 14)).join(", "),
        record.pay_list.map((pay) => pay.acc_id.substring(15, 22)).join(", "),
        record.pay_list.map((pay) => pay.acc_id.substring(23, 35)).join(", "),
        record.total,
        payListByType("ค่าเดินทาง"),
        payListByType("ค่าทางด่วน"),
        payListByType("ค่าเบี้ยเลี้ยง"),
        payListByType("ค่าปรับ"),
        payListByType("ค่ารับรอง"),
        payListByType("วัสดุสิ้นเปลือง"),
        payListByType("ค่าโทรศัพท์"),
        payListByType("เบ็ดเตล็ด"),
      ];
    });

    doc.text("บริษัท ไทยรุ่งยูเนี่ยนคาร์ จำกัด(มหาชน)", 14, 15);

    doc.setFontSize(13);
    doc.text("รายงานการสั่งจ่ายเงินสดย่อย", 14, 25);

    doc.autoTable({
      startY: 30,
      head: [tableColumns],
      body: tableRows,
      theme: "grid",
      styles: { font: "courier", fontSize: 10, font: "Kanit" },
      headStyles: {
        fillColor: [71, 71, 71],
        font: "Kanit",
        textColor: [0, 0, 0], // สีดำ
        halign: "center",
        fontSize: 10,
        fillColor: [220, 220, 220],
        lineWidth: 0.1, // ความหนาของเส้นขอบ
      },
    });

    //doc.save("petty_cash_report.pdf");
    const pdfUrl = doc.output("bloburl");
    window.open(pdfUrl, "_blank");
  };

  useEffect(() => {
    getData();
    if (startDate && endDate) {
      dateFilter();
    }
  }, [startDate, endDate, page, pageSize]);

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">PETTY CASH REPORT</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">DASHBOARD</a>
                  </li>
                  <li className="breadcrumb-item active">PETTY CASH REPORT</li>
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
                    <div className="row">
                      <div className="col-md-12">
                      <DatePicker
                          placeholderText="กรุณาเลือกช่วงวันที่"
                          className='form-control'
                          selectsRange={true}
                          startDate={startDate}
                          endDate={endDate}
                          onChange={(update) => {
                            setDateRange(update);
                          }}
                          isClearable={true}
                        />
                       <div className="float-right">
                       <button
                          className="btn btn-secondary mb-2"
                          onClick={handleExportPDF}
                        >
                           <i className="fas fa-download"></i> EXPORT
                        </button>
                       </div>
                      </div>
                      <div className="col-md-12">
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
                              width: 50,
                              render: (record) => records.indexOf(record) + 1,
                            },
                            {
                              accessor: "created_at",
                              title: "วันที่จัดทำ",
                              textAlignment: "center",
                              width: 150,
                              render: ({ created_at }) =>
                                dayjs(created_at).format("DD-MMM-YYYY"),
                            },
                            {
                              accessor: "afd_id",
                              title: "เลขที่บัญชี",
                              textAlignment: "center",
                              width: 150,
                            },
                            {
                              accessor: "petty_cash_id",
                              title: "เลขที่เอกสาร",
                              textAlignment: "center",
                              width: 150,
                            },
                            {
                              accessor: "pay_to",
                              title: "จ่ายเงินให้",
                              textAlignment: "center",
                              width: 200,
                            },
                            {
                              accessor: "dept",
                              title: "ฝ่าย",
                              textAlignment: "center",
                            },
                            {
                              accessor: "pay_at",
                              title: "รายการที่จ่าย",
                              textAlignment: "center",
                              width: 150,
                              render: ({ pay_list }) => (
                                <div>
                                  {pay_list[0] && <p>{pay_list[0].pay_type}</p>}
                                </div>
                              ),
                            },
                            {
                              accessor: "account",
                              title: "Account",
                              textAlignment: "center",
                              render: ({ pay_list }) => (
                                <div>
                                  {pay_list.map((pay, index) => {
                                    return (
                                      <p key={index}>
                                        {pay.acc_id.substring(7, 14)}
                                      </p>
                                    );
                                  })}
                                </div>
                              ),
                            },
                            {
                              accessor: "costcenter",
                              title: "Costcenter",
                              textAlignment: "center",
                              render: ({ pay_list }) => (
                                <div>
                                  {pay_list.map((pay, index) => {
                                    return (
                                      <p key={index}>
                                        {pay.acc_id.substring(15, 22)}
                                      </p>
                                    );
                                  })}
                                </div>
                              ),
                            },
                            {
                              accessor: "project",
                              title: "Project",
                              textAlignment: "center",
                              render: ({ pay_list }) => (
                                <div>
                                  {pay_list.map((pay, index) => {
                                    return (
                                      <p key={index}>
                                        {pay.acc_id.substring(23, 35)}
                                      </p>
                                    );
                                  })}
                                </div>
                              ),
                            },
                            {
                              accessor: "total",
                              title: "จำนวนเงิน",
                              textAlignment: "center",
                            },
                            {
                              accessor: "1",
                              title: "ค่าเดินทาง",
                              textAlignment: "center",
                              render: ({ pay_list }) => (
                                <div>
                                  {pay_list.map((pay, index) => (
                                    <p key={index}>
                                      {pay.pay_type === "ค่าเดินทาง"
                                        ? pay.amount
                                        : ""}
                                    </p>
                                  ))}
                                </div>
                              ),
                            },
                            {
                              accessor: "2",
                              title: "ค่าทางด่วน",
                              textAlignment: "center",
                              render: ({ pay_list }) => (
                                <div>
                                  {pay_list.map((pay, index) => (
                                    <p key={index}>
                                      {pay.pay_type === "ค่าทางด่วน"
                                        ? pay.amount
                                        : ""}
                                    </p>
                                  ))}
                                </div>
                              ),
                            },
                            {
                              accessor: "3",
                              title: "ค่าเบี้ยเลี้ยง",
                              textAlignment: "center",
                              render: ({ pay_list }) => (
                                <div>
                                  {pay_list.map((pay, index) => (
                                    <p key={index}>
                                      {pay.pay_type === "ค่าเบี้ยเลี้ยง"
                                        ? pay.amount
                                        : ""}
                                    </p>
                                  ))}
                                </div>
                              ),
                            },
                            {
                              accessor: "4",
                              title: "ค่าปรับ",
                              textAlignment: "center",
                              render: ({ pay_list }) => (
                                <div>
                                  {pay_list.map((pay, index) => (
                                    <p key={index}>
                                      {pay.pay_type === "ค่าปรับ"
                                        ? pay.amount
                                        : ""}
                                    </p>
                                  ))}
                                </div>
                              ),
                            },
                            {
                              accessor: "5",
                              title: "ค่ารับรอง",
                              textAlignment: "center",
                              render: ({ pay_list }) => (
                                <div>
                                  {pay_list.map((pay, index) => (
                                    <p key={index}>
                                      {pay.pay_type === "ค่ารับรอง"
                                        ? pay.amount
                                        : ""}
                                    </p>
                                  ))}
                                </div>
                              ),
                            },
                            {
                              accessor: "6",
                              title: "วัสดุสิ้นเปลือง",
                              textAlignment: "center",
                              render: ({ pay_list }) => (
                                <div>
                                  {pay_list.map((pay, index) => (
                                    <p key={index}>
                                      {pay.pay_type === "วัสดุสิ้นเปลือง"
                                        ? pay.amount
                                        : ""}
                                    </p>
                                  ))}
                                </div>
                              ),
                            },
                            {
                              accessor: "7",
                              title: "ค่าโทรศัพท์",
                              textAlignment: "center",
                              render: ({ pay_list }) => (
                                <div>
                                  {pay_list.map((pay, index) => (
                                    <p key={index}>
                                      {pay.pay_type === "ค่าโทรศัพท์"
                                        ? pay.amount
                                        : ""}
                                    </p>
                                  ))}
                                </div>
                              ),
                            },
                            {
                              accessor: "8",
                              title: "ค่าอื่นๆ",
                              textAlignment: "center",
                              render: ({ pay_list }) => (
                                <div>
                                  {pay_list.map((pay, index) => (
                                    <p key={index}>
                                      {pay.pay_type === "เบ็ดเตล็ด"
                                        ? pay.amount
                                        : ""}
                                    </p>
                                  ))}
                                </div>
                              ),
                            },
                          ]}
                          records={records}
                          minHeight={200}
                          totalRecords={pettycash.length}
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
        </div>
      </div>
    </>
  );
};

export default Finance;
