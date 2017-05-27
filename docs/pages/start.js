import React, { Component, PropTypes } from 'react';
import {Row, Col} from 'antd';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import './start.less';

class Start extends Component {
  static propTypes = {
    langs: PropTypes.object,
  }

  render() {
    const { langs } = this.props;
    const lang = langs['start'];
    return (
      <div className="start">
        <div className="start-banner" ref="container">
          <h2>antui-admin</h2>
          <p className="desc">{lang.bannerHeading}</p>
        </div>
        <div className="start-box-announcement">
          <p>
            {lang.annc}
          </p>
        </div>
        <div className="start-box-features">
          <div className="start-box-features-inner">
            <Row gutter={8}>
              <Col span={8}>
                <Link to="/docs/2/articles/0" className="start-box-features-item color-green">
                  <FontAwesome name="play-circle" size="4x" />
                  <p>{lang.getstart}</p>
                </Link>
              </Col>
              <Col span={8}>
                <Link to="/docs/1/articles/0" className="start-box-features-item color-blue">
                  <FontAwesome name="th" size="4x" />
                  <p>{lang.component}</p>
                </Link>
              </Col>
              <Col span={8}>
                <a href="https://github.com/weiq/antui-admin" target="_blank" className="start-box-features-item color-og">
                  <FontAwesome name="github" size="4x" />
                  <p>{lang.github}</p>
                </a>
              </Col>
            </Row>
          </div>
        </div>
        <div className="start-box-footer">
          <p>Inspired by <a href="http://www.isphere.top/">isphere</a></p>
        </div>
      </div>
    );
  }
}

export default Start;
