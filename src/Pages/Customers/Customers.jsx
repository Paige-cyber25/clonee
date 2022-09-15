import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, Navigate } from "react-router-dom";
import {
  authUserDetails,
  isLoggedIn,
  pageModalReset,
  responseMessage,
} from "../../libs/app";
import $ from "jquery";
import moment from "moment";
import Flatpickr from "react-flatpickr";

const Customers = () => {

  const {user, store, token } = authUserDetails();
  console.log(token, 'token')
  if (!isLoggedIn()) {
    return <Navigate to={"/auth/check"} />;
  }

 

  const [formState, setFormMode] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [customer, setcustomer] = useState({
    name: "",
    email: "",
    phone: "",
    created_date: "",
    country_id: 140,
    status: 1,
  });

  var start = moment().subtract(7, "days");
  var end = moment();

  const [keyword, setKeyword] = useState(null);
  const [status, setStatus] = useState(null);
  const [joining_date, setJoiningDate] = useState({
    from: start.format("YYYY-MM-DD"),
    to: end.format("YYYY-MM-DD"),
  });
  const [initialDate, setInitialDate] = useState([
    joining_date.from,
    joining_date.to,
  ]);
  const [selectedForDelete, setSelectedForDelete] = useState(null);

  useEffect(() => {
    getCustomers();
  }, []);

  async function postCustomer(e) {
    e.preventDefault();

    try {
      var data = { ...customer };
      var request = axios.post("/customers/create", data);
      var response = (await request).data;

      if (response.success) {
        responseMessage(response.message, "success");
        getCustomers();

        pageModalReset();
      }

      $("#showModal, .modal-backdrop").removeClass("show");
    } catch (error) {
      console.error(error);
      if (error.response) {
        var err = error.response.data.error;
        responseMessage(err.message, "error");
      } else {
        responseMessage("Something went wrong, please try again", "error");
      }
    }
  }

  async function editCustomer(id) {
    try {
      var request = axios.get(`/customer/details/${id}`);
      var response = (await request).data;
      console.log(response, "cus res");
      if (response.success) {
        delete response.customer.country;

        setcustomer(response.customer);
        setFormMode("update");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function updateCustomer() {
    try {
      var data = { ...customer };
      var request = axios.put(`/customers/update`, data);
      var response = (await request).data;

      if (response.success) {
        responseMessage(response.message, "success");
        getCustomers();

        pageModalReset();
      }
    } catch (error) {
      if (error.response) {
        var err = error.response.data.error;
        responseMessage(err.message, "error");
      } else {
        responseMessage("Something went wrong, please try again", "error");
      }
    }
  }

  async function searchData() {
    try {
      var url = `/customers/search?s=1`;
      if (keyword !== null) {
        url += `&keyword=${keyword}`;
      }

      if (status !== null) {
        url += `&status=${status}`;
      }

      if (joining_date) {
        url += `&joining_dates=${JSON.stringify(joining_date)}`;
      }

      var request = axios.get(url);
      var response = (await request).data;

      if (response.success) {
        setCustomers(response.customers);
      }
    } catch (error) {}
  }

  async function getCustomers() {
    try {
      var customers = axios.get(`/customers/${store.id}`);
      var response = (await customers).data;
      if (response.success) {
        setCustomers(response.customers);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(event) {
    const value = event.target.value;
    setcustomer({
      ...customer,
      [event.target.name]: value,
    });
  }

  async function deleteCustomer() {
    try {
      if (selectedForDelete !== null) {
        var request = axios.delete(`/customers/delete/${selectedForDelete}`);
        var response = (await request).data;

        if (response.success) {
          responseMessage(response.message, "success");
          getCustomers();
        }
      } else {
        responseMessage(
          "Something went wrong, invalid action attempted",
          "error"
        );
      }
    } catch (error) {
      if (error.response) {
        var err = error.response.data.error;
        responseMessage(err.message, "error");
      } else {
        responseMessage("Something went wrong, please try again", "error");
      }
    }

    $("#deleteRecordModal, .modal-backdrop").removeClass("show");
  }

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Customers</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="#">Store</a>
                    </li>
                    <li className="breadcrumb-item active">Customers</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card" id="customerList">
                <div className="card-header border-bottom-dashed">
                  <div className="row g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">Customer List</h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        <button
                          type="button"
                          className="btn btn-success add-btn me-1"
                          data-bs-toggle="modal"
                          id="create-btn"
                          data-bs-target="#showModal"
                          onClick={() => {
                            setFormMode("add");
                          }}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          Customer
                        </button>
                        <button
                          type="button"
                          className="btn btn-info"
                          style={{ display: "none" }}
                        >
                          <i className="ri-file-download-line align-bottom me-1"></i>
                          Import
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body border-bottom-dashed border-bottom">
                  <form>
                    <div className="row g-3">
                      <div className="col-xl-6">
                        <div className="search-box">
                          <input
                            type="text"
                            className="form-control search"
                            placeholder="Search for customer, email, phone, status or something..."
                            onChange={(e) => setKeyword(e.target.value)}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </div>

                      <div className="col-xl-6">
                        <div className="row g-3">
                          <div className="col-sm-4">
                            <Flatpickr
                              type="text"
                              className="form-control"
                              id="dash-filter-picker"
                              defaultValue={
                                initialDate[0] + " to " + initialDate[1]
                              }
                              options={{ mode: "range" }}
                              onChange={(selectedDates) => {
                                if (selectedDates) {
                                  var start = moment(selectedDates[0]);
                                  var end = moment(selectedDates[1]);
                                  setJoiningDate({
                                    from: start.format("YYYY-MM-DD"),
                                    to: end.format("YYYY-MM-DD"),
                                  });
                                }
                              }}
                            />
                          </div>

                          <div className="col-sm-4">
                            <div>
                              <select
                                className="form-control"
                                data-plugin="choices"
                                data-choices
                                data-choices-search-false
                                name="choices-single-default"
                                id="idStatus"
                                onChange={(e) => {
                                  if (
                                    e.target.value.toLowerCase() == "active"
                                  ) {
                                    setStatus(1);
                                  } else if (
                                    e.target.value.toLowerCase() == "blocked"
                                  ) {
                                    setStatus(0);
                                  } else {
                                    setStatus(null);
                                  }
                                }}
                              >
                                <option defaultValue="">Status</option>
                                <option defaultValue="">All</option>
                                <option defaultValue="1">Active</option>
                                <option defaultValue="0">Blocked</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-sm-4">
                            <div>
                              <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={searchData}
                              >
                                <i className="ri-equalizer-fill me-2 align-bottom"></i>
                                Filters
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="card-body">
                  <div>
                    <div className="table-responsive table-card mb-1">
                      {customers.length > 0 ? (
                        <table
                          className="table align-middle"
                          id="customerTable"
                        >
                          <thead className="table-light text-muted">
                            <tr>
                              <th scope="col" style={{ width: "50" }}>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="checkAll"
                                    value="option"
                                  />
                                </div>
                              </th>

                              <th className="sort" data-sort="customer_name">
                                Name
                              </th>
                              <th className="sort" data-sort="email">
                                Email
                              </th>
                              <th className="sort" data-sort="phone">
                                Phone
                              </th>
                              <th className="sort" data-sort="date">
                                Joining Date
                              </th>
                              <th className="sort" data-sort="status">
                                Status
                              </th>
                              <th className="sort" data-sort="action">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {customers.map((customer, index) => (
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
                                <td className="id" style={{ display: "none" }}>
                                  <a
                                    href="#"
                                    className="fw-medium link-primary"
                                  >
                                    #VZ2101
                                  </a>
                                </td>
                                <td className="customer_name">
                                  {customer.name}
                                </td>
                                <td className="email">{customer.email}</td>
                                <td className="phone">{customer.phone}</td>
                                <td className="date">
                                  {moment(customer.created_date).format(
                                    "DD MMM, Y"
                                  )}
                                </td>
                                <td className="status">
                                  {customer.status === "1" ? (
                                    <span className="badge badge-soft-success text-uppercase">
                                      Active
                                    </span>
                                  ) : (
                                    <span className="badge badge-soft-danger text-uppercase">
                                      Blocked
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <ul className="list-inline hstack gap-2 mb-0">
                                    <li
                                      className="list-inline-item edit"
                                      data-bs-toggle="tooltip"
                                      data-bs-trigger="hover"
                                      data-bs-placement="top"
                                      title="Edit"
                                    >
                                      <a
                                        href="#showModal"
                                        data-bs-toggle="modal"
                                        className="text-primary d-inline-block edit-item-btn"
                                        onClick={() =>
                                          editCustomer(customer.id)
                                        }
                                      >
                                        <i className="ri-pencil-fill fs-16"></i>
                                      </a>
                                    </li>
                                    <li
                                      className="list-inline-item"
                                      data-bs-toggle="tooltip"
                                      data-bs-trigger="hover"
                                      data-bs-placement="top"
                                      title="Remove"
                                    >
                                      <a
                                        className="text-danger d-inline-block remove-item-btn"
                                        data-bs-toggle="modal"
                                        href="#deleteRecordModal"
                                        onClick={() =>
                                          setSelectedForDelete(customer.id)
                                        }
                                      >
                                        <i className="ri-delete-bin-5-fill fs-16"></i>
                                      </a>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="noresult" style={{ display: "none" }}>
                          <div className="text-center">
                            {/* <lord-icon
                              src="https://cdn.lordicon.com/msoeawqm.json"
                              trigger="loop"
                              colors="primary:#121331,secondary:#08a88a"
                              style={{ width: "75px", height: "75px" }}
                            ></lord-icon> */}
                            <h5 className="mt-2">Sorry! No Result Found</h5>
                            <p className="text-muted mb-0">
                              We did not find any customers on your store.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        <Link
                          className="page-item pagination-prev disabled"
                          to="#"
                        >
                          Previous
                        </Link>
                        <ul className="pagination listjs-pagination mb-0"></ul>
                        <Link className="page-item pagination-next" to="#">
                          Next
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div
                    className="modal fade"
                    id="showModal"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header bg-light p-3">
                          <h5
                            className="modal-title"
                            id="exampleModalLabel"
                          ></h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            id="close-modal"
                          ></button>
                        </div>
                        <form onSubmit={(e) => postCustomer(e)}>
                          <div className="modal-body">
                            <input type="hidden" id="id-field" />

                            <div
                              className="mb-3"
                              id="modal-id"
                              style={{ display: "none" }}
                            >
                              <label htmlFor="id-field1" className="form-label">
                                ID
                              </label>
                              <input
                                type="text"
                                id="id-field1"
                                className="form-control"
                                placeholder="ID"
                                readOnly={true}
                              />
                            </div>

                            <div className="mb-3">
                              <label
                                htmlFor="customername-field"
                                className="form-label"
                              >
                                Customer Name
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={customer.name}
                                className="form-control"
                                placeholder="Enter name"
                                onChange={handleChange}
                                required
                              />
                            </div>

                            <div className="mb-3">
                              <label
                                htmlFor="email-field"
                                className="form-label"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                id="email-field"
                                name="email"
                                value={customer.email}
                                className="form-control"
                                placeholder="Enter Email"
                                onChange={handleChange}
                                required
                              />
                            </div>

                            <div className="mb-3">
                              <label
                                htmlFor="phone-field"
                                className="form-label"
                              >
                                Phone
                              </label>
                              <input
                                type="text"
                                id="phone-field"
                                name="phone"
                                value={customer.phone}
                                className="form-control"
                                placeholder="Enter Phone no."
                                onChange={handleChange}
                                required
                              />
                            </div>

                            <div className="mb-3">
                              <label
                                htmlFor="date-field"
                                className="form-label"
                              >
                                Joining Date
                              </label>
                              <input
                                type="date"
                                id="date-field"
                                name="created_date"
                                value={customer.created_date}
                                className="form-control"
                                data-provider="flatpickr"
                                data-date-format="d M, Y"
                                required
                                onChange={handleChange}
                                placeholder="Select date"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="status-field"
                                className="form-label"
                              >
                                Status
                              </label>
                              <select
                                className="form-control"
                                data-choices
                                data-choices-search-false
                                name="status"
                                value={customer.status}
                                id="status-field"
                                onChange={handleChange}
                              >
                                <option value="">Status</option>
                                <option value="1">Active</option>
                                <option value="0">Block</option>
                              </select>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <div className="hstack gap-2 justify-content-end">
                              <button
                                type="button"
                                className="btn btn-light"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              {formState === "add" ? (
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                  id="add-btn"
                                >
                                  Add Customer
                                </button>
                              ) : null}
                              {formState === "update" ? (
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  id="edit-btn"
                                  onClick={updateCustomer}
                                >
                                  Update
                                </button>
                              ) : null}
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div
                    className="modal fade zoomIn"
                    id="deleteRecordModal"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            id="btn-close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div className="mt-2 text-center">
                            {/* <lord-icon
                              src="https://cdn.lordicon.com/gsqxdxog.json"
                              trigger="loop"
                              colors="primary:#f7b84b,secondary:#f06548"
                              style={{ width: "100", height: "100" }}
                            ></lord-icon> */}
                            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                              <h4>Are you sure ?</h4>
                              <p className="text-muted mx-4 mb-0">
                                Are you sure you want to remove this customer ?
                              </p>
                            </div>
                          </div>
                          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                            <button
                              type="button"
                              className="btn w-sm btn-light"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="btn w-sm btn-danger "
                              id="delete-record"
                              onClick={deleteCustomer}
                            >
                              Yes, Delete It!
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
      <Outlet />
    </>
  );
};

export default Customers;
