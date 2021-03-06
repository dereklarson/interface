// @format
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Interface from '@comp/Interface';
import rootReducer from '@data/reducers';
import {initState} from '@data/reference';

// Conditional importing for mock support
if (process.env.NODE_ENV === 'development') {
  console.log('Importing dev packages: devmock');
  // import('@ops/devmock').then(() => 0);
}

const logger = createLogger({
  collapsed: (getState, action) => action.type.includes('modify'),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger],
  preloadedState: initState,
});

// Main render connects the redux store and DragNDrop providers
render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <Interface />
    </DndProvider>
  </Provider>,
  document.getElementById('root'),
);
