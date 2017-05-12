import React, {PropTypes} from 'react';
import Icon from '../icon';
import './style.less';

class SliderContainer extends React.Component {
  static propTypes = {
    prefix: PropTypes.string,
    sideWidth: PropTypes.number,
    sideTitle: PropTypes.string,
    sideContent: PropTypes.node,
    children: PropTypes.node,
  }

  static defaultProps = {
    prefix: "slider-container",
    sideWidth: 180
  }

  state = {
    openSide: true
  }

  toggle = (e) => {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      openSide: !this.state.openSide
    });
  }

  render() {
    const {prefix, sideWidth, sideTitle, sideContent, children} = this.props;

    let sideStyle = {};
    let sideHandle = {};

    if (!this.state.openSide) {
      sideStyle = {
        height: 0,
        width: 0,
        margin: 0,
        marginTop: 7,
        border: "none",
        padding: 0
      };

      sideHandle = {
        right: "-28px",
        marginTop: "1px"
      };
    } else {
      sideStyle = {
        width: sideWidth
      };
    }

    if (!sideContent) {
      sideStyle.display = "none";
    }
    
    return (
      <div className={prefix}>
        <div className={prefix + "-side"} style={sideStyle}>
          <a className="side-handle" style={sideHandle} onClick={e => this.toggle(e)}>
            <Icon type={this.state.openSide ? "caret-left" : "caret-right"} />
          </a>
          <div className="side-body">
            <div className="side-panel">
              <div className="panel-header">
                <Icon type="folder" />&nbsp; 
                <strong>{sideTitle}</strong>
              </div>
              <div className="panel-body">
                {sideContent}
              </div> 
            </div>
          </div>
        </div>
        <div className={prefix + "-main"}>
          {children}
        </div>
      </div>
    );
  }
}

export default SliderContainer;