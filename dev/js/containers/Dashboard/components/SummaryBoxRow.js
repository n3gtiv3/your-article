import React, { Component, PropTypes } from 'react';
import Box from '../../../components/Box/';
import {formatMoney} from '../../../utils/format';

const SummaryBoxRow = (props) => {
  const {
    ltcg=0,
    stcg=0,
    speculation=0
  } = props;

  return (
    <div className="row">
      <div className="col-md-3">
        <Box className="SummaryBox Box--red">
          <h2 className="SummaryBox-title">
            LTCG
          </h2>

          <strong className="SummaryBox-value">
          {'Rs'} {formatMoney(ltcg) || 0}
          </strong>
        </Box>
      </div>

      <div className="col-md-3">
				<Box className="SummaryBox Box--blue">
          <h2 className="SummaryBox-title">
            STCG
          </h2>

          <strong className="SummaryBox-value">
           {'Rs'} {formatMoney(stcg) || 0}
          </strong>
        </Box>
      </div>
      <div className="col-md-3">
        <Box className="SummaryBox Box--green">
          <h2 className="SummaryBox-title">
            SPECULATION
          </h2>

          <strong className="SummaryBox-value">
          {'Rs'} {formatMoney(speculation)}
          </strong>
        </Box>
      </div>

    </div>
  );
};

SummaryBoxRow.propTypes = {
  ltcg: PropTypes.number,
  stcg: PropTypes.number,
  total: PropTypes.number,
  speculation: PropTypes.number
};

export default SummaryBoxRow;
