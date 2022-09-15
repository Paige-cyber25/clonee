import React, { useState } from "react";

const Variant = ({ variant, product, mode }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  return (
    <>
      <div className="d-flex col-md-12 variant justify-content-between">
        {/* <div
          className="variant__image me-1"
          data-bs-toggle="modal"
          data-bs-target="#zoomInModal"
        >
          <div className="variant__label">
            <FiImage size={30} color={"#495057"} />
            <span>Add images</span>
          </div>
        </div> */}
        <div className="variant__details flex-fill">
          <div>
            <label className="me-1">Variant: </label>
            <strong className="variant__name">{variant.label}</strong>
            <input type={'hidden'} value={variant.value} name="variants[]" /> 
          </div>
          <div className="mt-1">
            <div className="row">
              <div className="col-sm-4">
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="product-cost-addon">
                      $
                    </span>
                    <input
                      type="text"
                      name="variant_price[]"
                      defaultValue={product.price}
                      className="form-control"
                      placeholder=""
                      aria-label="Price"
                      aria-describedby="variant-cost-addon"
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="mb-3">
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    name="variant_qty[]"
                    defaultValue={0}
                    className="form-control"
                    placeholder=""
                    aria-label="quantity"
                    aria-describedby="variant-quantity-addon"
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-3">
                  <label className="form-label">Variant SKU</label>
                  <input
                    type="text"
                    name="variant_sku[]"
                    className="form-control"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Variant;
