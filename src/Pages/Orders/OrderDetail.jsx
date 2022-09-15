import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { responseMessage, authUserDetails, pageModalReset } from "../../libs/app";
import OrderItem from "./OrderItem";
import Select from "react-select";
import getSymbolFromCurrency from "currency-symbol-map";
import OrderItemAction from "./OrderItemAction";

const OrderDetail = (props) => {
  const { order_id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const { store, token } = authUserDetails();
  console.log(orderItems, "item");
  console.log(orderDetails, "details");

  let order;
  orderItems.map((item) => {
    order = item;
  });

  useEffect(() => {
    getOrderDetails();
    getOrderItems();
    getProducts();
  }, []);

  async function getProducts() {
    try {
      var getProducts = axios.get("/products");
      var response = (await getProducts).data.data;
      let resFromArray = response.map((res) => res);
      if (resFromArray) {
        var list = resFromArray;
        setProducts(list);
      }
    } catch (error) {}
    setLoading(false);
  }

  async function getOrderDetails() {
    try {
      var request = axios.get(`/order/${order_id}`);
      var response = (await request).data;

      if (response.success == true) {
        setOrderDetails(response.data);
      } else {
        responseMessage("Unable to fetch data!", "error");
      }
    } catch (error) {
      responseMessage("Something went wrong, please try again!", "error");
    }
  }

  async function getOrderItems() {
    try {
      var request = axios.get(`/order/items/${order_id}`);
      var response = (await request).data;

      if (response.success) {
        setOrderItems(response.items);
      } else {
        responseMessage("Unable to fetch data!", "error");
      }
    } catch (error) {
      responseMessage("Something went wrong, please try again!", "error");
    }
  }

  async function updateOrder(id) {
    try {
      var data = {
        item_id: order.id,
        unit_price: order.price,
        quantity: order.quantity,
        variation: "",
      };

      var request = axios.put(`/order/item/update`, data);
      var response = (await request).data;

      if (response.success) {
        responseMessage(response.message, "success");
        getOrderItems();
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

  const productOptions =
    products.length > 0 &&
    products.map(({ id, name }) => {
      return { value: id, label: name };
    });

  const subTotal = orderItems.reduce((accummulator, orderItem) => {
    return accummulator + orderItem?.price;
  }, 0);

  const shippingFee = orderDetails?.shipping_fee;

  let discount;
  if (orderDetails?.coupon?.type === "percentage") {
    discount = ((orderDetails?.coupon?.discount / 100) * subTotal)?.toFixed(2);
  } else {
    discount = orderDetails?.coupon?.discount?.toFixed(2) || "0.00";
  }

  const total = subTotal + shippingFee - discount;

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Order Details</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="#">Store</a>
                    </li>
                    <li className="breadcrumb-item active">Order Details</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title flex-grow-1 mb-0">
                      Order #{orderDetails?.order_no}
                    </h5>
                    <div className="flex-shrink-0">
                      <a
                        href="apps-invoices-details.html"
                        className="btn btn-info btn-sm"
                      >
                        <i className="ri-download-2-fill align-middle me-1"></i>
                        Create Invoice
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive table-card">
                    <table className="table table-nowrap align-middle table-borderless mb-0">
                      <thead className="table-light text-muted">
                        <tr>
                          <th scope="col">Product Details</th>
                          <th scope="col">Price</th>
                          <th scope="col">Quantity</th>
                          <th scope="col" className="text-end">
                            Total Amount
                          </th>
                          {props.update === true ? (
                            <th scope="col">Action</th>
                          ) : null}
                        </tr>
                      </thead>
                      <tbody>
                        {orderItems.length > 0 ? (
                          <>
                            {orderItems.map((item, index) => (
                              <OrderItem
                                item={item}
                                update={props.update}
                                key={index}
                              />
                            ))}
                          </>
                        ) : null}
                        <tr className="border-top border-top-dashed">
                          <td colSpan="2"></td>
                          <td colSpan="2" className="fw-medium p-0">
                            <table className="table table-borderless mb-0">
                              <tbody>
                                <tr>
                                  <td>Sub Total :</td>
                                  <td className="text-end">
                                    {getSymbolFromCurrency(
                                      store?.currency?.abbr
                                    )}
                                    &nbsp;{subTotal.toFixed(2) || "0.00"}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p className="m-0 p-0">Discount :</p>
                                    <span className="text-muted">
                                      ({orderDetails?.coupon?.coupon || "N/A"})
                                    </span>
                                  </td>
                                  <td className="text-end">
                                    {getSymbolFromCurrency(
                                      store?.currency?.abbr
                                    )}
                                    &nbsp;{discount || "0.00"}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Shipping Charge :</td>
                                  <td className="text-end">
                                    {getSymbolFromCurrency(
                                      store?.currency?.abbr
                                    )}
                                    &nbsp;
                                    {orderDetails?.shipping_fee.toFixed(2) ||
                                      "0.00"}
                                  </td>
                                </tr>
                                {/* <tr>
                                  <td>Estimated Tax :</td>
                                  <td className="text-end">$44.99</td>
                                </tr> */}
                                <tr className="border-top border-top-dashed">
                                  <th scope="row">
                                    Total ({store?.currency?.abbr}) :
                                  </th>
                                  <th className="text-end">
                                    {getSymbolFromCurrency(
                                      store?.currency?.abbr
                                    )}
                                    &nbsp;{total.toFixed(2) || "0.00"}
                                  </th>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <div className="d-sm-flex align-items-center">
                    <h5 className="card-title flex-grow-1 mb-0">
                      Order Status
                    </h5>
                    <div className="flex-shrink-0 mt-2 mt-sm-0">
                      <a
                        href="javasccript:void(0;)"
                        className="btn btn-soft-info btn-sm mt-2 mt-sm-0"
                      >
                        <i className="ri-map-pin-line align-bottom me-1"></i>
                        Change Address
                      </a>
                      <a
                        href="javasccript:void(0;)"
                        className="btn btn-soft-danger btn-sm mt-2 mt-sm-0"
                      >
                        <i className="mdi mdi-archive-remove-outline align-bottom me-1"></i>
                        Cancel Order
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="profile-timeline">
                    <div
                      className="accordion accordion-flush"
                      id="accordionFlushExample"
                    >
                      <div className="accordion-item border-0">
                        <div className="accordion-header" id="headingOne">
                          <a
                            className="accordion-button p-2 shadow-none"
                            data-bs-toggle="collapse"
                            href="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 avatar-xs">
                                <div className="avatar-title bg-primary rounded-circle">
                                  <i className="ri-shopping-bag-line"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6 className="fs-15 mb-0 fw-semibold">
                                  Order Placed -
                                  <span className="fw-normal">
                                    Wed, 15 Dec 2021
                                  </span>
                                </h6>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse show"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body ms-2 ps-5 pt-0">
                            <h6 className="mb-1">An order has been placed.</h6>
                            <p className="text-muted">
                              Wed, 15 Dec 2021 - 05:34PM
                            </p>

                            <h6 className="mb-1">
                              Seller has proccessed your order.
                            </h6>
                            <p className="text-muted mb-0">
                              Thu, 16 Dec 2021 - 5:48AM
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item border-0">
                        <div className="accordion-header" id="headingTwo">
                          <a
                            className="accordion-button p-2 shadow-none"
                            data-bs-toggle="collapse"
                            href="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 avatar-xs">
                                <div className="avatar-title bg-primary rounded-circle">
                                  <i className="mdi mdi-gift-outline"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6 className="fs-15 mb-1 fw-semibold">
                                  Packed -
                                  <span className="fw-normal">
                                    Thu, 16 Dec 2021
                                  </span>
                                </h6>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse show"
                          aria-labelledby="headingTwo"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body ms-2 ps-5 pt-0">
                            <h6 className="mb-1">
                              Your Item has been picked up by courier patner
                            </h6>
                            <p className="text-muted mb-0">
                              Fri, 17 Dec 2021 - 9:45AM
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item border-0">
                        <div className="accordion-header" id="headingThree">
                          <a
                            className="accordion-button p-2 shadow-none"
                            data-bs-toggle="collapse"
                            href="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 avatar-xs">
                                <div className="avatar-title bg-primary rounded-circle">
                                  <i className="ri-truck-line"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6 className="fs-15 mb-1 fw-semibold">
                                  Shipping -
                                  <span className="fw-normal">
                                    Thu, 16 Dec 2021
                                  </span>
                                </h6>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse show"
                          aria-labelledby="headingThree"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body ms-2 ps-5 pt-0">
                            <h6 className="fs-14">
                              RQK Logistics - MFDS1400457854
                            </h6>
                            <h6 className="mb-1">
                              Your item has been shipped.
                            </h6>
                            <p className="text-muted mb-0">
                              Sat, 18 Dec 2021 - 4.54PM
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item border-0">
                        <div className="accordion-header" id="headingFour">
                          <a
                            className="accordion-button p-2 shadow-none"
                            data-bs-toggle="collapse"
                            href="#collapseFour"
                            aria-expanded="false"
                          >
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 avatar-xs">
                                <div className="avatar-title bg-light text-primary rounded-circle">
                                  <i className="ri-takeaway-fill"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6 className="fs-14 mb-0 fw-semibold">
                                  Out For Delivery
                                </h6>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="accordion-item border-0">
                        <div className="accordion-header" id="headingFive">
                          <a
                            className="accordion-button p-2 shadow-none"
                            data-bs-toggle="collapse"
                            href="#collapseFile"
                            aria-expanded="false"
                          >
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 avatar-xs">
                                <div className="avatar-title bg-light text-primary rounded-circle">
                                  <i className="mdi mdi-package-variant"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6 className="fs-14 mb-0 fw-semibold">
                                  Delivered
                                </h6>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-12 mt-2">
              <div className="row">
                <div className="col-xl-4">
                  <div className="card card-height-100">
                    <div className="card-header">
                      <div className="d-flex">
                        <h5 className="card-title flex-grow-1 mb-0">
                          <i className="mdi mdi-truck-fast-outline align-middle me-1 text-muted"></i>
                          Logistics Details
                        </h5>
                        <div className="flex-shrink-0">
                          <a
                            href="#"
                            className="badge badge-soft-primary fs-11"
                          >
                            Track Order
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="text-center">
                        <lord-icon
                          src="https://cdn.lordicon.com/uetqnvvg.json"
                          trigger="loop"
                          colors="primary:#405189,secondary:#0ab39c"
                          style={{ width: "80px", height: "80px" }}
                        ></lord-icon>
                        <h5 className="fs-16 mt-2">RQK Logistics</h5>
                        <p className="text-muted mb-0">ID: MFDS1400457854</p>
                        <p className="text-muted mb-0">
                          Payment Mode :{" "}
                          {orderDetails?.payment_method?.name || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className="card card-height-100">
                    <div className="card-header">
                      <div className="d-flex">
                        <h5 className="card-title flex-grow-1 mb-0">
                          Customer Details
                        </h5>
                        <div className="flex-shrink-0">
                          <a href="#" className="link-secondary">
                            View Profile
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled mb-0 vstack gap-3">
                        <li>
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <img
                                src="assets/images/users/avatar-3.jpg"
                                alt=""
                                className="avatar-sm rounded"
                              />
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="fs-14 mb-1">
                                {orderDetails?.customer?.name || "N/A"}
                              </h6>
                              <p className="text-muted mb-0">Customer</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <i className="ri-mail-line me-2 align-middle text-muted fs-16"></i>
                          {orderDetails?.customer?.email || "N/A"}
                        </li>
                        <li>
                          <i className="ri-phone-line me-2 align-middle text-muted fs-16"></i>
                          {orderDetails?.customer?.phone || "N/A"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className="card card-height-100">
                    <div className="card-header">
                      <h5 className="card-title mb-0">
                        <i className="ri-map-pin-line align-middle me-1 text-muted"></i>
                        Billing Address
                      </h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                        <li className="fw-medium fs-14">Joseph Parker</li>
                        <li>+(256) 245451 451</li>
                        <li>2186 Joyce Street Rocky Mount</li>
                        <li>New York - 25645</li>
                        <li>United States</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className="card card-height-100">
                    <div className="card-header">
                      <h5 className="card-title mb-0">
                        <i className="ri-map-pin-line align-middle me-1 text-muted"></i>
                        Shipping Address
                      </h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                        <li className="fw-medium fs-14">Joseph Parker</li>
                        <li>+(256) 245451 451</li>
                        <li>2186 Joyce Street Rocky Mount</li>
                        <li>California - 24567</li>
                        <li>United States</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className="card card-height-100">
                    <div className="card-header">
                      <h5 className="card-title mb-0">
                        <i className="ri-secure-payment-line align-bottom me-1 text-muted"></i>
                        Payment Details
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-2">
                        <div className="flex-shrink-0">
                          <p className="text-muted mb-0">Transactions:</p>
                        </div>
                        <div className="flex-grow-1 ms-2">
                          <h6 className="mb-0">
                            {orderDetails?.transaction || "N/A"}
                          </h6>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <div className="flex-shrink-0">
                          <p className="text-muted mb-0">Payment Method:</p>
                        </div>
                        <div className="flex-grow-1 ms-2">
                          <h6 className="mb-0">
                            {orderDetails?.payment_method?.name || "N/A"}
                          </h6>
                        </div>
                      </div>
                      {/* <div className="d-flex align-items-center mb-2">
                        <div className="flex-shrink-0">
                          <p className="text-muted mb-0">Card Holder Name:</p>
                        </div>
                        <div className="flex-grow-1 ms-2">
                          <h6 className="mb-0">Joseph Parker</h6>
                        </div>
                      </div> */}
                      {/* <div className="d-flex align-items-center mb-2">
                        <div className="flex-shrink-0">
                          <p className="text-muted mb-0">Card Number:</p>
                        </div>
                        <div className="flex-grow-1 ms-2">
                          <h6 className="mb-0">xxxx xxxx xxxx 2456</h6>
                        </div>
                      </div> */}
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <p className="text-muted mb-0">Total Amount:</p>
                        </div>
                        <div className="flex-grow-1 ms-2">
                          <h6 className="mb-0">
                            {getSymbolFromCurrency(store?.currency?.abbr)}&nbsp;
                            {total.toFixed(2) || "0.00"}
                          </h6>
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

      <div
        className="modal fade"
        id="showModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-light p-3">
              <h5 className="modal-title" id="exampleModalLabel"></h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="close-modal"
              ></button>
              <div className="mb-3 mt-4">
                <label htmlFor="productname-field" className="form-label">
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

              <button
                type="button"
                className="btn btn-success"
                id="edit-btn"
                onClick={()=>updateOrder(orderDetails.id)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default OrderDetail;
