import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { Link } from "react-router-dom";
import { responseMessage } from "../../libs/app";

const VariationOption = ({ option, images, setVariantSelectedForRemoval }) => {

  var optionImages = [];
  if (option.images !== null) {
    if (option.images.indexOf(',')) {
      optionImages = option.images.split(",");
    }
  }

  const [varImages, setVarImages] = useState(optionImages);
  const [selection, setSelection] = useState(optionImages);
  const [modalState, setModalState] = useState(false);

  useEffect(() => { }, []);

  const saveImages = () => {
    const selectedImages = selection.join(",");
    axios
      .post("/update-variant-images", { id: option.id, images: selectedImages })
      .then((response) => {
        if (response.data.success) {
          setSelection(response.data.images);
          setVarImages(response.data.images);
          setModalState(false);

          responseMessage(response.data.message, "success");
        } else if (!response.data.success) {
          responseMessage(response.data.error.message, "error");
        }
      })
      .catch((error) => {
        responseMessage(error, "error");
      });
  };

  const addSelection = (image) => {
    setSelection([...selection, image]);
  };

  const removeSelection = (index) => {
    console.log(index);
    var imArray = [...selection];
    imArray.splice(index, 1);
    setSelection([...imArray]);
  };

  const selectIndicator = (checked = false, index) => {
    return (
      <div className="form-check mb-3">
        {checked ? (
          <input
            className="form-check-input"
            type="checkbox"
            id={"formCheck6" + index}
            checked={true}
            onChange={() => {

            }}
          />
        ) : (
          <input
            className="form-check-input"
            type="checkbox"
            checked={false}
            onChange={(e) => {

            }}
            id={"formCheck6" + index}
          />
        )}
        <label
          className="form-check-label"
          htmlFor={"formCheck6" + index}
        ></label>
      </div>
    );
  };

  const ImageModal = () => {
    return (
      <div className="variant__popup">
        <div className="variant__popup__dialog">
          <div className="variant_popup_dialog__header mb-2">
            <div className="d-flex justify-content-between">
              <h5>Select Images</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setModalState(false);
                }}
              ></button>
            </div>
          </div>
          <div className="variant__popup__dialog__body mb-2">
            <div className="variant__popup_images">
              {images.main ? (
                <>
                  {selection.indexOf(images.main) > -1 ? (
                    <div
                      onClick={(e) =>
                        removeSelection(selection.indexOf(images.main))
                      }
                      className="variant__popup__image selected"
                    >
                      {selectIndicator(true, 0)}
                      <img src={window.isource + images.main} alt="" />
                    </div>
                  ) : (
                    <div
                      onClick={(e) => addSelection(images.main)}
                      className="variant__popup__image"
                    >
                      {selectIndicator(false, 0)}
                      <img src={window.isource + images.main} alt="" />
                    </div>
                  )}
                </>
              ) : null}

              {images.gallery.length ? (
                <>
                  {images.gallery.map((image, index) => {
                    if (selection.indexOf(image) > -1) {
                      return (
                        <div
                          key={index}
                          className="variant__popup__image selected"
                          onClick={(e) =>
                            removeSelection(selection.indexOf(image))
                          }
                        >
                          {selectIndicator(true, index + 1)}
                          <img src={window.isource + image} alt="" />
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={index}
                          className="variant__popup__image"
                          onClick={(e) => addSelection(image)}
                        >
                          {selectIndicator(false, index + 1)}
                          <img src={window.isource + image} alt="" />
                        </div>
                      );
                    }
                  })}
                </>
              ) : null}

              {
                !images.main && images.gallery.length === 0 ? (
                  <p className="text-center">
                    You haven't uploaded any image for this product yet!
                  </p>
                ) : null
              }
            </div>
          </div>
          <div className="variant__popup__dialog__footer">
            <div className="text-end">
              <button
                type="button"
                onClick={() => {
                  setModalState(false);
                }}
                className="btn ms-1 btn-light w-sm me-1"
              >
                Close
              </button>
              <button
                type="button"
                onClick={saveImages}
                className="btn ms-1 btn-primary w-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="d-flex col-md-12 variant justify-content-between">
        {modalState ? ImageModal() : null}
        <div
          className="variant__image me-1"
          onClick={() => {
            setModalState(true);
          }}
        >
          {
            varImages.length > 0 ? (
              <>
                {
                  <img src={window.isource + varImages[0]} alt="" width="100%" />
                }
              </>
            ) : (
              <div className="variant__label">
                <FiImage size={30} color={"#495057"} />
                <span>Add images</span>
              </div>
            )
          }
        </div>
        <div className="variant__details flex-fill">
          <div>
            <label className="me-1">Variant: </label>
            <strong className="variant__name">{option.variant}</strong>
          </div>
          <div className="mt-1">
            <div className="d-flex justify-content-between">
              <div>
                <p className="m-0 p-0">{option.sku}</p>
                <p className="m-0 p-0">
                  {option.quantity < 5 && option.in_stock === 1 ? (
                    <span className="badge badge-soft-warning">
                      Low in stock
                    </span>
                  ) : null}
                  {option.quantity >= 5 && option.in_stock === 1 ? (
                    <span className="badge badge-soft-success">In stock</span>
                  ) : null}
                  {option.in_stock === 0 ? (
                    <span className="badge badge-soft-danger">
                      Out of stock
                    </span>
                  ) : null}
                </p>
              </div>
              <div className="text-end">
                <p className="m-0 p-0">
                  Price : <b>{option.price}</b>
                </p>
                <p className="m-0 p-0">
                  Qty : <b>{option.quantity}</b>
                </p>
                <Link className="text-primary text-underline" to={`/product-edit/variation/edit/${option.id}`}>
                  Edit
                </Link>
                <Link className="ms-2 text-danger" to={`#${option.id}`} onClick={(e) => {
                  e.preventDefault();
                  setVariantSelectedForRemoval(option.id);
                }}>
                  Remove
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VariationOption;
