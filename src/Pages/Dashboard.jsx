import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Chart from "react-apexcharts";
import Flatpickr from "react-flatpickr";
import getSymbolFromCurrency from "currency-symbol-map";
import { authUserDetails } from "../libs/app";
import RecentActivity from "../Shared/Components/RecentActivity";
import $ from 'jquery';

const Dashboard = () => {

  const { user, store, token } = authUserDetails();

  var linechartcustomerColors = ["#73dce9", "#695eef", "#ff7f41"];
  var options = {
    series: [
      {
        name: "Orders",
        type: "area",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Earnings",
        type: "bar",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Customers",
        type: "line",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: { height: 377, type: "line", toolbar: { show: !1 } },
      stroke: { curve: "straight", dashArray: [0, 0, 8], width: [2, 0, 2.2] },
      fill: { opacity: [0.1, 0.9, 1] },
      markers: { size: [0, 0, 0], strokeWidth: 2, hover: { size: 4 } },
      xaxis: {
        categories: [
          moment().subtract(7, 'days').format('YYYY-MM-DD'),
          moment().subtract(6, 'days').format('YYYY-MM-DD'),
          moment().subtract(5, 'days').format('YYYY-MM-DD'),
          moment().subtract(4, 'days').format('YYYY-MM-DD'),
          moment().subtract(3, 'days').format('YYYY-MM-DD'),
          moment().subtract(2, 'days').format('YYYY-MM-DD'),
          moment().subtract(1, 'days').format('YYYY-MM-DD'),
        ],
        axisTicks: { show: !1 },
        axisBorder: { show: !1 },
      },
      grid: {
        show: !0,
        xaxis: { lines: { show: !0 } },
        yaxis: { lines: { show: !1 } },
        padding: { top: 0, right: -2, bottom: 15, left: 10 },
      },
      legend: {
        show: !0,
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: -5,
        markers: { width: 9, height: 9, radius: 6 },
        itemMargin: { horizontal: 10, vertical: 0 },
      },
      plotOptions: { bar: { columnWidth: "30%", barHeight: "70%" } },
      colors: linechartcustomerColors,
      tooltip: {
        shared: !0,
        y: [
          {
            formatter: function (e) {
              return void 0 !== e ? e.toFixed(0) : e;
            },
          },
          {
            formatter: function (e) {
              return void 0 !== e ? "$" + e.toFixed(2) + "k" : e;
            },
          },
          {
            formatter: function (e) {
              return void 0 !== e ? e.toFixed(0) + "" : e;
            },
          },
        ],
      },
    },
  };

  var chartDonutBasicColors = ["#695eef", "rgba(105,94,239,0.85)", "rgba(105,94,239,0.70)", "rgba(105,94,239,0.60)", "rgba(105,94,239,0.45)"];
  var store_visits_by_source = {
    options: {
      labels: ["Direct", "Social", "Email", "Other", "Referrals"],
      legend: { position: "bottom" },
      stroke: { show: !1 },
      dataLabels: {
        dropShadow: {
          enabled: !1
        }
      },
      colors: chartDonutBasicColors
    },
    series: [44, 55, 41, 17, 15],
  };

  const [wallet, setWallet] = useState({
    balance: 0
  });
  const [charts, setCharts] = useState({
    ...options
  });
  const [reports, setReports] = useState({
    total_earnings: 0,
    orders: 0,
    customers: 0
  });
  const [best_selling, setBestSelling] = useState({
    items: [],
    meta: {}
  });
  const [orders, setOrders] = useState([]);

  var start = moment().subtract(7, "days");
  var end = moment();
  const [initialFrom, setInitialFrom] = useState(start.format("YYYY-MM-DD"));
  const [initialTo, setInitialTo] = useState(end.format("YYYY-MM-DD"));

  useEffect(() => {
    getData();
    getChart();
  }, [initialFrom, initialTo]);

  function getData() {
    // var _charts = axios.get(
    //   `/charts?start_date=${initialFrom}&end_date=${initialTo}`
    // );
    var _best_selling_products = axios.get("/best-selling-items");
    var _analytics = axios.get("/reports");
    var _balance = axios.get("/available-balance");
    var _recent_orders = axios.get("/orders?vendor=1&perpage=5");
    // var _sales_by_location = axios.get("/customers-by-locations");

    axios
      .all([_best_selling_products, _analytics, _balance, _recent_orders])
      .then(
        axios.spread((...response) => {
          // if (response[0].data) {
          //   _charts = response[0].data;
          //   options.series[0].data = _charts.orders;
          //   options.series[1].data = _charts.sales;
          //   options.series[2].data = _charts.customers;
          //   options.options.xaxis.categories = _charts.ticks;
          //   setCharts(options);
          // }

          if (response[0].data.success === true) {
            setBestSelling({
              items: response[0].data.items,
              meta: response[0].data.meta,
            });
          }

          if (response[1].data.success === true) {
            setReports(response[1].data.reports);
          }

          if (response[2].data.success === true) {
            if (response[2].data.wallet) {
              setWallet(response[2].data.wallet);
            }
          }

          if (response[3].data) {
            setOrders(response[3].data.orders);
          }
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }

  function getChart() {
    axios
      .get(`/charts?start_date=${initialFrom}&end_date=${initialTo}`)
      .then((response) => {
        if (response.data) {
          var _charts = response.data;
          options.series[0].data = _charts.orders;
          options.series[1].data = _charts.sales;
          options.series[2].data = _charts.customers;
          options.options.xaxis.categories = _charts.ticks;
          setCharts(...options);
        }
      })
      .catch((error) => { });
  }

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="h-100">
                <div className="row mb-3 pb-1">
                  <div className="col-12">
                    <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                      <div className="flex-grow-1">
                        <h4 className="fs-16 mb-1">
                          Hello, {user.firstname}!
                        </h4>
                        <p className="text-muted mb-0">
                          Here's what's happening with your store today.
                        </p>
                      </div>
                      <div className="mt-3 mt-lg-0">
                        <form action="">
                          <div className="row g-3 mb-0 align-items-center">
                            <div className="col-sm-auto">
                              <div className="input-group">
                                <Flatpickr
                                  type="text"
                                  className="form-control border-0 shadow"
                                  id="dash-filter-picker"
                                  defaultValue={
                                    initialFrom + " to " + initialTo
                                  }
                                  options={{ mode: "range" }}
                                  onChange={(selectedDates) => {
                                    //...
                                    if (selectedDates?.length === 2) {
                                      console.log("working!", selectedDates);
                                      var start = moment(selectedDates[0]);
                                      var end = moment(selectedDates[1]);

                                      setInitialFrom(
                                        start.format("YYYY-MM-DD")
                                      );
                                      setInitialTo(end.format("YYYY-MM-DD"));
                                    }
                                  }}
                                />
                                <div className="input-group-text bg-primary border-primary text-white">
                                  <i className="ri-calendar-2-line"></i>
                                </div>
                              </div>
                            </div>

                            <div className="col-auto">
                              <button
                                type="button"
                                className="btn btn-soft-primary btn-icon waves-effect waves-light layout-rightside-btn"
                                onClick={() => {
                                  $(".layout-rightside-col").toggleClass("d-block")
                                }}
                              >
                                <i className="ri-pulse-line"></i>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-3 col-md-6">
                    <div className="card card-animate">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                              Total Earnings
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <h5 className="text-success fs-14 mb-0">
                              <i className="ri-arrow-right-up-line fs-13 align-middle"></i>
                              +16.24 %
                            </h5>
                          </div>
                        </div>
                        <div className="d-flex align-items-end justify-content-between mt-4">
                          <div>
                            <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                              {getSymbolFromCurrency(store?.currency?.abbr)}
                              <span
                                className="counter-value"
                                data-target={reports.total_earnings}
                              >
                                {reports.total_earnings}
                              </span>
                            </h4>
                            <Link to="#" className="text-decoration-underline">
                              View net earnings
                            </Link>
                          </div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title bg-soft-primary rounded fs-3">
                              <i className="bx bx-dollar-circle text-primary"></i>
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
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                              Orders
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <h5 className="text-danger fs-14 mb-0">
                              <i className="ri-arrow-right-down-line fs-13 align-middle"></i>
                              -3.57 %
                            </h5>
                          </div>
                        </div>
                        <div className="d-flex align-items-end justify-content-between mt-4">
                          <div>
                            <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                              <span
                                className="counter-value"
                                data-target={reports.orders}
                              >
                                {reports.orders}
                              </span>
                            </h4>
                            <Link
                              to="/orders"
                              className="text-decoration-underline"
                            >
                              View all orders
                            </Link>
                          </div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title bg-soft-info rounded fs-3">
                              <i className="bx bx-shopping-bag text-info"></i>
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
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                              Customers
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <h5 className="text-success fs-14 mb-0">
                              <i className="ri-arrow-right-up-line fs-13 align-middle"></i>
                              +29.08 %
                            </h5>
                          </div>
                        </div>
                        <div className="d-flex align-items-end justify-content-between mt-4">
                          <div>
                            <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                              <span
                                className="counter-value"
                                data-target={reports.customers}
                              >
                                {reports.customers}
                              </span>
                            </h4>
                            <Link
                              to="/customers"
                              className="text-decoration-underline"
                            >
                              See all customers
                            </Link>
                          </div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title bg-soft-primary rounded fs-3">
                              <i className="bx bx-user-circle text-primary"></i>
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
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                              My Balance
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <h5 className="text-muted fs-14 mb-0">+0.00 %</h5>
                          </div>
                        </div>
                        <div className="d-flex align-items-end justify-content-between mt-4">
                          <div>
                            <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                              {getSymbolFromCurrency(store?.currency?.abbr)}
                              <span
                                className="counter-value"
                                data-target={wallet.balance}
                              >
                                {wallet.balance}
                              </span>
                            </h4>
                            <Link
                              to="/withdrawal"
                              className="text-decoration-underline"
                            >
                              Withdraw money
                            </Link>
                          </div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title bg-soft-info rounded fs-3">
                              <i className="bx bx-wallet text-info"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-8">
                    <div className="card">
                      <div className="card-header border-0 align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">
                          Overview
                        </h4>
                        <div>
                          <button
                            type="button"
                            className="btn btn-soft-secondary btn-sm me-1"
                          >
                            Today
                          </button>
                          <button
                            type="button"
                            className="btn btn-soft-primary btn-sm me-1"
                          >
                            Last 7 days
                          </button>
                          <button
                            type="button"
                            className="btn btn-soft-secondary btn-sm me-1"
                          >
                            30 days
                          </button>
                          <button
                            type="button"
                            className="btn btn-soft-secondary btn-sm me-1"
                          >
                            1 year
                          </button>
                        </div>
                      </div>

                      <div className="card-header p-0 border-0 bg-soft-light">
                        <div className="row g-0 text-center">
                          <div className="col-6 col-sm-3">
                            <div className="p-3 border border-dashed border-start-0">
                              <h5 className="mb-1">
                                <span
                                  className="counter-value"
                                  data-target={charts.series[0].data?.reduce(
                                    (a, b) => a + b,
                                    0
                                  )}
                                >
                                  {charts.series[0].data?.reduce(
                                    (a, b) => a + b,
                                    0
                                  )}
                                </span>
                              </h5>
                              <p className="text-muted mb-0">Orders</p>
                            </div>
                          </div>

                          <div className="col-6 col-sm-3">
                            <div className="p-3 border border-dashed border-start-0">
                              <h5 className="mb-1">
                                {getSymbolFromCurrency(store?.currency?.abbr)}
                                <span
                                  className="counter-value"
                                  data-target={charts.series[1].data?.reduce((a, b) => a + b, 0)
                                    // .toFixed(2)
                                  }
                                >
                                  {charts.series[1].data?.reduce(
                                    (a, b) => a + b,
                                    0
                                  )}
                                </span>
                              </h5>
                              <p className="text-muted mb-0">Earnings</p>
                            </div>
                          </div>

                          <div className="col-6 col-sm-3">
                            <div className="p-3 border border-dashed border-start-0">
                              <h5 className="mb-1">
                                <span
                                  className="counter-value"
                                  data-target={charts.series[2].data?.reduce(
                                    (a, b) => a + b,
                                    0
                                  )}
                                >
                                  {charts.series[2].data?.reduce(
                                    (a, b) => a + b,
                                    0
                                  )}
                                </span>
                              </h5>
                              <p className="text-muted mb-0">Customers</p>
                            </div>
                          </div>

                          <div className="col-6 col-sm-3">
                            <div className="p-3 border border-dashed border-start-0 border-end-0">
                              <h5 className="mb-1 text-success">
                                <span
                                  className="counter-value"
                                  data-target="18.92"
                                >
                                  0
                                </span>
                                %
                              </h5>
                              <p className="text-muted mb-0">
                                Conversation
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card-body p-0 pb-2">
                        <div className="w-100">
                          <div
                            id="customer_impression_charts"
                            data-colors='["--vz-info", "--vz-indigo", "--vz-danger"]'
                            className="apex-charts"
                            dir="ltr"
                            style={{ minHeight: 385 }}
                          >
                            {charts ? (
                              <Chart
                                options={charts.options}
                                series={charts.series}
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-4">
                    <div className="card card-height-100">
                      <div className="card-header align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">
                          Sales by Locations
                        </h4>
                        <div className="flex-shrink-0">
                          <button
                            type="button"
                            className="btn btn-soft-primary btn-sm"
                          >
                            Export Report
                          </button>
                        </div>
                      </div>

                      <div className="card-body">
                        <div
                          id="sales-by-locations"
                          data-colors='["--vz-light", "--vz-info", "--vz-primary"]'
                          style={{ height: 269 }}
                          dir="ltr"
                        ></div>

                        <div className="px-2 py-2 mt-1">
                          <p className="mb-1">
                            Canada <span className="float-end">75%</span>
                          </p>
                          <div className="progress mt-2" style={{ height: 6 }}>
                            <div
                              className="progress-bar progress-bar-striped bg-primary"
                              role="progressbar"
                              style={{ width: "75%" }}
                              aria-valuenow="75"
                              aria-valuemin="0"
                              aria-valuemax="75"
                            ></div>
                          </div>

                          <p className="mt-3 mb-1">
                            Greenland <span className="float-end">47%</span>
                          </p>
                          <div className="progress mt-2" style={{ height: 6 }}>
                            <div
                              className="progress-bar progress-bar-striped bg-primary"
                              role="progressbar"
                              style={{ width: "47%" }}
                              aria-valuenow="47"
                              aria-valuemin="0"
                              aria-valuemax="47"
                            ></div>
                          </div>

                          <p className="mt-3 mb-1">
                            Russia <span className="float-end">82%</span>
                          </p>
                          <div className="progress mt-2" style={{ height: 6 }}>
                            <div
                              className="progress-bar progress-bar-striped bg-primary"
                              role="progressbar"
                              style={{ width: "82%" }}
                              aria-valuenow="82"
                              aria-valuemin="0"
                              aria-valuemax="82"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-12">
                    <div className="card">
                      <div className="card-header align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">
                          Best Selling Products
                        </h4>
                        <div className="flex-shrink-0">
                          <div className="dropdown card-header-dropdown">
                            <Link
                              className="text-reset dropdown-btn"
                              to="#"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <span className="fw-semibold text-uppercase fs-12">
                                Sort by:
                              </span>
                              <span className="text-muted">
                                Today
                                <i className="mdi mdi-chevron-down ms-1"></i>
                              </span>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-end">
                              <Link className="dropdown-item" to="#">
                                Today
                              </Link>
                              <Link className="dropdown-item" to="#">
                                Yesterday
                              </Link>
                              <Link className="dropdown-item" to="#">
                                Last 7 Days
                              </Link>
                              <Link className="dropdown-item" to="#">
                                Last 30 Days
                              </Link>
                              <Link className="dropdown-item" to="#">
                                This Month
                              </Link>
                              <Link className="dropdown-item" to="#">
                                Last Month
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card-body">
                        <div className="table-responsive table-card">
                          <table className="table table-hover table-centered align-middle table-nowrap mb-0">
                            <tbody>
                              {best_selling.items.length > 0 ? (
                                <>
                                  {best_selling.items.map((item, index) => (
                                    <tr key={index}>
                                      <td>
                                        <div className="d-flex align-items-center">
                                          <div className="avatar-sm bg-light rounded p-1 me-2">
                                            <img
                                              src={
                                                window.isource +
                                                item.images.main
                                              }
                                              alt=""
                                              className="img-fluid d-block"
                                            />
                                          </div>
                                          <div>
                                            <h5 className="fs-14 my-1">
                                              <Link
                                                to={`product-details/${item.product.id}`}
                                                className="text-reset"
                                              >
                                                {item.product.name}
                                              </Link>
                                            </h5>
                                            <span className="text-muted">
                                              {moment(
                                                item.created_date
                                              ).format("d m, Y")}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <h5 className="fs-14 my-1 fw-normal">
                                          {item.product.price}
                                        </h5>
                                        <span className="text-muted">
                                          Price
                                        </span>
                                      </td>
                                      <td>
                                        <h5 className="fs-14 my-1 fw-normal">
                                          {item.orders}
                                        </h5>
                                        <span className="text-muted">
                                          Orders
                                        </span>
                                      </td>
                                      <td>
                                        {item.product.variation_quantity > 0 ? (
                                          <h5 className="fs-14 my-1 fw-normal">
                                            {item.product.variations_quantity}
                                            from
                                            {item.product.variations_count}
                                            variant(s)
                                          </h5>
                                        ) : (
                                          <>
                                            {item.product.quantity > 0 ? (
                                              <h5 className="fs-14 my-1 fw-normal">
                                                {item.product.quantity}
                                              </h5>
                                            ) : null}
                                          </>
                                        )}

                                        {item.product.variation_quantity === 0 &&
                                          item.product.quantity === 0 ? (
                                          <span className="badge badge-soft-danger">
                                            Out of stock
                                          </span>
                                        ) : null}
                                        <span className="text-muted">
                                          Stock
                                        </span>
                                      </td>
                                      <td>
                                        <h5 className="fs-14 my-1 fw-normal">
                                          {item.total_amount}
                                        </h5>
                                        <span className="text-muted">
                                          Amount
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </>
                              ) : (
                                <tr>
                                  <td colSpan="5">
                                    <div className="text-center mt-3 align-items-center">
                                      <p> No item available! </p>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>

                        {best_selling?.items?.length > 0 ? (
                          <div className="align-items-center mt-4 pt-2 justify-content-between d-flex">
                            <div className="flex-shrink-0">
                              <div className="text-muted">
                                Showing
                                <span className="ms-1 me-1 fw-semibold">
                                  {best_selling.meta.start_from} -
                                  {best_selling.meta.end_at}
                                </span>
                                of
                                <span className="ms-1 me-1 fw-semibold">
                                  {best_selling.meta.total}
                                </span>
                                Results
                              </div>
                            </div>
                            {best_selling?.meta.pages.length > 1 ? (
                              <ul className="pagination pagination-separated pagination-sm mb-0">
                                <li className="page-item disabled">
                                  <Link to="#" className="page-link">
                                    ←
                                  </Link>
                                </li>

                                {[...Array(best_selling.meta.pages)].map(
                                  (page, index) => {
                                    if (index <= 5) {
                                      return (
                                        <li
                                          className={
                                            "page-item " +
                                            (page === best_selling.meta.page
                                              ? " active"
                                              : null)
                                          }
                                          key={index}
                                        >
                                          <span
                                            onClick={() => { }}
                                            className="page-link"
                                          >
                                            {page}
                                          </span>
                                        </li>
                                      );
                                    }
                                  }
                                )}

                                <li className="page-item">
                                  <Link to="#" className="page-link">
                                    →
                                  </Link>
                                </li>
                              </ul>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-4">
                    <div className="card card-height-100">
                      <div className="card-header align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">
                          Store Visits by Source
                        </h4>
                        <div className="flex-shrink-0">
                          <div className="dropdown card-header-dropdown">
                            <Link
                              className="text-reset dropdown-btn"
                              to="#"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <span className="text-muted">
                                Report
                                <i className="mdi mdi-chevron-down ms-1"></i>
                              </span>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-end">
                              <Link className="dropdown-item" to="#">
                                Download Report
                              </Link>
                              <Link className="dropdown-item" to="#">
                                Export
                              </Link>
                              <Link className="dropdown-item" to="#">
                                Import
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card-body">
                        <Chart
                          dir="ltr"
                          className="apex-charts"
                          type="donut"
                          height={333}
                          options={store_visits_by_source.options}
                          series={store_visits_by_source.series}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-8">
                    <div className="card">
                      <div className="card-header align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">
                          Recent Orders
                        </h4>
                        <div className="flex-shrink-0">
                          <Link
                            to="/orders"
                            className="btn btn-soft-info btn-sm"
                          >
                            <i className="ri-file-list-3-line align-middle"></i>
                            View All
                          </Link>
                        </div>
                      </div>

                      <div className="card-body">
                        <div className="table-responsive table-card">
                          <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                            <thead className="text-muted table-light">
                              <tr>
                                <th scope="col">Order ID</th>
                                <th scope="col">Customer</th>
                                <th scope="col">Product</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Status</th>
                                <th scope="col">Rating</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                orders?.length > 0 ? (
                                  <>
                                    {orders.map((item, index) => (
                                      <tr key={index}>
                                        <td>
                                          <Link
                                            to="apps-ecommerce-order-details.html"
                                            className="fw-medium link-primary"
                                          >
                                            #{item.order_no}
                                          </Link>
                                        </td>
                                        <td>
                                          <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0 me-2">
                                              <img
                                                src="/assets/images/users/avatar-1.jpg"
                                                alt=""
                                                className="avatar-xs rounded-circle"
                                              />
                                            </div>
                                            <div className="flex-grow-1">
                                              Alex Smith
                                            </div>
                                          </div>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>
                                          <span className="text-success">
                                            {item.amount}
                                          </span>
                                        </td>
                                        <td>
                                          {item.order_group.payment_status === 111 ? (
                                            <span className="badge badge-soft-success">
                                              Paid
                                            </span>
                                          ) : null}

                                          {item.order_group.payment_status === 316 ? (
                                            <span className="badge badge-soft-warning">
                                              Pending
                                            </span>
                                          ) : null}

                                          {item.order_group.payment_status === 901 ? (
                                            <span className="badge badge-soft-danger">
                                              Unpaid
                                            </span>
                                          ) : null}
                                        </td>
                                        <td>
                                          <h5 className="fs-14 fw-medium mb-0">
                                            {item.rate}
                                            <span className="text-muted fs-11 ms-1">
                                              ({item.review_count} votes)
                                            </span>
                                          </h5>
                                        </td>
                                      </tr>
                                    ))}
                                  </>
                                ) : (
                                  <tr>
                                    <td colSpan='6'>
                                      <div className="text-center align-items-center">
                                        <p> No item available! </p>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <RecentActivity />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Dashboard;
