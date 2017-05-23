import React, {PropTypes} from 'react';
import classNames from 'classnames';
import { Button, Checkbox, Input, Tree, Spin } from 'antd';
import TreeTitle from './treeTitle';
const Search = Input.Search;
const TreeNode = Tree.TreeNode;

/**
 *  双栏穿梭选择框 其中，左边一栏为Tree
 */
export default class AsyncTreetransfer extends React.Component {
  constructor(props) {
    super(props);
    const { treeData, listData, treeLeafKeys, treeSelectLeaf, treeSelectLeafKeys } = this._init(props);
    this.state = {
      treeData,
      listData,
      treeLeafKeys,
      treeSelectLeaf,
      treeSelectLeafKeys,
      expandedKeys: [],
      listCheckNodes: [],
      autoExpandParent: true,
      treeLoading: false,
      searchValue: "",
      searching: false,
    };
  }

  static propTypes = {
    /** 标题集合 */
    title: PropTypes.array,
    /** 数据源，其中的数据将会被渲染到左侧框（Tree）中 */
    dataSource: PropTypes.array,
    /** 显示在右侧框数据的key集合 */
    targetKeys: PropTypes.array,
    /** 左侧框树叶子节点的长度 */
    leafCount: PropTypes.number,
    /** 选项在左栏向右栏转移或者右栏数据更改时的回调函数 */
    onChange: PropTypes.func,
    /** 异步数据加载与查询 */
    onLoadTree: PropTypes.func,
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
    leafCount: 0,
    showSearch: false,
    searchPlaceholder: '请输入搜索内容',
    rowKey: 'key',
    rowTitle: 'title',
    rowChildren: 'children',
  }

  // init
  _init = ({ dataSource, targetKeys, rowKey, rowTitle }) => {
    // get leaf keys
    const listKeys = targetKeys.map(({key}) => key);
    const treeLeafKeys = [];
    const treeSelectLeaf = [];
    const treeSelectLeafKeys = [];

    const loop = data => data.map((item) => {
      const { [this.props.rowChildren]: children, [this.props.rowKey]: key } = item;

      if (children === undefined) {
        treeLeafKeys.push(key);
        if (listKeys.indexOf(key) > -1) {
          treeSelectLeaf.push(item);
          treeSelectLeafKeys.push(key);
        }
      } else {
        loop(item.children);
      }
    });

    loop(dataSource);

    return {
      treeData: dataSource,
      listData: targetKeys,
      treeLeafKeys,
      treeSelectLeaf,
      treeSelectLeafKeys
    };
  }

  componentWillReceiveProps(nextProps) {
    const { treeData, listData, treeLeafKeys, treeSelectLeaf, treeSelectLeafKeys } = this._init(nextProps);
    this.setState({
      treeData,
      listData,
      treeLeafKeys,
      treeSelectLeaf,
      treeSelectLeafKeys
    });
  }

