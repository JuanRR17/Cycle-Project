import React, { useState } from "react";
import PropTypes from "prop-types";

const Filter = ({ label, fields, handleSetFilter }) => {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    handleSetFilter(e.target.value);
    setValue(e.target.value);
  };

  return (
    <div className="d-flex">
      <span>Filter by {label}</span>
      <select
        name="select"
        className="form-select"
        id="inputType"
        value={value}
        onChange={handleChange}
      >
        {fields.map((f, idx) => {
          if (idx === 0) {
            return (
              <option key={idx} value={idx}>
                No Filter
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
