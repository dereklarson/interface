// @format
import React from 'react';
import {connect} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {Progress} from 'react-sweet-progress';
import {Paper} from '@material-ui/core';
import 'react-sweet-progress/lib/style.css';
import {genCodeEdit} from '@utils/state';
import {modify} from '@data/reducers';
import {objGen} from '@utils/helpers';
import {bankTypes} from '@data/reference';
import {useStyles} from '@style/classes';
import {generateList} from '@utils/generateList';

export function PureTicker({location, operations, onClear, onLogs}) {
  const classes = useStyles();

  // const [logOpen, openLog] = React.useState(false);
  const actionOptions = [
    ['show_logs', () => onLogs(operations.logs)],
    ['clear_diagram', () => onClear(location)],
  ];

  return (
    <div>
      <Tooltip
        title="Displays currently running build cmd"
        placement="bottom"
        enterDelay={500}>
        <Typography noWrap={true} className={classes.ticker} variant="body2">
          {operations.tickertext}
        </Typography>
      </Tooltip>
      <Progress percent={operations.percent} />
      <Paper className={classes.tickerActions}>
        {generateList('fab', actionOptions)}
      </Paper>
    </div>
  );
}

export default connect(
  state => ({
    location: state.context.location,
    operations: state.operations,
  }),
  dispatch => ({
    onClear: location => {
      dispatch(modify('vertices', {[location]: {}}));
      dispatch(modify('associations', {[location]: objGen(bankTypes)}));
      dispatch(modify('corpus', {[location]: {}}));
    },
    onLogs: text =>
      dispatch(genCodeEdit('logs', {edittext: text, editfunc: t => 0})),
  }),
)(PureTicker);
