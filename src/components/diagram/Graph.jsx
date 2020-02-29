// @format
import React from 'react';
import _ from 'lodash';
import Vertex from './Vertex';
import {useStyles} from '@style/classes';

function renderVertex(vertex, activity, className) {
  let type = 'custom';
  if (['docker', 'pipeline'].includes(activity.location)) {
    type = 'node';
  } else if (activity.location === 'configuration') {
    type = 'conf';
  } else if (activity.location === 'data') {
    type = 'table';
  } else if (activity.focus === vertex.uid) {
    type = 'card';
  }

  const component = (
    <Vertex
      type={type}
      uid={vertex.uid}
      parents={vertex.parents}
      prepared={activity.prepared}
    />
  );
  return (
    <div
      className={className}
      key={vertex.uid}
      style={{
        left: `${vertex.position.x}%`,
        top: `${vertex.position.y}%`,
        height: `${vertex.position.height}%`,
        width: `${vertex.position.width}%`,
      }}>
      {component}
    </div>
  );
}

export default function Graph({vertices, activity}) {
  const classes = useStyles();
  const vertexDisplay = [];
  _.values(vertices).forEach(vertex => {
    vertexDisplay.push(renderVertex(vertex, activity, classes.vertex));
  });
  return <div>{vertexDisplay}</div>;
}
