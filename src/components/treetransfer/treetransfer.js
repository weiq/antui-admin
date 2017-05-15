import React, {PropTypes} from 'react';
import classNames from 'classnames';
import { Button, Checkbox, Input, Tree } from 'antd';
import './style.less';
const Search = Input.Search;
const TreeNode = Tree.TreeNode;
/**
 *  双栏穿梭选择框 其中，左边一栏为Tree
 */
export default class TreeTransfer extends React.Component {
  constructor(props) {
    super(props);
    const { listData, treeLeafKeys } = this._init(props);
    this.state = {
      listData,
      treeLeafKeys,
      treeCheckLeafKeys: [],
      listCheckKeys: []
    };
  }

  static propTypes = {
    /**
     * 标题集合，["左侧标题", "右侧标题"]
     */
    title: PropTypes.array,
    /**
     * 数据源，其中的数据将会被渲染到左侧框（Tree）中
     */
    dataSource: PropTypes.array,
    /**
     * 显示在右侧框数据的key集合
     */
    targetKeys: PropTypes.array,
    /**
     * 右侧框点击删除回调函数
     */
    onDelete: PropTypes.func,
    /**
     * 选项在向右侧栏转移时的回调函数
     */
    onTransfer: PropTypes.func,
    /**
     * 是否显示搜索框
     */
    showSearch: PropTypes.bool,
    /**
     * 搜索框的默认值
     */
    searchPlaceholder: PropTypes.string,
    /**
     * 指定数据列的key
     */
    rowKey: PropTypes.string,
    /**
     * 指定数据列的title
     */
    rowTitle: PropTypes.string,
  };

  static defaultProps = {
    title: ['源数据', '目的数据'],
    dataSource: [],
    targetKeys: [],
    showSearch: false,
    searchPlaceholder: '请输入搜索内容',
    rowKey: 'key',
    rowTitle: 'title',
  }

  // init
  _init = ({ dataSource, targetKeys, rowKey, rowTitle }) => {
    // get leaf keys
    const treeLeafKeys = [];
    const listData = [];

    const loop = data => data.map((item) => {
      const { children, [this.props.rowKey]: key, [this.props.rowTitle]: title } = item;

      if (children === undefined) {
        treeLeafKeys.push(key);
        if (targetKeys.indexOf(key) > -1) {
          listData.push({ key, title });
        }
      } else {
        loop(item.children);
      }
    });

    loop(dataSource);

    return {
      treeLeafKeys,
      listData
    };
  }

  componentWillReceiveProps(nextProps) {
    const { listData, treeLeafKeys } = this._init(nextProps);
    this.setState({
      listData,
      treeLeafKeys
    });
  }

  // tree checkbox click
  _handleTreeCheck = (checkedKeys) => {
    // filter tree leaf keys
    const treeCheckLeafKeys = checkedKeys.filter((_k) => this.state.treeLeafKeys.indexOf(_k) > -1);
    this.setState({ treeCheckLeafKeys });
  }

  // tree init
  _generateTreeNodes = (treeData) => { 
    const loop = data => data.map((item) => {
      const { children, [this.props.rowKey]: key, [this.props.rowTitle]: title, ...others } = item;

      if (children === undefined) {
        return <TreeNode key={key} title={title} isLeaf {...others} />;
      } else {
        return (
          <TreeNode key={key} title={title} {...others}>
            {loop(item.children)}
          </TreeNode>
        );
      }
    });

    const treeProps = {
      checkable: true,
      onCheck: this._handleTreeCheck,
      checkedKeys: this.state.treeCheckLeafKeys
    };

    return (
      <Tree {...treeProps}>
        {loop(treeData)}
      </Tree>
    );
  }

  // list checkbox click
  _handleListCheck = (e, key) => {
    if (e.target.checked) {
      this.setState({
        listCheckKeys: [...this.state.listCheckKeys, key]
      });
    } else {
      this.setState({
        listCheckKeys: this.state.listCheckKeys.filter((_k) => _k !== key)
      });
    }
  }

