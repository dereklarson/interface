// @format
import React from 'react';
import {connect} from 'react-redux';
import {Button, Paper, Typography} from '@material-ui/core';
import _ from 'lodash';
import DepotItem from './DepotItem';
import {titlize} from '@utils/helpers';
import {useStyles} from '@style/classes';

export function PureStyleDepot({location, styleSettings}) {
  const classes = useStyles();
  const styleInput = _.sortBy(Object.values(styleSettings), 'type');
  const [open, setOpen] = React.useState(true);
  const [openType, setOpenType] = React.useState('shape');
  const dividers = {};

  const itemDisplay = [
    <Typography key="title" variant="h6" onClick={() => setOpen(!open)}>
      Styles
    </Typography>,
  ];

  if (open) {
    styleInput.forEach(function(item, index) {
      const itemType = _.get(item, 'type', 'standard');
      const isOpen = openType === itemType;
      if (!_.has(dividers, itemType)) {
        dividers[itemType] = itemType;
        let onClick = () => setOpenType(isOpen ? '' : itemType);
        let suffix = isOpen ? '' : '...';
        itemDisplay.push(
          <Button key={itemType} size="small" onClick={onClick}>
            {titlize(itemType + suffix)}
          </Button>,
        );
      }
      if (isOpen)
        itemDisplay.push(
          <DepotItem key={index} atype="styles" itemProps={item} />,
        );
    });
  }

  return (
    <div>
      <Paper className={classes.paper}>{itemDisplay}</Paper>
    </div>
  );
}

export default connect(state => ({
  location: state.context.location,
  styleSettings: state.styles[state.context.location],
}))(PureStyleDepot);