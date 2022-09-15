import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});

const CreatableInputOnly = ({ id, extractOptions, defaultValues = []}) => {

  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(defaultValues);
  
  useEffect(() => {
    extractOptions(id, value);
  }, [value]);

  const handleChange = (value, actionMeta) => {
    setValue(value);
  };

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setInputValue("");
        setValue([...value, createOption(inputValue)]);
        event.preventDefault();
    }
  };
  return (
    <CreatableSelect
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder="Enter option and press enter..."
      value={value}
    />
  );
};

export default CreatableInputOnly;
