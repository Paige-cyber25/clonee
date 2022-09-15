import axios from "axios";
import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import CreatableSingle from "../../Components/CreateAbleSelect";
import CreatableInputOnly from "../../Components/CreatableInputOnly";

const VariationField = ({
  id,
  extractVariants,
  extractOptions,
  removeVariation,
  value = { variation: {}, values: [] }
}) => {

  useEffect(() => {
    // init();
  }, []);

  return (
    <div className="variation mb-2">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-3 p-1">
            <div className="form-group">
              <CreatableSingle selected={value.variation} extractVariants={extractVariants} id={id} />
            </div>
          </div>
          <div className="col-md-8 p-1">
            <div className="form-group">
              <CreatableInputOnly
                id={id}
                extractOptions={extractOptions}
                defaultValues={value.values}
              />
            </div>
          </div>
          <div className="col-md-1 rmVar p-1"
            onClick={() => removeVariation(id)}>
            <span style={{ cursor: "pointer" }} className="p-1">
              <FiTrash2 size={18} color={"red"} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariationField;
