import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'react-remarkable';
import CodeMirror from 'codemirror/lib/codemirror.js';
import hljs from 'highlight.js';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

//bunch of css
import 'highlight.js/styles/github.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/addon/display/autorefresh';
import 'github-markdown-css';
import './home.less';

class Articles extends Component {
  static defaultProps = {
    langs: {
      detail: 'Detail',
      srcCode: 'Sample Code',
      loading: 'Loading...'
    }
  };

  static propTypes = {
    code: PropTypes.string,
    guide: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool
    ]),
    langs: PropTypes.object,
    content: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool
    ]),
    name: PropTypes.string
  }

  componentDidMount() {
    if (this.props.code && this.refs.codeblock) {
      let el = ReactDOM.findDOMNode(this.refs.codeblock);

      this.editor = CodeMirror.fromTextArea(el, {
        mode: 'jsx',
        lineNumbers: false,
        lineWrapping: true,
        smartIndent: false, // javascript mode does bad things with jsx indents
        matchBrackets: true,
        readOnly: true,
        autoRefresh: true,
        theme: 'monokai'
      });
    }
  }

  componentDidUpdate() {
    if (this.props.guide) {
      let $guide = ReactDOM.findDOMNode(this.refs.guide);
      let $codes = $guide.querySelectorAll('pre code');

      Array.from($codes).forEach($code => {
        hljs.highlightBlock($code);
      });
    }

    if (!this.editor && this.refs.codeblock) {
      let el = ReactDOM.findDOMNode(this.refs.codeblock);

      this.editor = CodeMirror.fromTextArea(el, {
        mode: 'jsx',
        lineNumbers: false,
        lineWrapping: true,
        smartIndent: false, // javascript mode does bad things with jsx indents
        matchBrackets: true,
        readOnly: true,
        autoRefresh: true,
      });
    }

    if (this.props.code && this.refs.codeblock) {
      this.editor.setValue(this.props.code.replace('../../../src', 'antui-admin'));
    }
  }

  render() {
    const { code, langs, guide, content, name } = this.props;

    return (
      <Tabs defaultActiveKey="1" onChange={() => this.setState({})}>
        <TabPane tab={name || langs.detail} key="1">
          <article>
            <div className="markdown-body">
              <Remarkable source={content} />
              {
                guide ? <Remarkable ref="guide" source={guide} /> : false
              }
            </div>
          </article>
        </TabPane>
        {code ? <TabPane tab={langs.srcCode} key="2">
          <article>
            <textarea ref="codeblock" defaultValue={code.replace('../../../src/index', 'antui-admin')} />
          </article>
        </TabPane> : false}
      </Tabs>
    );
  }
}

export default Articles;
