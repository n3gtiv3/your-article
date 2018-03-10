import React, { Component, PropTypes } from 'react';
import {formatDate} from "utils/format";

function getColumns(data, updateTransaction, deleteTransaction){
  var cols = [];
      cols.push(<td>{data['stock']}</td>);
      cols.push(<td>{data['quantity']}</td>);
      cols.push(<td>{data['price']}</td>);
      cols.push(<td>{formatDate(data['date'])}</td>);
      cols.push(<td>{data['remarks']}</td>);
      cols.push(<td onClick = {
       updateTransaction.bind(this, data['id'], data['stock'],
       data['quantity'], data['price'], data['date'],
       data['transactionType'], data['remarks'])
     }><a>Update</a></td>);
     cols.push(<td onClick = {deleteTransaction.bind(this, data['id'])}><a>Delete</a></td>);
  return cols;
}
const Row = (props) => {
  if (props.isHeading) {
    return <th>{props.data}</th>;
  }

  return (
    <tr>
      {
        getColumns(props.data, props.updateTransaction, props.deleteTransaction)
      }
    </tr>
  );
};

Row.propTypes = {
  data: PropTypes.array.isRequired,
  isHeading: PropTypes.bool
};

export default Row;
