import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { responseMessage } from "../../libs/app";
import { Spinner } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <span>
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0 me-3">
          <div className="avatar-sm bg-light rounded p-1">
            <img
              // src={window.isource + product.images.main}
              src={window.isource}
              alt=""
              className="img-fluid d-block"
            />
          </div>
        </div>
        <div className="flex-grow-1">
          <h5 className="fs-14 mb-1">
            <Link to={"/product-details/" + product.id} className="text-dark">
              {product?.name || 'N/A'}
            </Link>
          </h5>
          <p className="text-muted mb-0">
            <span className="fw-medium">
              {product.collection +
                (product.category != null ? `, ${product.category}` : "") +
                (product.sub_category != null
                  ? `, ${product.sub_category} `
                  : "")}
            </span>
          </p>
        </div>
      </div>
    </span>
  );
};

const Rating = ({ product }) => {
  return (
    <span>
      <span className="badge bg-light text-body fs-12 fw-medium">
        <i className="mdi mdi-star text-warning me-1"></i>
        {product?.rating?.rate}
      </span>
    </span>
  );
};

const Published = ({ product }) => {
  return (
    <span>
      {product?.published?.date || 'N/A'}
      <small className="text-muted ms-1">{product?.published?.time}</small>
    </span>
  );
};

const Action = ({ product, signal }) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => { }, [deleteConfirmation]);

  const deleteProduct = (product) => {
    setDeleteConfirmation(product);
  };

  const confirmDelete = () => {
    axios
      .delete(`/product/delete/${product.id}`)
      .then((response) => {
        if (response.data.success) {
          setDeleteConfirmation(null);
          responseMessage(response.data.message, "success");
          signal(product.id);
        } else {
          responseMessage(response.data.error.message, "error");
        }
      })
      .catch((error) => {
        responseMessage(error, "error");
      });
  };

  const removeItem = ({ product }) => {
    return (
      <>
        <div
          id="removeItemModal"
          className="modal fade zoomIn show"
          tabIndex="-1"
          aria-hidden="true"
          style={{ display: "block" }}
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
                  onClick={() => {
                    setDeleteConfirmation(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mt-2 text-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/gsqxdxog.json"
                    trigger="loop"
                    colors="primary:#f7b84b,secondary:#f06548"
                    style={{ width: "100px", height: "100px" }}
                  ></lord-icon>
                  <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                    <h4>Are you Sure ?</h4>
                    <p className="text-muted mx-4 mb-0">
                      Are you sure You want to remove this Product ?
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                  <button
                    type="button"
                    className="btn w-sm btn-light"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setDeleteConfirmation(null);
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn w-sm btn-danger "
                    // id="delete-product"
                    onClick={confirmDelete}
                  >
                    Yes, Delete It!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show"></div>
      </>
    );
  };

  return (
    <>
      {deleteConfirmation ? removeItem(deleteConfirmation) : null}
      <span>
        <div className="dropdown">
          <button
            className="btn btn-soft-secondary btn-sm dropdown"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="ri-more-fill"></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <Link
                className="dropdown-item"
                to={"/product-details/" + product.id}
              >
                <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                View
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to={"/product-edit/" + product.id}>
                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                Edit
              </Link>
            </li>
            <li className="dropdown-divider"></li>
            <li>
              <Link
                className="dropdown-item"
                to="#"
                data-bs-toggle="modal"
                data-bs-target="#removeItemModal"
                onClick={(e) => deleteProduct(product)}
              >
                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                Delete
              </Link>
            </li>
          </ul>
        </div>
      </span>
    </>
  );
};

const Products = ({ }) => {

  const [reload, signal] = useState("off");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [counts, setProductCounts] = useState({
    all: 0,
    published: 0,
    draft: 0,
  });

  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    getProducts();
  }, [reload]);

  async function getProducts() {
    try {
      var getProducts = axios.get("/products");
      var response = (await getProducts).data.data;
      let resFromArray = response.map(res => res)
      if (resFromArray) {
        var list = resFromArray;
        setProducts(list);
      }
    } catch (error) { }
    setLoading(false);
  }

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Products</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/">Store</Link>
                    </li>
                    <li className="breadcrumb-item active">Products</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div>
                <div className="card">
                  <div className="card-header border-0">
                    <div className="row g-4">
                      <div className="col-sm">
                        <div className="d-flex justify-content-sm-end">
                          {/* <div className="search-box ms-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Products..."
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div> */}
                        </div>
                      </div>
                      <div className="col-sm-auto">
                        <div>
                          <Link to="/add-product" className="btn btn-primary">
                            <i className="ri-add-line align-bottom me-1"></i>
                            Add Product
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <ul
                          className="nav nav-tabs-custom card-header-tabs border-bottom-0"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <Link
                              className="nav-link text-body active fw-semibold"
                              data-bs-toggle="tab"
                              to="#productnav-all"
                              role="tab"
                            >
                              All
                              <span className="badge badge-soft-danger align-middle rounded-pill ms-1">
                                {counts.all}
                              </span>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="nav-link text-body fw-semibold"
                              data-bs-toggle="tab"
                              to="#productnav-published"
                              role="tab"
                            >
                              Published
                              <span className="badge badge-soft-danger align-middle rounded-pill ms-1">
                                {counts.published}
                              </span>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="nav-link text-body fw-semibold"
                              data-bs-toggle="tab"
                              to="#productnav-draft"
                              role="tab"
                            >
                              Draft
                              <span className="badge badge-soft-danger align-middle rounded-pill ms-1">
                                {counts.draft}
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-auto">
                        <div id="selection-element">
                          <div className="my-n1 d-flex align-items-center text-muted">
                            Select
                            <div
                              id="select-content"
                              className="text-body fw-semibold px-1"
                            ></div>
                            Result
                            <button
                              type="button"
                              className="btn btn-link link-danger p-0 ms-3"
                              data-bs-toggle="modal"
                              data-bs-target="#removeItemModal"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    {
                      !loading ? (
                        <div>
                          <div className="table-responsive table-card">
                            {products.length > 0 ? (
                              <table
                                className="table align-middle table-nowrap"
                                id="ProductsTable"
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
                                      data-sort="product_id"
                                    >
                                      ID
                                    </th>
                                    <th
                                      className="sort text-uppercase"
                                      data-sort="product_name"
                                    >
                                      Product
                                    </th>
                                    <th
                                      className="sort text-uppercase"
                                      data-sort="stock"
                                    >
                                      Stock
                                    </th>
                                    <th
                                      className="sort text-uppercase"
                                      data-sort="price"
                                    >
                                      Price
                                    </th>
                                    <th
                                      className="sort text-uppercase"
                                      data-sort="rating"
                                    >
                                      Rating
                                    </th>
                                    <th
                                      className="sort text-uppercase"
                                      data-sort="published"
                                    >
                                      Published
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
                                  {products.map((product, index) => (
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
                                          to={`product-details/${product.id}`}
                                          className="fw-semibold link-dark"
                                        >
                                          #{product?.id || 'N/A'}
                                        </Link>
                                      </td>
                                      <td className="product_name">
                                        <Product product={product || 'N/A'} />
                                      </td>
                                      <td className="stock">{product?.quantity}</td>
                                      <td className="price">{product?.price || 'N/A'}</td>
                                      <td className="rating">
                                        <Rating product={product} />
                                      </td>
                                      <td className="published">
                                        <Published product={product} />
                                      </td>
                                      <td>
                                        <Action product={product} signal={signal} />
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
                      ) : (
                        <>
                          <div className="d-flex justify-content-center">
                            <Spinner animation="border" variant="primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </Spinner>
                          </div>
                        </>
                      )
                    }

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
      </div>
      <Outlet />
    </>
  );
};

export default Products;
