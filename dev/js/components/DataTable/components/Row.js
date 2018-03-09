import React, { Component, PropTypes } from 'react';
import {formatDate} from "utils/format";

function getColumns(data){
  var cols = [];
      cols.push(<td>{data['stock']}</td>);
      cols.push(<td>{data['quantity']}</td>);
      cols.push(<td>{data['price']}</td>);
      cols.push(<td>{formatDate(data['date'])}</td>);
  return cols;
}
const Row = (props) => {
  if (props.isHeading) {
    return <th>{props.data}</th>;
  }

  return (
    <tr>
      {
        getColumns(props.data)
      }
    </tr>
  );
};

Row.propTypes = {
  data: PropTypes.array.isRequired,
  isHeading: PropTypes.bool
};

export default Row;
