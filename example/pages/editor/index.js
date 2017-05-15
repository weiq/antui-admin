import React from 'react';
import { Editor } from '../../../src';
import Page from '../../component/page';
import './editor.less';

export default class EditorDemo extends React.Component {
  render() {
    return (
      <Page className="editor" title="Editor" subTitle="编辑器" spacing>
        <Editor />
      </Page>
    );
  }
};