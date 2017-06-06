import React from 'react';
import { Upload, Button, message, Icon } from '../../../src';
import Page from '../../component/page';
const Dragger = Upload.Dragger;

class UplaodDemo extends React.Component {

  render() {
    const props1 = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    const props2 = {
      ...props1,
      showUploadList: false,
    };

    return (
      <Page title="Uplaod" subTitle="上传" desc="文件选择上传和拖拽上传控件">
        <nav>
          <h2>代码演示</h2>
          <h3>1. 最简单的使用</h3>
          <code>
            <Upload {...props1}>
              <Button>Click to Upload</Button>
            </Upload>
          </code>
          <h3>2. 拖拽上传</h3>
          <code>
            <div style={{ marginTop: 16, height: 180 }}>
              <Dragger {...props2}>
                <p>Click or drag file to this area to upload</p>
                <p>Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
              </Dragger>
            </div>
          </code>
        </nav>
      </Page>
    );
  }
};

export default UplaodDemo;