import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import Row from './components/Row';
import Box from "components/Box";
import _ from 'lodash';

import './table.scss';

const DataTable = (props) => {
  const {
    data,
    titles,
    updateTransaction,
    deleteTransaction
  } = props;
  return (
    <div className={cx('tableContainer', props.className)}>
    <Box>
      <table className={cx('DataTable', props.className)}>
        {props.caption && <caption>{props.caption}</caption>}
        <thead>
          <tr>
          {titles.map(title => <Row key={_.uniqueId()} data={title} isHeading />)}
          </tr>
        </thead>
        <tbody>
          {data.map(item => <Row key={_.uniqueId()} data={item}
          updateTransaction = {updateTransaction} deleteTransaction = {deleteTransaction}/>)}
        </tbody>
      </table>
    </Box>
    </div>
  );
};



export default DataTable;
