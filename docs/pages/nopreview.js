import React from 'react';
import FontAwesome from 'react-fontawesome';
import './nopreview.less';

const NoPreview = (props) =>
(
  <div className="App__preview--none">
    <FontAwesome name="weixin" size="4x" />
    <p>{props.langs.nopreview}</p>
  </div>
);

NoPreview.propTypes = {
  langs: React.PropTypes.object
};

export default NoPreview;