  // list checkbox all click
  _handleListCheckAll = (e) => {
    if (e.target.checked) {
      this.setState({
        listCheckKeys: this.props.targetKeys
      });
    } else {
      this.setState({
        listCheckKeys: []
      });
    }
  }

  // list delete 
  _handleListDelete = () => {
    // delete tree clicked
    const { treeCheckLeafKeys, listCheckKeys } = this.state;
    this.setState({
      treeCheckLeafKeys: treeCheckLeafKeys.filter((_k) => listCheckKeys.indexOf(_k) === -1),
      listCheckKeys: []
    });
    this.props.onDelete && this.props.onDelete(listCheckKeys);
  }

  // list search
  _handleListSearch = (value) => {
    if (value === "") {
      const { listData } = this._init(this.props);
      this.setState({
        listData
      });
    } else {
      this.setState({
        listData: this.state.listData.filter(({title}) => title.indexOf(value) > -1)
      });
    }
  }

  render() {
    const { title, dataSource, targetKeys, showSearch, searchPlaceholder, onTransfer } = this.props;
    const { listData, treeLeafKeys, treeCheckLeafKeys, listCheckKeys } = this.state;

    const listBodyStyle = classNames({
      "antui-treetransfer-list-body": true,
      "antui-treetransfer-list-body-has-search": showSearch
    });

    return (
      <div className="antui-treetransfer">
        <div className="antui-treetransfer-list antui-treetransfer-left">
          <div className="antui-treetransfer-list-header">
            <span className="antui-treetransfer-list-header-select">
              { treeCheckLeafKeys.length === 0 ? treeLeafKeys.length : `${treeCheckLeafKeys.length}/${treeLeafKeys.length}` } 条数据
            </span>
            <span className="antui-treetransfer-list-header-title"><span>{ title[0] }</span></span>
          </div>
          <div className={listBodyStyle}>
            {
              showSearch ? (
                <div className="antui-treetransfer-list-body-search">
                  <Search placeholder={searchPlaceholder} />
                </div>
              ) : null
            }
            <div className="antui-treetransfer-list-body-content">
              { this._generateTreeNodes(dataSource) }
            </div>
          </div>
        </div>
        <div className="antui-treetransfer-operation">
          <Button type="primary" icon="right" size="small" disabled={treeCheckLeafKeys.length === 0} onClick={() => onTransfer(treeCheckLeafKeys)} />
        </div>
        <div className="antui-treetransfer-list antui-treetransfer-right">
          <div className="antui-treetransfer-list-header">
            <Checkbox onClick={this._handleListCheckAll} indeterminate={listCheckKeys.length > 0 && listCheckKeys.length < targetKeys.length} checked={listCheckKeys.length > 0 && listCheckKeys.length === targetKeys.length} />
            <span className="antui-treetransfer-list-header-select">
              { listCheckKeys.length === 0 ? targetKeys.length : `${listCheckKeys.length}/${targetKeys.length}` } 条数据
            </span>
            {
              listCheckKeys.length === 0 ? null : (
                <a className="antui-treetransfer-list-header-delete" onClick={this._handleListDelete}>删除</a>
              )
            }
            <span className="antui-treetransfer-list-header-title"><span>{ title[1] }</span></span>
          </div>
          <div className={listBodyStyle}>
            {
              showSearch ? (
                <div className="antui-treetransfer-list-body-search">
                  <Search placeholder={searchPlaceholder} onSearch={this._handleListSearch} />
                </div>
              ) : null
            }
            <ul className="antui-treetransfer-list-body-content">
              { 
                listData.map(({ key, title }) => (
                  <li key={key} className="list">
                    <Checkbox onClick={(e) => this._handleListCheck(e, key)} checked={listCheckKeys.indexOf(key) > -1} />
                    <span>{title}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}