import React, { PropTypes } from 'react';
import Tooltip from '../tooltip';
import { Icon } from 'antd';

class TreeTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibale: false
    };
  }

  static propTypes = {
    /** 标题集合 */
    title: PropTypes.string,
    /** 数据源，其中的数据将会被渲染到左侧框（Tree）中 */
    onSelect: PropTypes.func,
    /** 显示在右侧框数据的key集合 */
    onCanel: PropTypes.func
  };

  static defaultProps = {
    title: "",
  }

  render() {
    const { title, onSelect, onCanel } = this.props;
    const { visibale } = this.state;
    return (
      <span className="antui-tree-title" onMouseEnter={() => { this.setState({visibale: true}); }} onMouseLeave={() => { this.setState({visibale: false}); }}>
        <span>{title}</span>
        {
          visibale ? (
            <span className="antui-tree-title-operate">
              <Tooltip title="选中全部子节点">
                <Icon type="plus-square-o" onClick={onSelect} />
              </Tooltip>
              <Tooltip title="取消选中全部子节点">
                <Icon type="close-square-o" onClick={onCanel} />
              </Tooltip>
            </span>
          ) : null
        }
      </span>
    );
  }
};

export default TreeTitle;