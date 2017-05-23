import React, {PropTypes} from 'react';
import classNames from 'classnames';
import { Button, Checkbox, Input, Tree, Spin } from 'antd';
const Search = Input.Search;
const TreeNode = Tree.TreeNode;
/**
 *  双栏穿梭选择框 其中，左边一栏为Tree
 */
export default class TreeTransfer extends React.Component {
  constructor(props) {
    super(props);
    const { treeData, listData, treeLeafKeys, treeCheckLeafKeys } = this._init(props);
    this.state = {
      treeData,
      listData,
      treeLeafKeys,
      treeCheckLeafKeys,
      expandedKeys: treeCheckLeafKeys.length === 0 ? [] : treeCheckLeafKeys,
      listCheckKeys: [],
      autoExpandParent: true,
      treeLoading: false,
      searchValue: "",
    };
  }

  static propTypes = {
    /** 标题集合 */
    title: PropTypes.array,
    /** 数据源，其中的数据将会被渲染到左侧框（Tree）中 */
    dataSource: PropTypes.array,
    /** 显示在右侧框数据的key集合 */
    targetKeys: PropTypes.array,
    /** 选项在左栏向右栏转移或者右栏数据更改时的回调函数 */
    onChange: PropTypes.func,
    /** 是否显示搜索框 */
    showSearch: PropTypes.bool,
    /** 搜索框的默认值 */
    searchPlaceholder: PropTypes.string,
    /** 指定数据列的key */
    rowKey: PropTypes.string,
    /** 指定数据列的title */
    rowTitle: PropTypes.string,
    /** 指定数据列的children */
    rowChildren: PropTypes.string,
  };

  static defaultProps = {
    title: ['源数据', '目的数据'],
    dataSource: [],
    targetKeys: [],
    showSearch: false,
    searchPlaceholder: '请输入搜索内容',
    rowKey: 'key',
    rowTitle: 'title',
    rowChildren: 'children',
  }

  // init
  _init = ({ dataSource, targetKeys, rowKey, rowTitle }) => {
    // get leaf keys
    const treeLeafKeys = [];
    const listData = [];
    const treeCheckLeafKeys = [];

    const loop = data => data.map((item) => {
      const { [this.props.rowChildren]: children, [this.props.rowKey]: key, [this.props.rowTitle]: title } = item;

      if (children === undefined) {
        treeLeafKeys.push(key);
        if (targetKeys.indexOf(key) > -1) {
          treeCheckLeafKeys.push(key);
          listData.push({ key, title });
        }
      } else {
        loop(item.children);
      }
    });

    loop(dataSource);

    return {
      treeData: dataSource,
      treeLeafKeys,
      listData,
      treeCheckLeafKeys
    };
  }

  componentWillReceiveProps(nextProps) {
    const { treeData, listData, treeLeafKeys, treeCheckLeafKeys } = this._init(nextProps);
    this.setState({
      treeData,
      listData,
      treeLeafKeys,
      treeCheckLeafKeys
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
    const { searchValue } = this.state;
    const expandedKeys = [];
    
    const loop = data => data.map((item) => {
      const { [this.props.rowChildren]: children, [this.props.rowKey]: key, [this.props.rowTitle]: title, ...others } = item;
      if (children === undefined) {
        let _title = <span>{title}</span>;
        // search value higlight
        if (searchValue !== "" && title.indexOf(searchValue) > -1) {
          const index = title.indexOf(searchValue);
          expandedKeys.push(key);

          _title = (
            <span>
              {title.substr(0, index)}
              <span style={{ color: '#f50' }}>{searchValue}</span>
              {title.substr(index + searchValue.length)}
            </span>
          );
        }
        return <TreeNode key={key} title={_title} isLeaf {...others} />;
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
      checkedKeys: this.state.treeCheckLeafKeys,
      expandedKeys: searchValue !== "" ? expandedKeys : this.state.expandedKeys,
      autoExpandParent: searchValue !== "" ? true : this.state.autoExpandParent,
      onExpand: (keys) => {
        this.setState({
          expandedKeys: keys,
          autoExpandParent: false,
        });
      }
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
        listCheckKeys: [],
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
    this.props.onChange && this.props.onChange(this.props.targetKeys.filter((_k) => listCheckKeys.indexOf(_k) === -1));
  }

  // list search
  _handleListSearch = (searchValue) => {
    if (searchValue === "") {
      const { listData } = this._init(this.props);
      this.setState({
        listData
      });
    } else {
      this.setState({
        listData: this.state.listData.filter(({title}) => title.indexOf(searchValue) > -1)
      });
    }
  }

  // tree search
  _handleTreeSearch = (searchValue) => {
    // no search
    if (searchValue === "") {
      this.setState({
        searchValue: "",
        autoExpandParent: false
      });
    } else {
      this.setState({ searchValue });
    }
  }

  render() {
    const { title, targetKeys, showSearch, searchPlaceholder, onChange } = this.props;
    const { treeLoading, treeData, listData, treeLeafKeys, treeCheckLeafKeys, listCheckKeys } = this.state;

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
                  <Search placeholder={searchPlaceholder} onSearch={this._handleTreeSearch} />
                </div>
              ) : null
            }
            <div className="antui-treetransfer-list-body-content">
              { treeLoading ? <div className="antui-treetransfer-list-loading"><Spin /></div> :this._generateTreeNodes(treeData) }
            </div>
          </div>
        </div>
        <div className="antui-treetransfer-operation">
          <Button type="primary" icon="right" size="small" disabled={treeCheckLeafKeys.length === 0} onClick={() => onChange(treeCheckLeafKeys)} />
          <Button type="primary" icon="left" size="small" disabled={listCheckKeys.length === 0} onClick={this._handleListDelete} />
        </div>
        <div className="antui-treetransfer-list antui-treetransfer-right">
          <div className="antui-treetransfer-list-header">
            <Checkbox onClick={this._handleListCheckAll} indeterminate={listCheckKeys.length > 0 && listCheckKeys.length < targetKeys.length} checked={listCheckKeys.length > 0 && listCheckKeys.length === targetKeys.length} />
            <span className="antui-treetransfer-list-header-select">
              { listCheckKeys.length === 0 ? targetKeys.length : `${listCheckKeys.length}/${targetKeys.length}` } 条数据
            </span>
            {
              true ? null : (
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