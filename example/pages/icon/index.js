import React from 'react';
import { Icon } from '../../../src';
import Page from '../../component/page';
import CopyToClipboard from 'react-copy-to-clipboard';
import cx from 'classnames';
import './icon.less';

export default class IconDemo extends React.Component {
  state = {
    justCopied: false,
  };

  onCopied = (icon) => {
    this.setState({ justCopied: icon }, () => {
      setTimeout(() => {
        this.setState({ justCopied: false });
      }, 1000);
    });
  }

  render() {
    return (
      <Page className="icon-demo" title="Icon" subTitle="图标">
        <nav>
          <h2>图标列表：</h2>
          <section>
            <ul className="icon-demo-list clearfix">
              {iconlist.map(icon => (
                <CopyToClipboard key={icon} text={`<Icon type="${icon}" />`} onCopy={e => this.onCopied(icon)}>
                  <li className={cx("icon-item", {"copied": this.state.justCopied === icon})} onClick={this.copyToClipBoard}>
                    <Icon type={icon} />
                    <span className="icon-name">{icon}</span>
                  </li>
                </CopyToClipboard>
              ))}
            </ul>
          </section>
        </nav>
      </Page>
    );
  }
};

const iconlist = [
  'loading', 'goods', 'refund', 'popupmsg', 'car', 'pay', 'wrap', 'rmb', 'card', 'list', 'vipcard', 
  'search', 'location', 'pulldown', 'order', 'mine-o', 'mine', 'shopping-cart-o', 'shopping-cart', 
  'shopping-cart-a', 'password', 'caret-right', 'caret-left', 'caret-down', 'caret-top', 'pixel-right', 
  'check', 'cross', 'right', 'left', 'top', 'bottom', 'arrow-top', 'arrow-bottom', 'add', 'minus', 
  'info-circle-o', 'info-circle', 'warning-o', 'warning', 'cross-circle-o', 'cross-circle', 'check-circle-o', 
  'check-circle', 'delete', 'back', 'upload', 'download', 'up-circle', 'down-circle'
];