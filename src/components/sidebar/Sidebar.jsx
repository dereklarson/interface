// @format
import React from 'react';
import clsx from 'clsx';
import {connect} from 'react-redux';
import {Drawer, Divider, List, ListSubheader} from '@material-ui/core';
import BulkActions from './BulkActions';
import SavedDiagrams from './SavedDiagrams';
import {generateList} from '@utils/generateList';
import {useStyles} from '@style/classes';
import {modify} from '@data/reducers';
import {locations} from '@data/reference';

export function PureSidebar({onNavigate, location}) {
  const sidebarOptions = [];
  for (let loc of locations) {
    sidebarOptions.push([loc, () => onNavigate(loc)]);
  }

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.paperSidebar, !open && classes.paperSidebarClosed),
      }}
      open={open}
      onMouseEnter={event => setOpen(true)}
      onMouseLeave={event => setOpen(false)}>
      <Divider />
      <List>
        <ListSubheader inset> Locations </ListSubheader>
        {generateList(
          'list',
          sidebarOptions,
          'locations',
          'Switch to the <> environment',
        )}
      </List>
      <Divider />
      <BulkActions setMenuOpen={setOpen} />
      <Divider />
      <SavedDiagrams />
    </Drawer>
  );
}

export default connect(
  state => ({location: state.context.location}),
  dispatch => ({
    onNavigate: location => dispatch(modify('context', {location})),
  }),
)(PureSidebar);
