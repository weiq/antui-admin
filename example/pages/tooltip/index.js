import React from 'react';
import { Tooltip } from '../../../src/index';
import Page from '../../component/page';
import '../../../src/components/tooltip/style.less';

export default class TooltipDemo extends React.Component {

  render() {
    return (
      <Page className="tooltip" title="tooltip" subTitle="文字提示" spacing>
        <Tooltip title={123} />
      </Page>
    );
  }
};