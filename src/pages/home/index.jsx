export default function Home() {

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Home</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <li className="breadcrumb-item active">Home</li>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>20</h3>
                  <p>ใบเบิกเงินสดย่อย ทั้งหมด</p>
                </div>
                <div className="icon">
                <i className="fas fa-wallet"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="small-box bg-primary">
                <div className="inner">
                  <h3>7</h3>
                  <p>รอสั่งจ่ายเงิน</p>
                </div>
                <div className="icon">
                <i className="fas fa-clock"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>8</h3>
                  <p>จ่ายเงินสำเร็จ</p>
                </div>
                <div className="icon">
                <i className="fas fa-hand-holding-usd"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>5</h3>
                  <p>จ่ายเงินไม่สำเร็จ</p>
                </div>
                <div className="icon">
                <i className="fas fa-exclamation-circle"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
            {/* <div className="col-lg-6 mt-5">
                <div className="card card-outline card-primary">
                  <div className="card-body">
                    <h5>จำนวนเรื่องที่เขียน</h5>
                    <ResponsiveContainer width={"100%"} height={300}>
                    <BarChart
                      width={600}
                      height={300}
                      data={data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 10,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Target" fill="#8884d8" />
                      <Bar dataKey="Actual" fill="#82ca9d" />
                    </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mt-5">
                <div className="card card-outline card-primary">
                  <div className="card-body">
                    <h5>จำนวนเรื่องที่มีคุณค่า</h5>
                    <ResponsiveContainer width={"100%"} height={300}>
                    <BarChart
                      width={600}
                      height={300}
                      data={data_2}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 10,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Target" fill="#8884d8" />
                      <Bar dataKey="Actual" fill="#82ca9d" />
                    </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
