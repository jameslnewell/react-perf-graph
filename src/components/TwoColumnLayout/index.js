import React from 'react';
import './index.css';

const TwoColumnLayout = props => (
  <div className="two-column-layout">
    <div className="two-column-layout__column two-column-layout__column--aside">
      {props.children[0]}
    </div>
    <div className="two-column-layout__column two-column-layout__column--primary">
      {props.children[1]}
    </div>
  </div>
);

export default TwoColumnLayout;
