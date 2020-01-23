// @format
import React from 'react';
import {connect} from 'react-redux';
import {List, ListSubheader} from '@material-ui/core';
import {clearDiagram, build, modifyState, saveDiagram} from '../utils/loaders';
import {loadInputs, loadSaved} from '../utils/loaders';
import {generateList} from '../utils/generateList';
import {blankOperations} from '../utils/stateReference';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';

function BulkActions({
  clear,
  onBuild,
  onClearBuild,
  onLoadInputs,
  onLoadSaved,
  onText,
  state,
}) {
  const cancel = React.useRef(false);
  const onInitialLoad = () => onLoadInputs();

  // Performs loads on mount
  React.useEffect(onInitialLoad, []);

  const onCancel = () => {
    if (state.building !== null) cancel.current = true;
    else onClearBuild();
  };

  const savefunc = fieldText => {
    saveDiagram(state.location, fieldText.savename, {
      [`${state.location}_vertices`]: state[`${state.location}_vertices`],
      [`${state.location}_fulltext`]: state[`${state.location}_fulltext`],
    });
  };

  const actionOptions = [
    ['clear_diagram', () => clear(state.location)],
    ['build_marked', () => onBuild(state, cancel)],
    ['cancel_build', onCancel],
    ['refresh', () => onLoadSaved(state.location)],
    ['save_diagram', () => onText(savefunc)],
  ];

  return (
    <List>
      <ListSubheader inset>Actions</ListSubheader>
      {generateList(actionOptions)}
    </List>
  );
}

function actionDispatch(dispatch) {
  return {
    clear: location => dispatch(clearDiagram(location)),
    onBuild: (state, cancel) => build(state, cancel, dispatch),
    onClearBuild: () => dispatch(modifyState(blankOperations)),
    onLoadSaved: location => dispatch(loadSaved(location)),
    onLoadInputs: () => dispatch(loadInputs()),
    onText: savefunc =>
      dispatch(
        modifyState({
          texting: true,
          entry_schema: {savename: 1},
          func: savefunc,
        }),
      ),
  };
}

export default connect(state => ({state: state}), actionDispatch)(BulkActions);
