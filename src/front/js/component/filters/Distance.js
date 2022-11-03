import React, { useState } from "react";
import { capitalize } from "../../utils/utils";
import { IconContext } from "react-icons";
import { BiCurrentLocation, BiFilter } from "react-icons/bi";
import PropTypes from "prop-types";

const Distance = ({
  distance,
  distanceFilter,
  handleSetDistance,
  handleSetDistanceFilter,
  handleSetOrigin,
}) => {
  const [location, setLocation] = useState("");
  const [valid, setValid] = useState(false);

  const handleLocation = async () => {
    let mounted = true;
    const url = process.env.BACKEND_URL + "/api/validate/" + location;
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
      handleSetOrigin(location);
    }
    return function cleanup() {
      mounted = false;
    };
  };

  const clearLocation = () => {
    handleSetDistanceFilter(false);
    setLocation("");
    setValid(false);
    handleSetDistance("");
    handleSetOrigin("");
  };

  const handleOriginChange = (e) => {
    if (!valid) {
      setLocation(capitalize(e.target.value));
    }
  };

  const handleDistance = (e) => {
    handleSetDistance(e.target.value);
  };

  const handleDistanceFilter = () => {
    console.log("1");
    handleSetDistanceFilter(true);
  };

  const clearInput = () => {
    handleSetDistanceFilter(false);
    handleSetDistance("");
  };

  const style = {
    overflow: "hidden",
  };

  return (
    <div
      className="form-control p-0 rounded-pill border-success border-3 px-4 py-1"
      style={style}
    >
      <div className="row align-items-center gx-0">
        <div className="col">
          <input
            className="flex-grow-1 border-0 form-control ms-1 m-0 shadow-none text-end"
            type="text"
            placeholder="Location"
            onChange={handleOriginChange}
            value={location}
            disabled={valid}
          />
        </div>

        <div className="col-auto">
          <div
            className="btn btn-custom text-light m-1 p-1"
            style={{
              backgroundColor: `${valid ? "#14b514" : "#db5353"}`,
            }}
            onClick={handleLocation}
          >
            <IconContext.Provider value={{ size: 25 }}>
              <BiCurrentLocation />
            </IconContext.Provider>
          </div>
        </div>
        {valid && (
          <div className="col-auto px-1">
            <button
              type="button"
              className=" my-auto btn-close"
              aria-label="Close"
              onClick={clearLocation}
            ></button>
          </div>
        )}
      </div>
      {valid && (
        <div className="row align-items-center gx-0">
          <div className="col">
            <input
              className="py-2 ps-1 form-control m-0 shadow-none text-end border-0 pe-0"
              type="text"
              placeholder="Distance"
              onChange={handleDistance}
              value={distance}
              disabled={!valid}
            />
          </div>
          <div className="col-auto">
            <span className="p-1">km</span>
          </div>

          {valid && distance > 0 && (
            <div className="py-2 px-1 col-auto">
              <IconContext.Provider value={{ size: 25 }}>
                {distanceFilter ? (
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={clearInput}
                  ></button>
                ) : (
                  <BiFilter onClick={handleDistanceFilter} />
                )}
              </IconContext.Provider>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

Distance.propTypes = {
  distance: PropTypes.string.isRequired,
  distanceFilter: PropTypes.bool.isRequired,
  handleSetDistance: PropTypes.func.isRequired,
  handleSetDistanceFilter: PropTypes.func.isRequired,
  handleSetOrigin: PropTypes.func.isRequired,
};

export default Distance;