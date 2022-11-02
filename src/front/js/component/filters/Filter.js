import React, { useState } from "react";
import PropTypes from "prop-types";

const Filter = ({ label, fields, handleSetFilter }) => {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    handleSetFilter(e.target.value);
    setValue(e.target.value);
  };

  const style = {
    borderRadius: "100px",
  };

  return (
    <select
      name="select"
      className="form-select w-auto border-success border-3"
      id="inputType"
      value={value}
      onChange={handleChange}
      style={style}
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
  );
};

Filter.propTypes = {};

export default Filter;
