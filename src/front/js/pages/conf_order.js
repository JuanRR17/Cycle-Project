import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <div>Confirm Order</div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Type</th>
            <th scope="col">Location</th>
            <th scope="col">Quantity</th>
            <th scope="col">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>Mark</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>Mark</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td className="text-end" colSpan="5">
              Total
            </td>
            <td>@mdo</td>
          </tr>
        </tfoot>
      </table>
      <button className="btn btn-success">Confirm</button>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="btn btn-danger"
      >
        Cancel
      </button>
    </div>
  );
};

ConfirmOrder.propTypes = {};

export default ConfirmOrder;
