import React, { useState } from "react";
import PropTypes from "prop-types";

const Filter = ({ label, fields, handleSetFilter }) => {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    handleSetFilter(e.target.value);
    setValue(e.target.value);
  };

  return (
    <div className="d-flex ">
      <select
        name="select"
        className="form-select w-auto border-success border-3"
        id="inputType"
        value={value}
        onChange={handleChange}
      >
        {fields.map((f, idx) => {
          if (idx === 0) {
            return (
              <option key={idx} value={idx}>
                {label}
              </option>
            );
          } else {
            return (
              <option key={idx} value={idx}>
                {f}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

Filter.propTypes = {};

export default Filter;