  // tree init
  _generateTreeNodes = (treeData) => {
    const { searching, searchValue } = this.state;
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
        return <TreeNode key={key} name={title} title={_title} isLeaf {...others} />;
      } else {
        const treeTitleProps = {
          title,
          onSelect: (e) => this._parentNodeSelect(e, key, children),
          onCanel: (e) => this._parentNodeCanel(e, key, children),
        };
        return (
          <TreeNode key={key} title={<TreeTitle {...treeTitleProps} />} {...others}>
            {loop(item.children)}
          </TreeNode>
        );
      }
    });
    const treeNodes = loop(treeData);
    const treeProps = {
      checkable: false,
      multiple: true,
      onSelect: this._handleTreeSelect,
      selectedKeys: this.state.treeSelectLeafKeys,
      loadData: this._treeLoadData,
      expandedKeys: searching ? expandedKeys : this.state.expandedKeys,
      autoExpandParent: searchValue !== "" ? true : this.state.autoExpandParent,
      onExpand: (keys) => {
        // console.log(keys);
        this.setState({
          expandedKeys: keys,
          autoExpandParent: false,
        });
      }
    };

    return (
      <Tree {...treeProps}>
        {treeNodes}
      </Tree>
    );
  }
  //
  _handleTreeSelect = (selectedKeys, { selectedNodes }) => {
    // console.log(selectedNodes);
    const treeSelectLeafKeys = selectedKeys.filter((_k) => this.state.treeLeafKeys.indexOf(_k) > -1);
    const treeSelectLeaf = selectedNodes.map(({key, props}) => {
      const { name: title, isLeaf } = props;
      if (isLeaf) {
        return {key, title};
      } 
    }).filter((_v) => _v !== undefined);
    // console.log(treeSelectLeaf);
    this.setState({ treeSelectLeafKeys, treeSelectLeaf });
  }

  _getLeafNodes = (dt) => {
    const _keys = [];
    const _nodes = [];

    // console.log(dt);
    const loop = data => data.forEach((item) => {
      const { [this.props.rowChildren]: children, [this.props.rowKey]: key } = item;
      if (children === undefined) {
        _keys.push(key);
        _nodes.push(item);
      } else {
        loop(item.children);
      }
    });

    loop([dt]);
    return {_keys, _nodes};
  }
  // select all children nodes
  _parentNodeSelect = (e, key, children) => {
    e.preventDefault();
    e.stopPropagation();

    new Promise((resolve) => {
      this.props.onLoadTree && this.props.onLoadTree({type: '_load', value: key, resolve});
    }).then(() => {
      const { _keys, _nodes } = this._getLeafNodes({key, children});
      const { treeSelectLeaf, treeSelectLeafKeys } = this.state;

      this.setState({
        treeSelectLeaf: [..._nodes.filter(({key}) => treeSelectLeafKeys.indexOf(key) === -1), ...treeSelectLeaf],
        treeSelectLeafKeys: [...treeSelectLeafKeys, ..._keys]
      });
    });
  }

  // canel select all childr nen nodes
  _parentNodeCanel = (e, key, children) => {
    e.preventDefault();
    e.stopPropagation();
    const { _keys } = this._getLeafNodes({key, children});
    const { treeSelectLeaf, treeSelectLeafKeys } = this.state;

    this.setState({
      treeSelectLeaf: treeSelectLeaf.filter(({key}) => _keys.indexOf(key) === -1),
      treeSelectLeafKeys: treeSelectLeafKeys.filter((_k) => _keys.indexOf(_k) === -1)
    });
  }

  // list checkbox click
  _handleListCheck = (e, {key, title}) => {
    if (e.target.checked) {
      this.setState({
        listCheckNodes: [...this.state.listCheckNodes, {key, title}]
      });
    } else {
      this.setState({
        listCheckNodes: this.state.listCheckNodes.filter(({key: _k}) => _k !== key)
      });
    }
  }

  // list checkbox all click
  _handleListCheckAll = (e) => {
    if (e.target.checked) {
      this.setState({
        listCheckNodes: this.props.targetKeys
      });
    } else {
      this.setState({
        listCheckNodes: [],
      });
    }
  }

  // _handleTreeToList
  _handleTreeToList = () => {
    const { treeSelectLeaf, treeSelectLeafKeys } = this.state;
    const { targetKeys, onChange } = this.props;

    onChange && onChange([...targetKeys.filter(({key}) => treeSelectLeafKeys.indexOf(key) === -1), ...treeSelectLeaf]);
  }
  // list delete 
  _handleListToTree = () => {
    // delete tree clicked
    const { treeSelectLeafKeys } = this.state;
    this.setState({
      listCheckNodes: []
    });
    this.props.onChange && this.props.onChange(this.props.targetKeys.filter(({key}) => treeSelectLeafKeys.indexOf(key) === -1));
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
    const { treeData } = this._init(this.props);
    // no search
    if (searchValue === "") {
      this.setState({
        searchValue: "",
        treeData,
        autoExpandParent: false
      });
    } else {
      // load tree search
      if (this.props.onLoadTree) {
        new Promise((resolve) => {
          this.setState({
            treeLoading: true,
            searching: true
          });
          this.props.onLoadTree && this.props.onLoadTree({type: '_search', value: searchValue, resolve});
        }).then(() => {
          this.setState({
            treeLoading: false
          });
        });
      }
      this.setState({ searchValue });
    }
  }

  // tree load data
  _treeLoadData = (treeNode) => {
    return new Promise((resolve) => {
      this.props.onLoadTree && this.props.onLoadTree({type: '_expand', value: treeNode, resolve});
    });
  }

  render() {
    const { title, targetKeys, leafCount, showSearch, searchPlaceholder } = this.props;
    const { treeLoading, treeData, listData, treeSelectLeaf, listCheckNodes } = this.state;

    const listBodyStyle = classNames({
      "antui-treetransfer-list-body": true,
      "antui-treetransfer-list-body-has-search": showSearch
    });

    return (
      <div className="antui-treetransfer">
        <div className="antui-treetransfer-list antui-treetransfer-left">
          <div className="antui-treetransfer-list-header">
            <span className="antui-treetransfer-list-header-select">
              { treeSelectLeaf.length === 0 ? leafCount : `${treeSelectLeaf.length}/${leafCount}` } 条数据
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
          <Button type="primary" icon="right" size="small" disabled={treeSelectLeaf.length === 0} onClick={this._handleTreeToList} />
          <Button type="primary" icon="left" size="small" disabled={listCheckNodes.length === 0} onClick={this._handleListToTree} />
        </div>
        <div className="antui-treetransfer-list antui-treetransfer-right">
          <div className="antui-treetransfer-list-header">
            <Checkbox onClick={this._handleListCheckAll} indeterminate={listCheckNodes.length > 0 && listCheckNodes.length < targetKeys.length} checked={listCheckNodes.length > 0 && listCheckNodes.length === targetKeys.length} />
            <span className="antui-treetransfer-list-header-select">
              { listCheckNodes.length === 0 ? targetKeys.length : `${listCheckNodes.length}/${targetKeys.length}` } 条数据
            </span>
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
                    <Checkbox onClick={(e) => this._handleListCheck(e, {key, title})} checked={listCheckNodes.filter(({key: _k}) => _k === key).length > 0} />
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