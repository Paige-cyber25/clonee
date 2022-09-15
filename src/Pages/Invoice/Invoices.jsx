import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Invoices = () => {
  const [invoicesStats, setInvoicesStats] = useState({
    total: {
      sum: 0,
    },
    paid: {
      sum: 0,
    },
    unpaid: {
      sum: 0,
    },
    cancelled: {
      sum: 0,
    },
  });
  const [invoices, setInvoices] = useState([]);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    getInvoicesStats();
    getInvoices();
  }, []);

  async function getInvoicesStats() {
    try {
      var invoicesStats = axios.get("/invoices-stats");
      var response = (await invoicesStats).data;

      setInvoicesStats(response);
    } catch (error) {}
  }

  async function getInvoices() {
    try {
      var invoices = axios.get("/invoices");
      var response = (await invoices).data;

      if (response.invoices != null) {
        setInvoices(response.invoices);
        setPagination(response.meta);
      }
    } catch (error) {}
  }

  async function searchData() {}

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Invoice List</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/invoices">Invoices</Link>
                    </li>
                    <li className="breadcrumb-item active">Invoice List</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-3 col-md-6">
              <div className="card card-animate">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <p className="text-uppercase fw-semibold text-muted mb-0">
                        Sent
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <h5 className="text-success fs-14 mb-0">
                        <i className="ri-arrow-right-up-line fs-13 align-middle"></i>
                        +89.24 %
                      </h5>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-22 fw-bold ff-secondary mb-4">
                        $
                        <span
                          className="counter-value"
                          data-target={invoicesStats?.total?.sum}
                        >
                          {invoicesStats?.total?.sum}
                        </span>
                        k
                      </h4>
                      <span className="badge bg-warning me-1">
                        {invoicesStats?.total?.count}
                      </span>
                      <span className="text-muted"> Total sent</span>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-light rounded fs-3">
                        <i
                          data-feather="file-text"
                          className="text-info icon-dual-info"
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="card card-animate">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <p className="text-uppercase fw-semibold text-muted mb-0">
                        Paid
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <h5 className="text-danger fs-14 mb-0">
                        <i className="ri-arrow-right-down-line fs-13 align-middle"></i>
                        +8.09 %
                      </h5>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-22 fw-bold ff-secondary mb-4">
                        $
                        <span
                          className="counter-value"
                          data-target={invoicesStats?.paid?.sum}
                        >
                          {invoicesStats?.paid?.sum}
                        </span>
                        k
                      </h4>
                      <span className="badge bg-warning me-1">
                        {invoicesStats?.paid?.count}
                      </span>
                      <span className="text-muted"> by clients</span>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-light rounded fs-3">
                        <i
                          data-feather="check-square"
                          className="text-primary icon-dual-primary"
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="card card-animate">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <p className="text-uppercase fw-semibold text-muted mb-0">
                        Unpaid
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <h5 className="text-danger fs-14 mb-0">
                        <i className="ri-arrow-right-down-line fs-13 align-middle"></i>
                        +9.01 %
                      </h5>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-22 fw-bold ff-secondary mb-4">
                        $
                        <span
                          className="counter-value"
                          data-target={invoicesStats?.unpaid?.sum}
                        >
                          {invoicesStats?.unpaid?.sum}
                        </span>
                        k
                      </h4>
                      <span className="badge bg-warning me-1">
                        {invoicesStats?.unpaid?.count}
                      </span>
                      <span className="text-muted"> by clients</span>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-light rounded fs-3">
                        <i
                          data-feather="clock"
                          className="text-info icon-dual-info"
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="card card-animate">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <p className="text-uppercase fw-semibold text-muted mb-0">
                        Cancelled
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <h5 className="text-success fs-14 mb-0">
                        <i className="ri-arrow-right-up-line fs-13 align-middle"></i>
                        +7.55 %
                      </h5>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-22 fw-bold ff-secondary mb-4">
                        $
                        <span
                          className="counter-value"
                          data-target={invoicesStats?.cancelled?.sum}
                        >
                          {invoicesStats?.cancelled?.sum}
                        </span>
                        k
                      </h4>
                      <span className="badge bg-warning me-1">
                        {invoicesStats?.cancelled?.count}
                      </span>
                      <span className="text-muted"></span>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-light rounded fs-3">
                        <i
                          data-feather="x-octagon"
                          className="text-primary icon-dual-primary"
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card" id="invoiceList">
                <div className="card-header border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">Invoices</h5>
                    <div className="flex-shrink-0">
                      <Link to="/invoices/create" className="btn btn-primary">
                        <i className="ri-add-line align-bottom me-1"></i>
                        Create Invoice
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body bg-soft-light border border-dashed border-start-0 border-end-0">
                  <form>
                    <div className="row g-3">
                      <div className="col-xxl-5 col-sm-12">
                        <div className="search-box">
                          <input
                            type="text"
                            className="form-control search bg-light border-light"
                            placeholder="Search for customer, email, country, status or something..."
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </div>

                      <div className="col-xxl-3 col-sm-4">
                        <input
                          type="text"
                          className="form-control bg-light border-light"
                          id="datepicker-range"
                          placeholder="Select date"
                        />
                      </div>

                      <div className="col-xxl-3 col-sm-4">
                        <div className="input-light">
                          <select
                            className="form-control"
                            data-choices
                            data-choices-search-false
                            name="choices-single-default"
                            id="idStatus"
                          >
                            <option value="">Status</option>
                            <option value="all" defaultValue>
                              All
                            </option>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                            <option value="Cancel">Cancel</option>
                            <option value="Refund">Refund</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xxl-1 col-sm-4">
                        <button
                          type="button"
                          className="btn btn-info w-100"
                          onClick={() => {
                            searchData();
                          }}
                        >
                          <i className="ri-equalizer-fill me-1 align-bottom"></i>
                          Filters
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="card-body">
                  <div>
                    <div className="table-responsive table-card">
                      {invoices.length > 0 ? (
                        <table
                          className="table align-middle table-nowrap"
                          id="invoiceTable"
                        >
                          <thead className="text-muted">
                            <tr className="fs-13">
                              <th scope="col" style={{ width: "50px" }}>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="checkAll"
                                    value="option"
                                  />
                                </div>
                              </th>
                              <th
                                className="sort text-uppercase"
                                data-sort="invoice_id"
                              >
                                ID
                              </th>
                              <th
                                className="sort text-uppercase"
                                data-sort="customer_name"
                              >
                                Customer
                              </th>
                              <th
                                className="sort text-uppercase"
                                data-sort="email"
                              >
                                Email
                              </th>
                              <th
                                className="sort text-uppercase"
                                data-sort="country"
                              >
                                Country
                              </th>
                              <th
                                className="sort text-uppercase"
                                data-sort="date"
                              >
                                Date
                              </th>
                              <th
                                className="sort text-uppercase"
                                data-sort="invoice_amount"
                              >
                                Amount
                              </th>
                              <th
                                className="sort text-uppercase"
                                data-sort="status"
                              >
                                Payment Status
                              </th>
                              <th
                                className="sort text-uppercase"
                                data-sort="action"
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {invoices.map((invoice, index) => (
                              <tr key={index}>
                                <th scope="row">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="checkAll"
                                      value="option1"
                                    />
                                  </div>
                                </th>
                                <td className="id">
                                  <Link
                                    to="apps-invoices-details.html"
                                    className="fw-semibold link-dark"
                                  >
                                    #{invoice.invoice_id}
                                  </Link>
                                </td>
                                <td className="customer_name">
                                  <div className="d-flex align-items-center">
                                    <img
                                      src="assets/images/users/avatar-2.jpg"
                                      alt=""
                                      className="avatar-xs rounded-circle me-2"
                                    />
                                    {invoice.billing_name}
                                  </div>
                                </td>
                                <td className="email">{invoice.email}</td>
                                <td className="country">
                                  {invoice.customer ? (
                                    <>{invoice.customer.country}</>
                                  ) : (
                                    <>NA</>
                                  )}
                                </td>
                                <td className="date">
                                  06 Apr, 2021
                                  {invoice.date}
                                  <small className="text-muted">09:58PM</small>
                                </td>
                                <td className="invoice_amount">
                                  ${invoice.final_total}
                                </td>
                                <td className="status">
                                  {invoice.status === 0 ? (
                                    <span className="badge badge-soft-warning text-uppercase">
                                      Unpaid
                                    </span>
                                  ) : null}
                                  {invoice.status === 1 ? (
                                    <span className="badge badge-soft-success text-uppercase">
                                      Paid
                                    </span>
                                  ) : null}
                                  {invoice.status === 2 ? (
                                    <span className="badge badge-soft-danger text-uppercase">
                                      Expired
                                    </span>
                                  ) : null}
                                  {invoice.status === 3 ? (
                                    <span className="badge badge-soft-danger text-uppercase">
                                      Cancelled
                                    </span>
                                  ) : null}
                                </td>
                                <td>
                                  <div className="dropdown">
                                    <button
                                      className="btn btn-soft-info btn-sm dropdown"
                                      type="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="ri-more-fill align-middle"></i>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          to={`invoices/details/${invoice.id}`}
                                        >
                                          <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                                          View
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          to={`invoices/edit/${invoice.id}`}
                                        >
                                          <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                                          Edit
                                        </Link>
                                      </li>
                                      <li>
                                        <Link className="dropdown-item" to="">
                                          <i className="ri-download-2-line align-bottom me-2 text-muted"></i>
                                          Download
                                        </Link>
                                      </li>
                                      <li className="dropdown-divider"></li>
                                      <li>
                                        <Link
                                          className="dropdown-item remove-item-btn"
                                          data-bs-toggle="modal"
                                          to="#deleteInvoice"
                                        >
                                          <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                          Delete
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="noresult">
                          <div className="text-center">
                            {/* <lord-icon
                              src="https://cdn.lordicon.com/msoeawqm.json"
                              trigger="loop"
                              colors="primary:#121331,secondary:#08a88a"
                              style={{ width: "75px", height: "75px" }}
                            ></lord-icon> */}
                            <h5 className="mt-2">Sorry! No Result Found</h5>
                            <p className="text-muted mb-0">
                              We've searched more than 150+ invoice We did not
                              find any invoice for you search.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                      {pagination != null ? (
                        <div className="pagination-wrap hstack gap-2">
                          <Link
                            className="page-item pagination-prev disabled"
                            to="#"
                          >
                            Previous
                          </Link>
                          <ul className="pagination listjs-pagination mb-0">
                            {[...Array(pagination.pages)].map((page, index) =>
                              index <= 5 ? (
                                <>
                                  {pagination.page === page ? (
                                    <li class="active" key={index}>
                                      <Link
                                        class="page"
                                        to="#"
                                        data-i="1"
                                        data-page="8"
                                      >
                                        {page}
                                      </Link>
                                    </li>
                                  ) : (
                                    <li key={index}>
                                      <Link
                                        class="page"
                                        to="#"
                                        data-i="1"
                                        data-page="8"
                                      >
                                        {page}
                                      </Link>
                                    </li>
                                  )}
                                </>
                              ) : null
                            )}
                          </ul>
                          <Link className="page-item pagination-next" to="#">
                            Next
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div
                    className="modal fade flip"
                    id="deleteOrder"
                    tabIndex="-1"
                    aria-labelledby="deleteOrderLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-body p-5 text-center">
                          {/* <lord-icon
                            src="https://cdn.lordicon.com/gsqxdxog.json"
                            trigger="loop"
                            colors="primary:#405189,secondary:#f06548"
                            style={{ width: "90px", height: "90px" }}
                          ></lord-icon> */}
                          <div className="mt-4 text-center">
                            <h4>You are about to delete a order ?</h4>
                            <p className="text-muted fs-15 mb-4">
                              Deleting your order will remove all of your
                              information from our database.
                            </p>
                            <div className="hstack gap-2 justify-content-center remove">
                              <button
                                className="btn btn-link link-success fw-medium text-decoration-none"
                                data-bs-dismiss="modal"
                              >
                                <i className="ri-close-line me-1 align-middle"></i>
                                Close
                              </button>
                              <button
                                className="btn btn-danger"
                                id="delete-record"
                              >
                                Yes, Delete It
                              </button>
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
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Invoices;
