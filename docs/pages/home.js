import React from 'react';
import FontAwesome from 'react-fontawesome';
import './home.less';

const Home = () =>
(
  <div className="App__preview background--canvas flex-center">
    <div className="App__preview--none">
      <FontAwesome name="weixin" size="4x" />
      <p>Hello, AntUI-Admin</p>
    </div>
  </div>
);

export default Home;