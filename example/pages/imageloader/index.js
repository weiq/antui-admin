import React from 'react';
import { ImageLoader, Button } from '../../../src';
import Page from '../../component/page';
import './imageloader.less';
const Image = ImageLoader({container: ".image-demo-container"});

export default class IconDemo extends React.Component {
  state = {
    loaded1: false,
    loaded2: false,
  }

  loadImage1 = () => {
    this.setState({
      loaded1: true,
    });
  }

  loadImage2 = () => {
    this.setState({
      loaded2: true,
    });
  }

  render() {
    return (
      <Page className="image-demo" title="Image" subTitle="图片">
        <nav>
          <h2>图片加载（Lazy）：</h2>
          <section>
            <div className="image-demo-container">
              <Image src="http://cdn.dinbror.dk/assets/blazy/01.jpg" />
              <Image src="http://cdn.dinbror.dk/assets/blazy/02.jpg" />
              <Image src="http://cdn.dinbror.dk/assets/blazy/03.jpg" />
              <Image src="http://cdn.dinbror.dk/assets/blazy/04.jpg" />
              <Image src="http://cdn.dinbror.dk/assets/blazy/05.jpg" />
              <Image src="http://cdn.dinbror.dk/assets/blazy/06.jpg" />
              <Image src="http://cdn.dinbror.dk/assets/blazy/07.jpg" style={{width: 200, height: 200}} />
              <h4>src地址无效：</h4>
              <Image src="http://cdn.dinbror.dk/assets/blazy/08.jpg" />
              <h4>无src地址：</h4>
              <Image src="" width="300" height="200" />

              <Button onClick={this.loadImage1}>动态加载1</Button>
              {this.state.loaded1 ? <Image src="http://ww3.sinaimg.cn/mw690/65d1b78bjw1dsoyf2mc1jj.jpg" /> : null}
              <Button onClick={this.loadImage2}>动态加载2 (地址无效)</Button>
              {this.state.loaded2 ? <Image src="http://cdn.dinbror.dk/assets/blazy/09.jpg" /> : null}
            </div>
          </section>
        </nav>
      </Page>
    );
  }
};