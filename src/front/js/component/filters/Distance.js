import React, { useState } from "react";
import PropTypes from "prop-types";
import { capitalize } from "../../utils/utils";

const Distance = ({ distance, handleSetDistance }) => {
  const [location, setLocation] = useState("");
  const [valid, setValid] = useState(false);

  const handleLocation = async (e) => {
    const url = process.env.BACKEND_URL + "/api/validate/" + e.target.value;
    fetch(url, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        console.log(resp.text()); // will try return the exact result as string
        if (resp.status === 200) {
          setValid(true);
        } else {
          setValid(false);
        }
        return resp; // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .catch((error) => {
        //error handling
        console.log(error);
        setValid(false);
      });
    setLocation(capitalize(e.target.value));
  };
  console.log("valid:", valid);
  const handleDistance = (e) => {
    handleSetDistance(e.target.value);
  };
  const style = {
    borderRadius: "100px",
    overflow: "hidden",
  };
  return (
    // <span>Distance</span>
    <div
      className="d-flex align-items-center form-control p-0 border-success border-3"
      style={style}
    >
      <input
        className="flex-grow-1 border-0 pe-0 form-control ms-1 m-0 shadow-none"
        type="text"
        placeholder="Location"
        onChange={handleLocation}
        value={location}
      />
      <input
        className="py-2 ps-1 form-control m-0 shadow-none text-end"
        type="text"
        placeholder="0"
        onChange={handleDistance}
        value={distance}
        disabled={!valid}
        style={{ width: "60px" }}
      />
      <span className="px-2">km</span>
    </div>
  );
};

Distance.propTypes = {};

export default Distance;
