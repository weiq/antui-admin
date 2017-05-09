import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Router, Route } from 'react-router';
import "babel-polyfill";
import Pages from './index';
const { Button, Navpage, Tooltip, Icon } = Pages;

class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <div
        style={{ height: '100%' }}
      >
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="button" component={Button} />
      <Route path="navpage" component={Navpage} />
      <Route path="tooltip" component={Tooltip} />
      <Route path="icon" component={Icon} />
    </Route>
  </Router>
), document.getElementById('container'));