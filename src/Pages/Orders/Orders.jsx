import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import Select from "react-select";
import { authUserDetails, pageModalReset, responseMessage } from "../../libs/app";
import getSymbolFromCurrency from "currency-symbol-map";

const Orders = (props) => {

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [data, setData] = useState({
    customer_id: "",
    vendor_id: "",
    products: "",
    order_date: "",
    shipping_fee: "",
    payment_method: "",
    status: "",
    quantities: "",
    variant_ids: "",
    coupon:""
  });
  const [customers, setCustomers] = useState([])
  const [order, setOrder] = useState(null);
  const [selectedForDelete, setSelectedForDelete] = useState(null);
  const [defaultEndpoint, setDefaultEndpoint] = useState(
    `/orders`,
  );
  const {user, store, token } = authUserDetails();
  const [filteredOrders, setFilteredOrders] = useState({
    status: '',
    payment_method:''
  });

  const handleOrderFilterChange = (event) => {
    const {name, value} = event.target; 
    setFilteredOrders((prevState) => ({...prevState, [name]: value}))
  };


const applyFilter = () => {
    getOrders(filteredOrders)
};
  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const unsubscribe = getPaymentMethods(); //subscribe
    return unsubscribe; //unsubscribe
  }, []);

  if(order !== null) {
    return <Navigate to={`/order/${order.id}`} />
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

  async function SearchData() {
    // var d = document.getElementById("idStatus").value,
    //   s = document.getElementById("idPayment").value,
    //   i = document.getElementById("demo-datepicker").value,
    //   r = i.split(" to ")[0],
    //   o = i.split(" to ")[1];
  }

  async function getOrders(filteredOrders) {
    let endpoint ='/orders';
    if(filteredOrders) {
      endpoint = endpoint + `?status=${filteredOrders.status || ''}&payment=${filteredOrders.payment_method || ''}`
    }
    try {
      var orders = axios.get(endpoint);
      var response = (await orders).data;
      let resFromArray = response.data.map((res) => res);
      if (resFromArray) {
        var list = resFromArray;
        setOrders(list);
      }
    } catch (error) { }
    
    
  }

  async function getProducts() {
    try {
      var getProducts = axios.get("/products");
      var response = (await getProducts).data.data;
      let resFromArray = response.map((res) => res);
      if (resFromArray) {
        var list = resFromArray;
        setProducts(list);
      }
    } catch (error) { }
    setLoading(false);
  }

  async function getPaymentMethods() {
    try {
      var getPaymentMethods = axios.get("/payment-methods");
      var response = (await getPaymentMethods).data;
      if (response) {
        setPaymentMethods(response.data);
      }
    } catch (error) { }
    setLoading(false);
  }

  async function handleSubmit(e) {

    e.preventDefault();
    setLoading(true);
    setIsError(false);
    const order = {
      customer_id: parseInt(data.customer_id),
      vendor_id: store.id,
      products: selectedOption,
      order_date: data.order_date,
      shipping_fee: parseInt(data.shipping_fee).toFixed(2),
      payment_method: data.payment_method,
      status: parseInt(data.status),
      quantities: data.quantities,
      variant_ids: "",
      coupon:data.coupon
    };

    axios
      .post("/orders/create", order)
      .then((res) => {
        if (res) {
          pageModalReset();
          responseMessage(res.data.message, "success");
          setOrder({ ...res.data.order });
        }
      })
      .catch((err) => {
        console.error(err)
        setLoading(false);
        setIsError(true);
      });
  }

  function handleChange(evt) {
    const value = evt.target.value;
    setData({
      ...data,
      [evt.target.name]: value,
    });
  }

  const productOptions =
    products.length > 0 &&
    products.map(({ id, name }) => {
      return { value: id, label: name };
    });

  const orderStatus = [
    { id: '', name: "All" },
    { id: 1, name: "Received" },
    { id: 2, name: "Processing" },
    { id: 3, name: "Processed" },
    { id: 4, name: "Shipping" },
    { id: 5, name: "Delivered" },
    { id: 6, name: "Cancelled" },
    { id: 7, name: "Returned" },
    { id: 8, name: "Confirmed" },
  ];

  async function deleteOrder() {

    try {

      if (selectedForDelete !== null) {

        var request = axios.delete(`/orders/delete/${selectedForDelete}`);
        var response = (await request).data;

        if (response.success) {
          responseMessage(response.message, "success");
          getOrders()
        }

      }

    } catch (error) {

      if (error.response) {
        var message = error.response.error.message;
        responseMessage(message, "error");
      } else {
        responseMessage('Something went wrong, please try again', 'error')
      }
    }

    pageModalReset("#deleteOrder");

  }

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Orders</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="#">Store</Link>
                    </li>
                    <li className="breadcrumb-item active">Orders</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card" id="orderList">
                <div className="card-header  border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">
                      Order History
                    </h5>
                    <div className="flex-shrink-0">
                      <button
                        type="button"
                        className="btn btn-success add-btn me-1"
                        data-bs-toggle="modal"
                        id="create-btn"
                        data-bs-target="#showModal"
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Create
                        Order
                      </button>
                      {/* <button type="button" className="btn btn-info">
                        <i className="ri-file-download-line align-bottom me-1"></i>
                        Import
                      </button> */}
                    </div>
                  </div>
                </div>
                <div className="card-body border border-dashed border-end-0 border-start-0">
                  <form>
                    <div className="row g-3">
                      <div className="col-xxl-5 col-sm-6">
                        <div className="search-box">
                          <input
                            type="text"
                            className="form-control search"
                            placeholder="Search for order ID, customer, order status or something..."
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </div>

                      <div className="col-xxl-2 col-sm-6">
                        <div>
                          <input
                            type="text"
                            className="form-control"
                            data-provider="flatpickr"
                            data-date-format="d M, Y"
                            data-range-date="true"
                            id="demo-datepicker"
                            placeholder="Select date"
                          />
                        </div>
                      </div>

                      <div className="col-xxl-2 col-sm-4">
                        <div>
                          <select
                            className="form-control"
                            data-choices
                            data-choices-search-false
                            name="status"
                            id="idStatus"
                            value={filteredOrders.status}
                            onChange={handleOrderFilterChange}
                          >
                            <option value='' defaultChecked={true}>Select status</option>
                            <option value="1">Received</option>
                            <option value="2">
                              Processing
                            </option>
                            <option value="3">Processed</option>
                            <option value="4">Processing</option>
                            <option value="5">Shipping</option>
                            <option value="6">Cancelled</option>
                            <option value="7">Returned</option>
                            <option value="8">Confirmed</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xxl-2 col-sm-4">
                        <div>
                          <select
                            className="form-control"
                            data-choices
                            data-choices-search-false
                            name="payment_method"
                            id="idPayment"
                            value={filteredOrders.payment_method}
                            onChange={handleOrderFilterChange}
                          >
                            <option defaultValue="">Select Payment</option>
                            <option defaultValue="all" defaultChecked={true}>
                              All
                            </option>
                            <option defaultValue="Mastercard">
                              Mastercard
                            </option>
                            <option defaultValue="Paypal">Paypal</option>
                            <option defaultValue="Visa">Visa</option>
                            <option defaultValue="COD">COD</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xxl-1 col-sm-4">
                        <div>
                          <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={applyFilter} 
                          >
                            <i className="ri-equalizer-fill me-1 align-bottom"></i>
                            Filters
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="card-body pt-0">
                  <div>
                    <ul
                      className="nav nav-tabs nav-tabs-custom nav-success mb-3"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <Link
                          className="nav-link active All py-3"
                          data-bs-toggle="tab"
                          id="All"
                          to="#home1"
                          role="tab"
                          aria-selected="true"
                        >
                          <i className="ri-store-2-fill me-1 align-bottom"></i>
                          All Orders
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link py-3 Delivered"
                          data-bs-toggle="tab"
                          id="Delivered"
                          to="#delivered"
                          role="tab"
                          aria-selected="false"
                        >
                          <i className="ri-checkbox-circle-line me-1 align-bottom"></i>
                          Delivered
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link py-3 Pickups"
                          data-bs-toggle="tab"
                          id="Pickups"
                          to="#pickups"
                          role="tab"
                          aria-selected="false"
                        >
                          <i className="ri-truck-line me-1 align-bottom"></i>
                          Pickups
                          <span className="badge bg-danger align-middle ms-1">
                            2
                          </span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link py-3 Returns"
                          data-bs-toggle="tab"
                          id="Returns"
                          to="#returns"
                          role="tab"
                          aria-selected="false"
                        >
                          <i className="ri-arrow-left-right-fill me-1 align-bottom"></i>
                          Returns
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link py-3 Cancelled"
                          data-bs-toggle="tab"
                          id="Cancelled"
                          to="#cancelled"
                          role="tab"
                          aria-selected="false"
                        >
                          <i className="ri-close-circle-line me-1 align-bottom"></i>
                          Cancelled
                        </Link>
                      </li>
                    </ul>

                    <div className="table-responsive table-card mb-1">
                      {orders.length > 0 ? (
                        <table
                          className="table table-nowrap align-middle"
                          id="orderTable"
                        >
                          <thead className="text-muted table-light">
                            <tr className="text-uppercase">
                              <th scope="col" style={{ width: "25px" }}>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="checkAll"
                                    value="option"
                                  />
                                </div>
                              </th>
                              <th className="sort" data-sort="id">
                                Order ID
                              </th>
                              <th className="sort" data-sort="customer_name">
                                Customer
                              </th>
                              <th className="sort" data-sort="product_name">
                                Product
                              </th>
                              <th className="sort" data-sort="date">
                                Order Date
                              </th>
                              <th className="sort" data-sort="amount">
                                Shipping fee
                              </th>
                              <th className="sort" data-sort="status">
                                Status
                              </th>
                              <th className="sort" data-sort="city">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {orders.map((order, index) => (
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
                                    to="apps-ecommerce-order-details.html"
                                    className="fw-medium link-primary"
                                  >
                                    #{order?.order_no || "N/A"}
                                  </Link>
                                </td>
                                <td className="customer_name">
                                  {order?.customer?.name || "N/A"}
                                </td>
                                <td className="product_name">
                                  {order?.items?.[0].name || "N/A"}
                                  { order?.items?.length > 1 ? (
                                    <small className="text-muted">
                                      + { (order?.items?.length - 1) + ' items'  }
                                    </small>
                                  ) : null }
                                </td>
                                <td className="date">
                                  {order.date},
                                  <small className="text-muted">
                                    {order.time || "N/A"}
                                  </small>
                                </td>
                                <td className="shipping_fee">
                                  { getSymbolFromCurrency(store.currency.abbr) + (order?.shipping_fee.toFixed(2) || "0.00") }
                                </td>
                                <td className="status">
                                  <span className="badge badge-soft-warning text-uppercase">
                                    Pending
                                  </span>
                                </td>
                                <td>
                                  <ul className="list-inline hstack gap-2 mb-0">
                                    <li
                                      className="list-inline-item"
                                      data-bs-toggle="tooltip"
                                      data-bs-trigger="hover"
                                      data-bs-placement="top"
                                      title="View"
                                    >
                                      <Link
                                        to={`/order/${order.id}/details`}
                                        className="text-primary d-inline-block"
                                      >
                                        <i className="ri-eye-fill fs-16"></i>
                                      </Link>
                                    </li>
                                    <li
                                      className="list-inline-item edit"
                                      data-bs-toggle="tooltip"
                                      data-bs-trigger="hover"
                                      data-bs-placement="top"
                                      title="Edit"
                                    >
                                      <Link
                                        to={`/order/${order.id}`}
                                        className="text-primary d-inline-block edit-item-btn"
                                      >
                                        <i className="ri-pencil-fill fs-16"></i>
                                      </Link>
                                    </li>
                                    <li
                                      className="list-inline-item"
                                      data-bs-toggle="tooltip"
                                      data-bs-trigger="hover"
                                      data-bs-placement="top"
                                      title="Remove"
                                    >
                                      <Link
                                        className="text-danger d-inline-block remove-item-btn"
                                        data-bs-toggle="modal"
                                        to="#deleteOrder"
                                        onClick={() => setSelectedForDelete(order.id)}
                                      >
                                        <i className="ri-delete-bin-5-fill fs-16"></i>
                                      </Link>
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
                              colors="primary:#405189,secondary:#0ab39c"
                              style={{ width: "75px", height: "75px" }}
                            ></lord-icon> */}
                            <h5 className="mt-2">Sorry! No Result Found</h5>
                            <p className="text-muted">
                              We've searched more than 150+ Orders We did not
                              find any orders for you search.
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
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header bg-light p-3">
                          <h5 className="modal-title" id="exampleModalLabel">
                            &nbsp;
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            id="close-modal"
                          ></button>
                        </div>
                        <form action="#" onSubmit={handleSubmit}>
                          {isError && (
                            <small className="mt-3 d-inline-block text-danger p-3">
                              Something went wrong. Please try again later.
                            </small>
                          )}
                          <div className="modal-body">
                            <input type="hidden" id="id-field" />

                            <div className="mb-3">
                              <label
                                htmlFor="customername-field"
                                className="form-label"
                              >
                                Customer Name
                              </label>
                              <select
                                className="form-control"
                                name="customer_id"
                                onChange={handleChange}
                                value={data.customer_id}
                              >
                                <option defaultChecked>
                                  Select customer name
                                </option>
                                {customers.length > 0 &&
                                  customers.map(({ id, name }) => {
                                    return (
                                      <option key={id} value={id}>
                                        {name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>

                            <div className="mb-3">
                              <label
                                htmlFor="productname-field"
                                className="form-label"
                              >
                                Product
                              </label>
                              <Select
                                isMulti
                                isClearable={true}
                                isDisabled={false}
                                isLoading={false}
                                isSearchable={false}
                                closeMenuOnSelect={false}
                                options={productOptions}
                                value={selectedOption}
                                onChange={setSelectedOption}
                              >
                                Select Products
                              </Select>
                            </div>

                            <div className="mb-3">
                              <label
                                htmlFor="date-field"
                                className="form-label"
                              >
                                Order Date
                              </label>
                              <input
                                type="date"
                                id="date-field"
                                className="form-control"
                                data-provider="flatpickr"
                                data-date-format="d M, Y"
                                data-enable-time
                                required
                                placeholder="Select date"
                                name="order_date"
                                value={data.order_date}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="row gy-4 mb-3">
                              <div className="col-md-6">
                                <div>
                                  <label
                                    htmlFor="amount-field"
                                    className="form-label"
                                  >
                                    Shipping Fee
                                  </label>
                                  <input
                                    type="text"
                                    id="amount-field"
                                    className="form-control"
                                    placeholder="Shipping fee"
                                    name="shipping_fee"
                                    value={data.shipping_fee}
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div>
                                  <label
                                    htmlFor="payment-field"
                                    className="form-label"
                                  >
                                    Payment Method
                                  </label>
                                  <select
                                    className="form-control"
                                    data-trigger
                                    name="payment_method"
                                    value={data.payment_method}
                                    onChange={handleChange}
                                    id="payment-field"
                                  >
                                    <option defaultValue="">
                                      Payment Method
                                    </option>
                                    {paymentMethods.length > 0 &&
                                      paymentMethods.map(({ id, name }) => {
                                        return (
                                          <option key={id} value={id}>
                                            {name}
                                          </option>
                                        );
                                      })}
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="delivered-status"
                                className="form-label"
                              >
                                Delivery Status
                              </label>
                              <select
                                className="form-control"
                                data-trigger
                                name="status"
                                id="delivered-status"
                                value={data.status}
                                onChange={handleChange}
                              >
                                <option defaultChecked>Select order</option>
                                {orderStatus.length > 0 &&
                                  orderStatus.map(({ id, name }) => {
                                    return (
                                      <option key={id} value={id}>
                                        {name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>

                            <div className="mt-3">
                                <div>
                                  <label
                                    htmlFor="amount-field"
                                    className="form-label"
                                  >
                                    Coupon (letters and numbers only, no punctuation or special characters)
                                  </label>
                                  <input
                                    type="text"
                                    id="amount-field"
                                    className="form-control"
                                    placeholder="Coupon"
                                    name="coupon"
                                    value={data.coupon}
                                    pattern="[A-Za-z0-9]+"
                                    onChange={handleChange}
                                  />
                                </div>
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
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                  id="add-btn"
                                >
                                  Save and Continue
                                </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div
                    className="modal fade zoomIn"
                    id="deleteOrder"
                    tabIndex="-1"
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
                                onClick={() => deleteOrder()}
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

export default Orders;
