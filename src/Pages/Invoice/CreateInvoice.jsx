import React, { useState } from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import $ from "jquery";
import axios from "axios";

const CreateInvoice = () => {
  const { order_id } = useParams();
  const storeDetails = JSON.parse(localStorage.getItem("store"));

  const [customers, setCustomers] = useState([]);
  const [invoice, setInvoice] = useState({
    customer_id: null,
    due_date: null,
    payment_status: null,
  });

  const [same, setSameAddress] = useState(false);
  const [currency, setPaymentCurrency] = useState(null);

  function sameAddress(e) {
    if ($(e.target).prop("checked")) {
      setSameAddress(true);
    } else {
      setSameAddress(false);
    }
  }

  async function getCustomers() {
    try {
      var customers = axios.get(`/store/customers/${storeDetails.id}`);
      var response = (await customers).data;

      if(response.success) {
        setCustomers(response.customers);
      }
    } catch (error) {}
  }

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Create Invoice</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/invoices">Invoices</Link>
                    </li>
                    <li className="breadcrumb-item active">Create Invoice</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-xxl-9">
              <div className="card">
                <form className="needs-validation" noValidate>
                  <div className="card-body border-bottom border-bottom-dashed p-4">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="profile-user mx-auto mb-3">
                          <input
                            id="profile-img-file-input"
                            type="file"
                            className="profile-img-file-input"
                            required
                          />
                          <label
                            htmlFor="profile-img-file-input"
                            className="d-block"
                            tabIndex="0"
                          >
                            <span
                              className="overflow-hidden border border-dashed d-flex align-items-center justify-content-center rounded"
                              style={{ height: "60px", width: "256px" }}
                            >
                              <img
                                src="/assets/images/logo-dark.png"
                                className="card-logo card-logo-dark user-profile-image img-fluid"
                                alt="logo dark"
                              />
                              <img
                                src="/assets/images/logo-light.png"
                                className="card-logo card-logo-light user-profile-image img-fluid"
                                alt="logo light"
                              />
                            </span>
                          </label>
                        </div>
                        <div></div>
                      </div>
                      <div className="col-lg-4 ms-auto"></div>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <div className="row g-3">
                      <div className="col-lg-6 col-sm-6">
                        <label htmlFor="choices-payment-status">Customer</label>
                        <div className="input-light">
                          <select
                            className="form-control bg-light border-0"
                            data-choices
                            data-choices-search-false
                            data-choices-removeitem
                            id="choices-payment-status"
                            required
                          >
                            <option value="">Select customer</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div>
                          <label htmlFor="date-field">Due Date</label>
                          <input
                            type="text"
                            className="form-control bg-light border-0"
                            id="date-field"
                            data-provider="flatpickr"
                            data-time="true"
                            placeholder="Select Date-time"
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="choices-payment-status">
                          Payment Status
                        </label>
                        <div className="input-light">
                          <select
                            className="form-control bg-light border-0"
                            data-choices
                            data-choices-search-false
                            data-choices-removeItem
                            id="choices-payment-status"
                            required
                          >
                            <option value="">Select Payment Status</option>
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Refund">Refund</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-4 border-top border-top-dashed">
                    <div className="row">
                      <div className="col-lg-4 col-sm-6">
                        <div>
                          <label
                            htmlFor="billingName"
                            className="text-muted text-uppercase fw-semibold"
                          >
                            Billing Address
                          </label>
                        </div>
                        <div className="mb-2">
                          <input
                            type="text"
                            className="form-control bg-light border-0"
                            id="billingName"
                            placeholder="Full Name"
                            required
                          />
                          <div className="invalid-feedback">
                            Please enter a full name
                          </div>
                        </div>
                        <div className="mb-2">
                          <textarea
                            className="form-control bg-light border-0"
                            id="billingAddress"
                            rows="3"
                            placeholder="Address"
                            required
                          ></textarea>
                          <div className="invalid-feedback">
                            Please enter a address
                          </div>
                        </div>
                        <div className="mb-2">
                          <input
                            type="text"
                            className="form-control bg-light border-0"
                            data-plugin="cleave-phone"
                            id="billingPhoneno"
                            placeholder="(123)456-7890"
                            required
                          />
                          <div className="invalid-feedback">
                            Please enter a phone number
                          </div>
                        </div>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control bg-light border-0"
                            id="billingTaxno"
                            placeholder="Tax Number"
                            required
                          />
                          <div className="invalid-feedback">
                            Please enter a tax number
                          </div>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="same"
                            name="same"
                            onChange={(e) => sameAddress(e)}
                          />
                          <label className="form-check-label" htmlFor="same">
                            Will your Billing and Shipping address same?
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-6 ms-auto">
                        <div className="row">
                          <div className="col-lg-8">
                            <div>
                              <label
                                htmlFor="shippingName"
                                className="text-muted text-uppercase fw-semibold"
                              >
                                Shipping Address
                              </label>
                            </div>
                            <div className="mb-2">
                              <input
                                type="text"
                                className="form-control bg-light border-0"
                                id="shippingName"
                                placeholder="Full Name"
                                required
                              />
                              <div className="invalid-feedback">
                                Please enter a full name
                              </div>
                            </div>
                            <div className="mb-2">
                              <textarea
                                className="form-control bg-light border-0"
                                id="shippingAddress"
                                rows="3"
                                placeholder="Address"
                                required
                              ></textarea>
                              <div className="invalid-feedback">
                                Please enter a address
                              </div>
                            </div>
                            <div className="mb-2">
                              <input
                                type="text"
                                className="form-control bg-light border-0"
                                data-plugin="cleave-phone"
                                id="shippingPhoneno"
                                placeholder="(123)456-7890"
                                required
                              />
                              <div className="invalid-feedback">
                                Please enter a phone number
                              </div>
                            </div>
                            <div>
                              <input
                                type="text"
                                className="form-control bg-light border-0"
                                id="shippingTaxno"
                                placeholder="Tax Number"
                                required
                              />
                              <div className="invalid-feedback">
                                Please enter a tax number
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <div className="table-responsive">
                      <table className="invoice-table table table-borderless table-nowrap mb-0">
                        <thead className="align-middle">
                          <tr className="table-active">
                            <th scope="col" style={{ width: "50px" }}>
                              #
                            </th>
                            <th scope="col">Product Details</th>
                            <th scope="col" style={{ width: "120px" }}>
                              <div className="d-flex currency-select input-light align-items-center">
                                Rate
                                <select
                                  className="form-selectborder-0 bg-light"
                                  data-choices
                                  data-choices-search-false
                                  id="choices-payment-currency"
                                  onChange={(e) =>
                                    setPaymentCurrency(e.target.value)
                                  }
                                >
                                  <option value="$">($)</option>
                                  <option value="£">(£)</option>
                                  <option value="₹">(₹)</option>
                                  <option value="€">(€)</option>
                                </select>
                              </div>
                            </th>
                            <th scope="col" style={{ width: "120px" }}>
                              Quantity
                            </th>
                            <th
                              scope="col"
                              className="text-end"
                              style={{ width: "150px" }}
                            >
                              Amount
                            </th>
                            <th
                              scope="col"
                              className="text-end"
                              style={{ width: "105px" }}
                            ></th>
                          </tr>
                        </thead>
                        <tbody id="newlink">
                          <tr id="1" className="product">
                            <th scope="row" className="product-id">
                              1
                            </th>
                            <td className="text-start">
                              <div className="mb-2">
                                <input
                                  type="text"
                                  className="form-control bg-light border-0"
                                  id="productName"
                                  placeholder="Enter product name or id"
                                  required
                                />
                                <div className="invalid-feedback">
                                  Please enter a product name or id
                                </div>
                              </div>
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control product-price bg-light border-0"
                                placeholder="0.00"
                                required
                                readOnly={true}
                              />
                              <div className="invalid-feedback">
                                Please enter a rate
                              </div>
                            </td>
                            <td>
                              <div className="input-step">
                                <button type="button" className="minus">
                                  –
                                </button>
                                <input
                                  type="number"
                                  className="product-quantity"
                                  value="0"
                                  onChange={() => {}}
                                  readOnly={true}
                                />
                                <button type="button" className="plus">
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="text-end">
                              <div>
                                <input
                                  type="text"
                                  className="form-control bg-light border-0 product-line-price"
                                  placeholder="$0.00"
                                  readonly
                                  readOnly={true}
                                />
                              </div>
                            </td>
                            <td className="product-removal">
                              <a
                                href="javascript:void(0)"
                                className="btn btn-success"
                              >
                                Delete
                              </a>
                            </td>
                          </tr>
                        </tbody>
                        <tr id="newForm" style={{ display: "none" }}></tr>
                        <tr>
                          <td colspan="9">
                            <a
                              href="javascript:new_link()"
                              className="btn btn-soft-secondary fw-medium"
                            >
                              <i className="ri-add-fill me-1 align-bottom"></i>{" "}
                              Add Item
                            </a>
                          </td>
                        </tr>
                        <tr className="border-top border-top-dashed mt-2">
                          <td colspan="3"></td>
                          <td colspan="2" className="p-0">
                            <table className="table table-borderless table-sm table-nowrap align-middle mb-0">
                              <tbody>
                                <tr>
                                  <th scope="row">Sub Total</th>
                                  <td style={{ width: "150px" }}>
                                    <input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="cart-subtotal"
                                      placeholder="$0.00"
                                      readonly
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Estimated Tax (12.5%)</th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="cart-tax"
                                      placeholder="$0.00"
                                      readonly
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">
                                    Discount
                                    <small className="text-muted">
                                      (VELZON15)
                                    </small>
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="cart-discount"
                                      placeholder="$0.00"
                                      readonly
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Shipping Charge</th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="cart-shipping"
                                      placeholder="$0.00"
                                      readonly
                                    />
                                  </td>
                                </tr>
                                <tr className="border-top border-top-dashed">
                                  <th scope="row">Total Amount</th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="cart-total"
                                      placeholder="$0.00"
                                      readonly
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div className="row mt-3">
                      <div className="col-lg-4">
                        <div className="mb-2">
                          <label
                            htmlFor="choices-payment-type"
                            className="form-label text-muted text-uppercase fw-semibold"
                          >
                            Payment Details
                          </label>
                          <div className="input-light">
                            <select
                              className="form-control bg-light border-0"
                              data-choices
                              data-choices-search-false
                              data-choices-removeItem
                              id="choices-payment-type"
                            >
                              <option value="">Payment Method</option>
                              <option value="Mastercard">Mastercard</option>
                              <option value="Credit Card">Credit Card</option>
                              <option value="Visa">Visa</option>
                              <option value="Paypal">Paypal</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label text-muted text-uppercase fw-semibold"
                      >
                        NOTES
                      </label>
                      <textarea
                        className="form-control alert alert-info"
                        id="exampleFormControlTextarea1"
                        placeholder="Notes"
                        rows="2"
                        required
                      ></textarea>
                    </div>
                    <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                      <button type="submit" className="btn btn-info">
                        <i className="ri-printer-line align-bottom me-1"></i>{" "}
                        Save
                      </button>
                      <a href="javascript:void(0);" className="btn btn-primary">
                        <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                        Download Invoice
                      </a>
                      <a href="javascript:void(0);" className="btn btn-info">
                        <i className="ri-send-plane-fill align-bottom me-1"></i>{" "}
                        Send Invoice
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default CreateInvoice;
