import axios from "axios";
// import flatpickr from "flatpickr";
import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { jQuery as $ } from "../../loader";

import MyDropzone from "../../Components/MyDropZone";
import TextEditor from "../../Components/TextEditor";
import ValidateSubmit, {
  ClearAppMessage,
  AppMessage,
  toggleLoader,
  responseMessage,
} from "../../libs/app";
import VariationField from "./VariationField";
import { event } from "jquery";
import Variant from "./Variant";
import VariationOption from "./VariationOption";
import { FiTrash2 } from "react-icons/fi";
import CreatableInputOnly from "../../Components/CreatableInputOnly";
import Flatpickr from "react-flatpickr";
import moment from "moment";

const ProductUpload = (props) => {

  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const [images, setProductImages] = useState({
    main: '',
    gallery: []
  });
  const [description, setDescription] = useState("");
  const [seo, setSeo] = useState({});
  const [settings, setSettings] = useState({});
  const [inventory, setInventory] = useState({});
  const [productVariations, setProductVariations] = useState([]);
  const [productVariationOptions, setProductVariationOptions] = useState([]);
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [variants, setVariants] = useState([]);
  const [variations, setVariations] = useState([]);
  const [variation_count, setVariationCount] = useState(0);
  const [change_collection_mode, setChangeCollectionMode] = useState(true);
  const [formatted, setFormatted] = useState([]);
  const [publish, setPublish] = useState(true);
  const [variantSelectedForRemoval, setVariantSelectedForRemoval] = useState(null);
  const [hashtags, setHashTags] = useState([]);


  const availability_types = [
    { id: 1, label: 'Available in store' },
    { id: 2, label: 'Made on request' },
    { id: 3, label: 'Not available' },
  ];

  const visibility_types = [
    { id: 0, label: 'Public' },
    { id: 1, label: 'Hidden' },
  ];

  var initial = moment();
  const [initialDate, setInitialDate] = useState(initial.format("YYYY-MM-DD"));


  useEffect(() => {
    getCollections();
    getProductDetails();

    if (props.mode == "new") {
      checkImagesInLocalStorage();
    }

    formatVariations();
  }, [variations, variantSelectedForRemoval]);

  const getCollections = () => {
    axios
      .get("/collections")
      .then((response) => {
        var collection = response.data;
        setCollections(collection.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProductDetails = () => {
    if (product_id && props.mode == "edit") {
      setChangeCollectionMode(false);
      axios
        .get(`/product/details/${product_id}`)
        .then((response) => {
          var data = response.data.product;
          setProduct(data);
          setSettings(data.settings);
          setSeo(data.seo);
          setInventory(data.inventory);
          setProductImages(data.images);
          setDescription(data.description);

          if (data.hash_tags != null) {
            var hash_tags = data.hash_tags.split(',');
            var tags = hashtags;
            hash_tags.forEach((tag, index) => {
              tags[index] = { label: tag, value: tag };
            })
            setHTags(tags);
          }

          if (data.variations) {
            setProductVariations(data.variations);
            setProductVariationOptions(data.variation_options);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const getProductVariations = () => {

  };

  const setHTags = (tags) => {
    setHashTags(tags);
  };

  const setPublishDate = (date) => {
    var settingData = { ...settings, publish_schedule: date };
    setSettings(settingData);
    setInitialDate(date);
  };

  const checkImagesInLocalStorage = () => {
    var localImages = JSON.parse(localStorage.getItem("images"));
    if (localImages != null) {
      var $images = {
        main: localImages[0],
        gallery: localImages.splice(1),
      };

      setProductImages($images);
    }
  };

  const removeMainImage = () => {

    const newImages = {
      ...images,
      main: images.gallery.length ? images.gallery[0] : "",
      gallery: images.gallery.splice(1),
    };

    var $data = {
      ...newImages,
      product_id: product.id,
      gallery: newImages.gallery.join(","),
      image_location: images.main,
    };

    if (props.mode == "edit") {

      axios
        .post(`/update-product-images`, $data)
        .then((response) => {
          if (response.data.success) {
            responseMessage(response.data.message, "success");
            setProductImages(response.data.images);
          } else {
            responseMessage(response.data.error.message, "error");
          }
        })
        .catch((error) => {
          responseMessage(error, "error");
        });
    } else {
      var lsImages = JSON.parse(localStorage.getItem("images"));
      lsImages.splice(0, 1);

      console.log($data);

      axios
        .post(`/remove-image`, $data)
        .then((response) => {
          if (response.data.success) {
            responseMessage(response.data.message, "success");
            localStorage.getItem("images", lsImages);
            setProductImages(newImages);
          } else {
            responseMessage(response.data.error.message, "error");
          }
        })
        .catch((error) => {
          responseMessage(error, "error");
        });
    }
  };

  const removeGalleryImage = (index) => {
    var rmImages = images.gallery.splice(index, 1);

    const newImages = {
      ...images,
      gallery: images.gallery.join(","),
    };

    var $data = {
      ...newImages,
      image_location: rmImages.join(""),
    };

    if (props.mode == "edit") {
      $data.product_id = product.id;

      axios
        .post(`/update-product-images`, $data)
        .then((response) => {
          if (response.data.success) {
            responseMessage(response.data.message, "success");
            setProductImages(response.data.images);
          } else {
            responseMessage(response.data.error.message, "error");
          }
        })
        .catch((error) => {
          responseMessage(error, "error");
        });
    } else {
      var lsImages = JSON.parse(localStorage.getItem("images"));
      lsImages.splice(index + 1, 1);

      axios
        .post(`/remove-image`, $data)
        .then((response) => {
          if (response.data.success) {
            responseMessage(response.data.message, "success");
            localStorage.getItem("images", lsImages);
          } else {
            responseMessage(response.data.error.message, "error");
          }
        })
        .catch((error) => {
          responseMessage(error, "error");
        });
      setProductImages(newImages);
    }
  };

  const addVariation = () => {
    var count = variation_count + 1;
    setVariationCount(count);
  };

  const removeVariation = (id) => {
    var newVariants = variants.splice(id++, 1);
    var newVariations = variations.splice(id++, 1);

    setVariations(newVariations);
    setVariants(newVariants);

    var reduce = variation_count - 1;
    setVariationCount(reduce);
  };

  const extractOptions = (index, value) => {
    let vari = variations;
    vari[index] = value;
    setVariations([...vari]);
  };

  const extractVariants = (index, value) => {
    let variant = [...variants];
    variant[index] = value;
    setVariants(variant);
  };

  const extractHashTags = (index, value) => {
    setHashTags([...value]);
  }

  const exist = (list, item) => {

    var search = list.find(element => {
      if (element.variant === item.value) {
        return true;
      }
      return false
    });

    return search;
  }

  const formatVariations = () => {
    var formats = [];

    variations.map((options, index) => {
      let group = variants[index];
      let value = options;

      if (group && options.length > 0) {
        let variation_holder = [],
          counter = 0;

        if (index == 0) {
          value.map((details, index) => {
            if (!(formats.indexOf(details) > -1) && !exist(productVariationOptions, details)) {
              formats[index] = details;
            }
          });
        } else {
          formats.map((format) => {

            value.map((details) => {
              var mapped = {
                value: format.value + "/" + details.value,
                label: format.label + " / " + details.label,
              };

              if (!(variation_holder.indexOf(mapped) > -1) && !exist(productVariationOptions, mapped)) {
                variation_holder[counter] = mapped;

                counter++;
              }
            });
          });

          formats = variation_holder;
        }
      }
    });
    setFormatted(formats);
  };

  const handleProductDetailsChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;

    setProduct({ ...product, [name]: value });
  };

  const handleProductInventoryChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;

    setInventory({ ...inventory, [name]: value });
  };

  const handleProductSettingsChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;

    setSettings({ ...settings, [name]: value });
  };

  const handleProductSeoChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;

    setSettings({ ...seo, [name]: value });
  };

  const handlePublishChange = (e) => {
    if ($(e.target).prop("checked") == true) {
      setPublish(true);
    } else {
      setPublish(false);
    }
  };

  const handleCollectionChange = async (e) => {
    // Check Categories
    try {
      var id = e.target.value;
      var response = axios.get(`/collection/categories/${id}`);
      var categories = (await response).data;
      if (categories.data) {
        setCategories(categories.data);
        setSubCategories([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoriesChange = async (e) => {
    // Check Categories
    try {
      var id = e.target.value;
      var response = axios.get(`/categories/sub-categories/${id}`);
      var categories = (await response).data;
      if (categories.data) {
        setSubCategories(categories.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveAsDraft = (e) => handleProductSubmit(e);
  const saveAndClose = (e) => handleProductSubmit(e, true);

  const handleProductSubmit = (e, close = false) => {

    if (null !== e) {
      e.preventDefault();
    }

    if (ValidateSubmit(false, true)) {
      ClearAppMessage($("#message-box"));

      toggleLoader(true);

      var formdata = new FormData(document.getElementById("ProductUploadForm"));
      formdata.append("description", description);
      formdata.append("publish", publish);
      for (var key in settings) {
        formdata.append(key, settings[key]);
      }

      var hash_tags = [];
      hashtags.map((data) => (
        hash_tags.push(data.value)
      ));

      formdata.append("hash_tags", hash_tags.join(','));

      if (props.mode == "edit") {
        formdata.append("id", product.id);
      }

      if (props.mode == "new") {
        formdata.append("main", images.main);
        formdata.append("gallery", images.gallery);
      }

      if (formatted) {
        formdata.append("variations", JSON.stringify(variants));
        formdata.append("variation_options", JSON.stringify(variations));
      }

      var data = formdata;

      if (props.mode == "new") {
        var _url = `/product/create`;
      } else if (props.mode == "edit") {
        var _url = `/product/update`;
      }

      axios
        .post(_url, data)
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem("images", null);
            getProductDetails();

            // Notification
            responseMessage(response.data.message, "success");
            if (props.mode == "new" || close == true) {
              window.location = "/products";
            }
          } else {
            AppMessage("error", response.data.error.message, $("#message-box"));
          }

          toggleLoader(false);
        })
        .catch((error) => {
          AppMessage(
            "error",
            "Unable to create account. Please try again later.",
            $("#message-box")
          );
          toggleLoader(false);
        });
    }
  };

  const deleteVariant = async () => {

    try {

      var request = axios.delete(`/product/variant/remove/${product_id}/${variantSelectedForRemoval}`);
      var response = (await request).data;

      if (response.success) {
        setVariantSelectedForRemoval(null);
        responseMessage(response.message, "success");
      }

    } catch (error) {
      if (error.response) {
        return responseMessage(error.response.error.message, "danger");
      }

      responseMessage("Something went wrong, please try again!", "danger");
    }

  }

  const removeVariantOption = () => {
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
                    setVariantSelectedForRemoval(null);
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
                      Are you sure You want to remove this variant?
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                  <button
                    type="button"
                    className="btn w-sm btn-light"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setVariantSelectedForRemoval(null);
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn w-sm btn-danger"
                    onClick={deleteVariant}
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
  }

  return (
    <>
      {variantSelectedForRemoval ? removeVariantOption() : null}
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                {props.mode == "new" ? (
                  <h4 className="mb-sm-0">Create Product</h4>
                ) : (
                  <h4 className="mb-sm-0">Edit Product</h4>
                )}

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="#">Store</a>
                    </li>
                    {props.mode == "new" ? (
                      <li className="breadcrumb-item active">Create Product</li>
                    ) : (
                      <li className="breadcrumb-item active">Edit Product</li>
                    )}
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <form id="ProductUploadForm">
            <div className="row">
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-body">
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Product Title
                      </label>
                      <input
                        type="text"
                        name="name"
                        validatefield="true"
                        validationoutput="#titleError"
                        validationmessage="Product title cannot be empty!*"
                        value={product.name}
                        onChange={(e) => {
                          handleProductDetailsChange(e);
                        }}
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter product title"
                      />
                      <span id="titleError"></span>
                    </div>
                    <div>
                      <label>Product Description </label>
                      <TextEditor
                        value={description}
                        setValue={setDescription}
                      />
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Product Gallery</h5>
                    <p className="text-muted m-0 p-0">Add Product Images.</p>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {images.main ? (
                        <div className="col-md-5">
                          <div className="bg-light rounded img-display">
                            <div className="img-display__overlay">
                              <span
                                className="img-display__overlay__remove-btn"
                                onClick={removeMainImage}
                              >
                                <FiTrash2 size={15} />
                              </span>
                            </div>
                            <img
                              data-dz-thumbnail
                              className="img-fluid rounded d-block"
                              src={images.main}
                              alt="Product-Image"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="col-md-5">
                          <MyDropzone
                            message="Select product images"
                            smallsize={false}
                            product={product_id}
                            setProductImages={setProductImages}
                          />
                        </div>
                      )}

                      <div className="col-md-7">
                        <div className="row">
                          {images.gallery.length > 0 ? (
                            <>
                              {images.gallery.map((image, index) => (
                                <div
                                  className={
                                    "col-4 p-0 ps-1 pe-1 " +
                                    (index < 2 ? "mb-2" : "")
                                  }
                                  key={index}
                                >
                                  <div className="img-thumb">
                                    <div className="bg-light rounded img-display">
                                      <div className="img-display__overlay">
                                        <span
                                          className="img-display__overlay__remove-btn"
                                          onClick={() => {
                                            removeGalleryImage(index);
                                          }}
                                        >
                                          <FiTrash2 size={15} />
                                        </span>
                                      </div>
                                      <img
                                        data-dz-thumbnail
                                        className="img-fluid rounded d-block"
                                        src={image}
                                        alt="Product-Image"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </>
                          ) : null}

                          {images.main && images.gallery.length < 5 ? (
                            <div className="col-4 p-1">
                              <MyDropzone
                                message="Add images"
                                smallsize={true}
                                product={product_id}
                                setProductImages={setProductImages}
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="progress mt-2 hide">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: 0 }}
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        25%
                      </div>
                    </div>
                    <div id="uploadStatus" className="mt-2 text-center"></div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <ul
                      className="nav nav-tabs-custom card-header-tabs border-bottom-0"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-bs-toggle="tab"
                          href="#addproduct-general-info"
                          role="tab"
                        >
                          General Info
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-bs-toggle="tab"
                          href="#addproduct-metadata"
                          role="tab"
                        >
                          Meta Data
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="card-body">
                    <div className="tab-content">
                      <div
                        className="tab-pane active"
                        id="addproduct-general-info"
                        role="tabpanel"
                      >
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="manufacturer-name-input"
                          >
                            Manufacturer Name
                          </label>
                          <input
                            type="text"
                            name="manufacturer"
                            value={inventory.manufacturer}
                            onChange={(e) => handleProductInventoryChange(e)}
                            className="form-control"
                            id="manufacturer-name-input"
                            placeholder="Enter manufacturer name"
                          />
                        </div>

                        <div className="row">
                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="product-price-input"
                              >
                                Brand Name
                              </label>
                              <input
                                type="text"
                                name="brand"
                                value={product.brand}
                                onChange={(e) => handleProductDetailsChange(e)}
                                className="form-control"
                                id="product-brand-input"
                                placeholder="Enter brand"
                                aria-label="Brand"
                                aria-describedby="product-brand-addon"
                              />
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="product-model-input"
                              >
                                Model ID
                              </label>
                              <input
                                type="text"
                                name="model"
                                value={inventory.model}
                                onChange={(e) =>
                                  handleProductInventoryChange(e)
                                }
                                className="form-control"
                                id="product-model-input"
                                placeholder="Model ID"
                                aria-label="Model"
                                aria-describedby="product-model-addon"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="manufacturer-number-input"
                              >
                                Manufacturer Number
                              </label>
                              <input
                                type="text"
                                name="manufacturer_part_number"
                                value={inventory.manufacturer_part_number}
                                onChange={(e) =>
                                  handleProductInventoryChange(e)
                                }
                                className="form-control"
                                id="manufacturer-number-input"
                                placeholder="Enter manufacturer number"
                              />
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="product-price-input"
                                  >
                                    Price
                                  </label>
                                  <div className="input-group mb-3">
                                    <span
                                      className="input-group-text"
                                      id="product-price-addon"
                                    >
                                      $
                                    </span>
                                    <input
                                      type="text"
                                      name="price"
                                      value={product.price}
                                      onChange={(e) =>
                                        setProduct({
                                          ...product,
                                          price: e.target.value,
                                        })
                                      }
                                      className="form-control"
                                      id="product-price-input"
                                      placeholder="Enter price"
                                      aria-label="Price"
                                      aria-describedby="product-price-addon"
                                      validatefield="true"
                                      validationoutput="#priceError"
                                      validationmessage="required*"
                                    />
                                    <span id="priceError"></span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="product-discount-input"
                                  >
                                    Discount
                                  </label>
                                  <div className="input-group mb-3">
                                    <span
                                      className="input-group-text"
                                      id="product-discount-addon"
                                    >
                                      %
                                    </span>
                                    <input
                                      type="text"
                                      name="discount"
                                      value={product.discount}
                                      onChange={(e) =>
                                        handleProductDetailsChange(e)
                                      }
                                      className="form-control"
                                      id="product-discount-input"
                                      placeholder="Enter discount"
                                      aria-label="discount"
                                      aria-describedby="product-discount-addon"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="sku-brand-input"
                              >
                                Store keeping unit (SKU)
                              </label>
                              <input
                                type="text"
                                name="sku"
                                value={inventory.sku}
                                onChange={(e) =>
                                  handleProductInventoryChange(e)
                                }
                                className="form-control"
                                id="sku-brand-input"
                                placeholder="Enter SKU"
                              />
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="product-quantity-input"
                                  >
                                    Quantity
                                  </label>
                                  <input
                                    type="number"
                                    name="quantity"
                                    value={product.quantity}
                                    onChange={(e) =>
                                      handleProductDetailsChange(e)
                                    }
                                    className="form-control"
                                    id="product-quantity-input"
                                    placeholder=""
                                    aria-label="quantity"
                                    aria-describedby="product-quantity-addon"
                                  />
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="product-cost-input"
                                  >
                                    Cost/Unit
                                  </label>
                                  <div className="input-group mb-3">
                                    <span
                                      className="input-group-text"
                                      id="product-cost-addon"
                                    >
                                      $
                                    </span>
                                    <input
                                      type="text"
                                      name="cost_price"
                                      value={product.cost_price}
                                      onChange={(e) =>
                                        handleProductDetailsChange(e)
                                      }
                                      className="form-control"
                                      id="product-cost-input"
                                      placeholder="Enter cost"
                                      aria-label="Cost"
                                      aria-describedby="product-cost-addon"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="tab-pane"
                        id="addproduct-metadata"
                        role="tabpanel"
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="meta-title-input"
                              >
                                Meta title
                              </label>
                              <input
                                type="text"
                                name="meta_title"
                                value={seo.meta_title}
                                onChange={(e) => handleProductSeoChange(e)}
                                className="form-control"
                                placeholder="Enter meta title"
                                id="meta-title-input"
                              />
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="meta-keywords-input"
                              >
                                Meta Keywords
                              </label>
                              <input
                                type="text"
                                value={seo.meta_keywords}
                                onChange={(e) => handleProductSeoChange(e)}
                                name="meta_keywords"
                                className="form-control"
                                placeholder="Enter meta keywords"
                                id="meta-keywords-input"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label
                            className="form-label"
                            htmlFor="meta-description-input"
                          >
                            Meta Description
                          </label>
                          <textarea
                            name="meta_description"
                            value={seo.meta_description}
                            onChange={(e) => handleProductSeoChange(e)}
                            className="form-control"
                            id="meta-description-input"
                            placeholder="Enter meta description"
                            rows="3"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Variations</h5>
                  </div>

                  <div className="card-body">
                    <div className="VariationsBox p-2 ">

                      {
                        productVariations.map((variation, index) => {
                          return (
                            <VariationField
                              value={variation}
                              extractVariants={extractVariants}
                              extractOptions={extractOptions}
                              removeVariation={removeVariation}
                              id={index}
                              key={index}
                            />
                          )
                        })
                      }


                      {[...Array(variation_count)].map((count, index) => {
                        return (
                          <VariationField
                            extractVariants={extractVariants}
                            extractOptions={extractOptions}
                            removeVariation={removeVariation}
                            id={index + productVariations.length}
                            key={index + productVariations.length}
                          />
                        );
                      })}
                    </div>
                    <div className="mb-3">
                      <button
                        type="button"
                        onClick={addVariation}
                        className="btn btn-secondary w-sm "
                      >
                        Add Variations
                      </button>
                    </div>

                    {/* Variation List Section */}

                    {formatted.length > 0 ? (
                      <div className="border-top row">
                        <h5 className="card-title m-0 mt-4 mb-3">Preview</h5>
                        {formatted.map((variant, index) => (
                          <Variant
                            variant={variant}
                            product={product}
                            key={index}
                            mode={props.mode}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>

                {productVariations.length > 0 &&
                  productVariationOptions.length > 0 ? (
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Variation Options</h5>
                    </div>

                    <div className="card-body">
                      <div className="VariationsBox p-2 "></div>

                      {/* Variation List Section */}
                      {productVariationOptions.length > 0 ? (
                        <div className="mt-2 border-top row">
                          {productVariationOptions.map((option, index) => (
                            <VariationOption
                              option={option}
                              images={images}
                              key={index}
                              setVariantSelectedForRemoval={setVariantSelectedForRemoval}
                            />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="col-lg-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Publish Settings</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label htmlFor="availability" className="form-label">
                        Availability
                      </label>

                      <select
                        className="form-select"
                        name="availability"
                        id="availability"
                        data-choices
                        data-choices-search-false
                      >
                        {
                          availability_types.map((data, index) => (
                            product.availability === data.id ? (
                              <option value={data.id} key={index} selected={data.id}>{data.label}</option>
                            ) : (
                              <option value={data.id} key={index}>{data.label}</option>
                            )
                          ))
                        }
                      </select>
                    </div>

                    <div>
                      <label htmlFor="visibility" className="form-label">
                        Visibility
                      </label>
                      <select
                        className="form-select"
                        name="visibility"
                        id="visibility"
                        data-choices
                        data-choices-search-false
                      >
                        {
                          visibility_types.map((data, index) => (
                            product.hide === data.id ? (
                              <option value={data.id} key={index} selected={data.id}>{data.label}</option>
                            ) : (
                              <option value={data.id} key={index}>{data.label}</option>
                            )
                          ))
                        }
                      </select>
                    </div>

                    <div className="mt-3">
                      <div className="form-check">
                        <input
                          onChange={(e) => handlePublishChange(e)}
                          className="form-check-input"
                          type="checkbox"
                          id="formCheck2"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="formCheck2"
                        >
                          Publish to Marketplace
                        </label>
                      </div>
                    </div>

                    {/* <div className="mt-3">
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary w-sm">
                        Publish
                      </button>
                    </div>
                  </div> */}
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Publish Schedule</h5>
                  </div>

                  <div className="card-body">
                    <div>
                      <label
                        htmlFor="datepicker-publish-input"
                        className="form-label"
                      >
                        Publish Date & Time
                      </label>
                      <div className="row g-3 mb-0 align-items-center">
                        <div className="col-sm-auto">
                          <div className="input-group">
                            <Flatpickr
                              type="text"
                              className="form-control border-0 shadow"
                              id="dash-filter-picker"
                              defaultValue={initialDate}
                              options={{ mode: "single" }}
                              onChange={(selectedDates) => {
                                if (selectedDates) {
                                  var date = moment(selectedDates[0]);
                                  setPublishDate(date.format("YYYY-MM-DD"));
                                }
                              }}
                            />
                            <div className="input-group-text bg-primary border-primary text-white">
                              <i className="ri-calendar-2-line"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Product Categories</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      {product.collection ? (
                        <span className="badge badge-label bg-primary">
                          <i className="mdi mdi-circle-medium"></i>
                          {product.collection}
                        </span>
                      ) : null}
                      {product.category ? (
                        <span className="badge badge-label bg-secondary">
                          <i className="mdi mdi-circle-medium"></i>
                          {product.category}
                        </span>
                      ) : null}
                      {product.sub_category ? (
                        <span className="badge badge-label bg-success">
                          <i className="mdi mdi-circle-medium"></i>
                          {product.sub_category}
                        </span>
                      ) : null}
                    </div>
                    {change_collection_mode == false ? (
                      <div className="mb-2">
                        <p className="text-muted text-center mb-2">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setChangeCollectionMode(true);
                            }}
                            className="text-decoration-underline"
                          >
                            <b>Change Collection</b>
                          </a>
                        </p>
                      </div>
                    ) : null}

                    <div className={change_collection_mode ? "show" : "hide"}>
                      <div className="mb-2">
                        <p className="text-muted mb-2">
                          {/* <a
                            href="#"
                            className="float-end text-decoration-underline"
                          >
                            Add New
                          </a> */}
                          Select collection
                        </p>
                        <select
                          className="form-select"
                          name="collection"
                          id="collection"
                          onChange={(e) => {
                            handleCollectionChange(e);
                          }}
                          data-choices
                          data-choices-search-false
                          data-choices-sorting="true"
                        >
                          <option value={""} defaultValue>
                            Select..
                          </option>
                          {collections?.map((collection, index) => (
                            <option value={collection.id} key={index}>
                              {collection.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div
                        className={
                          "mb-2 " + (categories.length > 0 ? "show" : "hide")
                        }
                      >
                        <p className="text-muted mb-2">
                          {/* <a
                            href="#"
                            className="float-end text-decoration-underline"
                          >
                            Add New
                          </a> */}
                          Select category
                        </p>
                        <select
                          className="form-select"
                          name="category"
                          id="category"
                          onChange={(e) => {
                            handleCategoriesChange(e);
                          }}
                          data-choices
                          data-choices-search-false
                          data-choices-sorting="true"
                        >
                          <option value={"0"} defaultValue>
                            Select..
                          </option>
                          {categories?.map((category, index) => (
                            <option value={category.id} key={index}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div
                        className={
                          "mb-2 " + (subcategories.length > 0 ? "show" : "hide")
                        }
                      >
                        <p className="text-muted mb-2">
                          {/* <a
                            href="#"
                            className="float-end text-decoration-underline"
                          >
                            Add New
                          </a> */}
                          Select Sub-category
                        </p>
                        <select
                          className="form-select"
                          name="sub_category"
                          id="sub_category"
                          data-choices
                          data-choices-search-false
                          data-choices-sorting="true"
                        >
                          <option value={"0"} defaultValue>
                            Select..
                          </option>
                          {subcategories?.map((category, index) => (
                            <option value={category.id} key={index}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Product Tags</h5>
                  </div>
                  <div className="card-body">
                    <div className="hstack gap-3 align-items-start">
                      <div className="flex-grow-1">
                        <CreatableInputOnly
                          id={0}
                          defaultValues={hashtags}
                          extractOptions={extractHashTags}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">
                      Product Care Information
                    </h5>
                  </div>
                  <div className="card-body">
                    <p className="text-muted mb-2">
                      Add care information for product
                    </p>
                    <textarea
                      className="form-control"
                      name="care_information"
                      value={inventory.care_information}
                      placeholder="Must enter minimum of a 100 characters"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8">
                <div className="text-end mb-3">
                  {/* <button type="button" className="btn btn-success w-sm">
                    {props.mode == "new" ? "Save and continue" : "Save Changes"}
                  </button> */}
                  {props.mode == "new" ? (
                    <>
                      <button
                        type="button"
                        onClick={(e) => saveAsDraft(e)}
                        className="btn ms-1 btn-primary w-sm"
                      >
                        Save as Draft
                      </button>
                      <button
                        type="button"
                        onClick={(e) => saveAndClose(e)}
                        className="btn ms-1 btn-success w-sm"
                      >
                        Save and Close
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => saveAndClose(e)}
                      className="btn btn-primary ms-2 w-sm"
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default ProductUpload;
