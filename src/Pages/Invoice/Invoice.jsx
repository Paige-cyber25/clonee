import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

const Invoice = ({}) => {
    const { invoive_id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {}, []);

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Invoice Details</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="#">Invoices</Link>
                    </li>
                    <li className="breadcrumb-item active">Invoice Details</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-xxl-9">
              <div className="card" id="demo">
                <div className="card-header border-bottom-dashed p-4">
                  <div className="d-sm-flex">
                    <div className="flex-grow-1">
                      <img
                        src="assets/images/logo-dark.png"
                        className="card-logo card-logo-dark"
                        alt="logo dark"
                        height="17"
                      />
                      <img
                        src="assets/images/logo-light.png"
                        className="card-logo card-logo-light"
                        alt="logo light"
                        height="17"
                      />
                    </div>
                    <div className="flex-shrink-0 mt-sm-0 mt-3">
                      {/* <h6>
                        <span className="text-muted fw-normal">
                          Legal Registration No:
                        </span>
                        987654
                      </h6>
                      <h6>
                        <span className="text-muted fw-normal">Email:</span>{" "}
                        velzon@themesbrand.com
                      </h6>
                      <h6>
                        <span className="text-muted fw-normal">Website:</span>{" "}
                        <a href="javascript:void(0);" className="link-primary">
                          www.themesbrand.com
                        </a>
                      </h6>
                      <h6 className="mb-0">
                        <span className="text-muted fw-normal">Contact No:</span>{" "}
                        +(01) 234 6789
                      </h6> */}
                    </div>
                  </div>
                </div>
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-lg-3 col-6">
                      <p className="text-muted mb-2 text-uppercase fw-semibold">
                        Invoice No
                      </p>
                      <h5 className="fs-15 mb-0">#VL25000355</h5>
                    </div>
                    <div className="col-lg-3 col-6">
                      <p className="text-muted mb-2 text-uppercase fw-semibold">
                        Date
                      </p>
                      <h5 className="fs-15 mb-0">
                        23 Nov, 2021 <small className="text-muted">02:36PM</small>
                      </h5>
                    </div>
                    <div className="col-lg-3 col-6">
                      <p className="text-muted mb-2 text-uppercase fw-semibold">
                        Payment Status
                      </p>
                      <span className="badge badge-soft-success fs-11">Paid</span>
                    </div>
                    <div className="col-lg-3 col-6">
                      <p className="text-muted mb-2 text-uppercase fw-semibold">
                        Total Amount
                      </p>
                      <h5 className="fs-15 mb-0">$415.96</h5>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 border-top border-top-dashed">
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <h6 className="text-muted text-uppercase fw-semibold mb-3">
                        Billing Address
                      </h6>
                      <p className="fw-semibold mb-2">David Nichols</p>
                      <p className="text-muted mb-1">305 S San Gabriel Blvd</p>
                      <p className="text-muted mb-1">
                        California, United States - 91776
                      </p>
                      <p className="text-muted mb-1">Phone: +(123) 456-7890</p>
                      <p className="text-muted mb-0">Tax: 12-3456789</p>
                    </div>
                    <div className="col-sm-6">
                      <h6 className="text-muted text-uppercase fw-semibold mb-3">
                        Shipping Address
                      </h6>
                      <p className="fw-semibold mb-2">Donald Palmer</p>
                      <p className="text-muted mb-1">345 Elm Ave, Solvang</p>
                      <p className="text-muted mb-1">
                        California, United States - 91776
                      </p>
                      <p className="text-muted mb-0">Phone: +(234) 987-01234</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4">
                  <div className="table-responsive">
                    <table className="table table-borderless text-center table-nowrap align-middle mb-0">
                      <thead>
                        <tr className="table-active">
                          <th scope="col" style="width: 50px;">
                            #
                          </th>
                          <th scope="col">Product Details</th>
                          <th scope="col">Rate</th>
                          <th scope="col">Quantity</th>
                          <th scope="col" className="text-end">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">01</th>
                          <td className="text-start">
                            <span className="fw-semibold">
                              Sweatshirt for Men (Pink)
                            </span>
                            <p className="text-muted mb-0">
                              Graphic Print Men & Women Sweatshirt
                            </p>
                          </td>
                          <td>$119.99</td>
                          <td>02</td>
                          <td className="text-end">$239.98</td>
                        </tr>
                        <tr>
                          <th scope="row">02</th>
                          <td className="text-start">
                            <span className="fw-semibold">
                              Noise NoiseFit Endure Smart Watch
                            </span>
                            <p className="text-muted mb-0">
                              32.5mm (1.28 Inch) TFT Color Touch Display
                            </p>
                          </td>
                          <td>$94.99</td>
                          <td>01</td>
                          <td className="text-end">$94.99</td>
                        </tr>
                        <tr>
                          <th scope="row">03</th>
                          <td className="text-start">
                            <span className="fw-semibold">
                              350 ml Glass Grocery Container
                            </span>
                            <p className="text-muted mb-0">
                              Glass Grocery Container (Pack of 3, White)
                            </p>
                          </td>
                          <td>$24.99</td>
                          <td>01</td>
                          <td className="text-end">$24.99</td>
                        </tr>
                        <tr className="border-top border-top-dashed mt-2">
                          <td colspan="3"></td>
                          <td colspan="2" className="fw-semibold p-0">
                            <table className="table table-borderless text-start table-nowrap align-middle mb-0">
                              <tbody>
                                <tr>
                                  <td>Sub Total</td>
                                  <td className="text-end">$359.96</td>
                                </tr>
                                <tr>
                                  <td>Estimated Tax (12.5%)</td>
                                  <td className="text-end">$44.99</td>
                                </tr>
                                <tr>
                                  <td>
                                    Discount{" "}
                                    <small className="text-muted">(VELZON15)</small>
                                  </td>
                                  <td className="text-end">- $53.99</td>
                                </tr>
                                <tr>
                                  <td>Shipping Charge</td>
                                  <td className="text-end">$65.00</td>
                                </tr>
                                <tr className="border-top border-top-dashed">
                                  <th scope="row">Total Amount</th>
                                  <td className="text-end">$415.96</td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3">
                    <h6 className="text-muted text-uppercase fw-semibold mb-3">
                      Payment Details:
                    </h6>
                    <p className="text-muted mb-1">
                      Payment Method:
                      <span className="fw-semibold">Mastercard</span>
                    </p>
                    <p className="text-muted mb-1">
                      Card Holder:
                      <span className="fw-semibold">David Nichols</span>
                    </p>
                    <p className="text-muted mb-1">
                      Card Number:
                      <span className="fw-semibold">xxx xxxx xxxx 1234</span>
                    </p>
                    <p className="text-muted">
                      Total Amount: <span className="fw-semibold">$415.96</span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <div className="alert alert-info">
                      <p className="mb-0">
                        <span className="fw-semibold">NOTES:</span> All accounts are
                        to be paid within 7 days from receipt of invoice. To be
                        paid by cheque or credit card or direct payment online.
                        If account is not paid within 7 days the credits details
                        supplied as confirmation of work undertaken will be
                        charged the agreed quoted fee noted above.
                      </p>
                    </div>
                  </div>
                  <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                    <Link to="" className="btn btn-info" onClick={() => {
                        window.print()
                    }}>
                      <i className="ri-printer-line align-bottom me-1"></i> Print
                    </Link>
                    <Link to="" className="btn btn-primary">
                      <i className="ri-download-2-line align-bottom me-1"></i>
                      Download
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Invoice;
