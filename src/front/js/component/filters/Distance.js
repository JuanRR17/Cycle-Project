import React, { useState } from "react";
import PropTypes from "prop-types";
import { capitalize } from "../../utils/utils";
import { ImSearch } from "react-icons/im";

const Distance = ({
  distance,
  distanceFilter,
  handleSetDistance,
  handleSetDistanceFilter,
}) => {
  const [location, setLocation] = useState("");
  const [valid, setValid] = useState(false);

  const handleLocation = async (e) => {
    let mounted = true;
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
        if (mounted) {
          if (resp.status === 200) {
            setValid(true);
          } else {
            setValid(false);
          }
        }
        return resp; // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .catch((error) => {
        //error handling
        console.log(error);
        setValid(false);
      });
    if (mounted) {
      setLocation(capitalize(e.target.value));
    }
    return function cleanup() {
      mounted = false;
    };
  };
  console.log("valid:", valid);
  const handleDistance = (e) => {
    handleSetDistance(e.target.value);
  };

  const handleDistanceFilter = () => {
    console.log("1");
    handleSetDistanceFilter(true);
  };

  const clearInput = () => {
    handleSetDistanceFilter(false);
    setLocation("");
    setValid(false);
    handleSetDistance("");
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
        className="flex-grow-1 border-0 form-control ms-1 m-0 shadow-none text-end"
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
      <span className="ps-1 pe-2">km</span>

      {valid && distance > 0 && (
        <div className="py-2 ps-1 pe-3">
          {distanceFilter ? (
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={clearInput}
            ></button>
          ) : (
            <ImSearch onClick={handleDistanceFilter} />
          )}
        </div>
      )}
    </div>
  );
};

Distance.propTypes = {};

export default Distance;
