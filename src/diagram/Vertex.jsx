// @format
import React, {useRef} from 'react';
import {connect} from 'react-redux';
import {useDrag, useDrop, DragPreviewImage} from 'react-dnd';
import {prepareBuildFocus} from '../utils/loaders';
import {addSection, linkVertex, unlinkVertex} from '../utils/actions';
import {modifyState} from '../utils/loaders';
import CardVertex from './CardVertex';
import NodeVertex from './NodeVertex';
import ConfigNodeVertex from './ConfigNodeVertex';

export function PureVertex({
  state,
  onClick,
  cardActions,
  dropActions,
  onSectionToGhost,
  type,
  id,
  name,
  sections,
  parents,
  prepared,
}) {
  // First define the Drag-n-Drop functionality
  const ref = useRef(null);
  const [{isDragging}, drag, preview] = useDrag({
    item: {type: 'Vertex', id: id, name: name, parents: parents},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [{highlighted}, drop] = useDrop({
    accept: ['Vertex', 'DepotItem'],
    drop: item => {
      if (name.charAt(0) === '<') {
        onSectionToGhost(parents[0], parseInt(name.slice(1)), item.id);
      } else if (item.type === 'Vertex' && item.parents.includes(id)) {
        dropActions.Unlink(id, item.id);
      } else dropActions[item.type](id, item.id);
    },
    canDrop: (item, monitor) => {
      if (item.type === 'Vertex') {
        if (item.id === id) return false;
        if (item.parents.includes(id)) return true;
        if (item.parents.length !== 0) return false;
        return true;
      } else if (item.type === 'DepotItem') {
        return !sections.includes(item.id);
      }
      return true;
    },
    collect: monitor => ({
      highlighted: monitor.canDrop(),
    }),
  });
  drag(drop(ref));

  const styleProps = {
    building: state.building === id,
    isDragging: isDragging,
    highlighted: highlighted,
    prepared: prepared.includes(id),
    ghost: name.charAt(0) === '<',
  };
  const components = {
    conf: ConfigNodeVertex,
    node: NodeVertex,
    card: CardVertex,
  };
  const CurrentComponent = components[type];
  const zIndex = type === 'card' ? 4 : 3;
  return (
    <div ref={ref} style={{zIndex: zIndex}}>
      <DragPreviewImage src="img/icon-plus-20.png" connect={preview} />
      <div
        onClick={event => {
          event.stopPropagation();
          onClick(id);
        }}>
        <CurrentComponent
          name={name}
          cardActions={cardActions}
          sections={sections}
          id={id}
          state={state}
          styleProps={styleProps}
        />
      </div>
    </div>
  );
}

// ======== DnD Handling ========

export const removeAllSections = id => ({
  type: 'REMOVE_ALL_SECTIONS',
  vertex: id,
});

function actionDispatch(dispatch) {
  return {
    onClick: id => dispatch({type: 'MODIFY_STATE', update: {focus: id}}),
    cardActions: {
      onEditor: () => dispatch(modifyState({editor: 'vertex', editing: true})),
      onBuild: state => prepareBuildFocus(state, dispatch),
      onClear: id => dispatch(removeAllSections(id)),
    },
    dropActions: {
      Vertex: (to, from) => dispatch(linkVertex(to, from)),
      DepotItem: (to, from) => dispatch(addSection(to, from)),
      Unlink: (to, from) => dispatch(unlinkVertex(to, from)),
    },
    onSectionToGhost: (to, from, section) => {
      dispatch({type: 'ADD_VERTEX', section: section});
      dispatch(linkVertex(to, from));
    },
  };
}

export default connect(state => ({state: state}), actionDispatch)(PureVertex);
